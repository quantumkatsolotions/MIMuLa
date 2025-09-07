import User from '../models/user.model.js';
import Category from '../models/category.model.js';
import Expense from '../models/expense.model.js';
import mongoose from 'mongoose';

// CREATE EXPENSE
export const createExpense = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { amount, description, date, userId, categoryId, paymentMethod, currency } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, error: 'User Id is required' });
    }
    if (!categoryId) {
      return res.status(400).json({ success: false, error: 'Category Id is required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }

    const [newExpense] = await Expense.create(
      [{ amount, description, date, userId, categoryId, paymentMethod, currency }],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      message: 'Expense created successfully',
      data: newExpense,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

// GET ALL EXPENSES FOR USER
export const getExpenses = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ success: false, error: 'User id is required' });
    }

    const expenses = await Expense.find({ userId }).populate('categoryId', 'categoryName');

    if (!expenses || expenses.length === 0) {
      return res.status(404).json({ success: false, error: 'No expenses found' });
    }

    return res.status(200).json({
      success: true,
      data: expenses,
    });
  } catch (error) {
    next(error);
  }
};

// GET EXPENSE BY ID
export const getExpenseById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findById(id).populate('categoryId', 'categoryName');

    if (!expense) {
      return res.status(404).json({ success: false, error: 'Expense not found' });
    }

    return res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE EXPENSE
export const updateExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amount, description, date, categoryId, paymentMethod, currency } = req.body;

    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { amount, description, date, categoryId, paymentMethod, currency },
      { new: true, runValidators: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ success: false, error: 'Expense not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Expense updated successfully',
      data: updatedExpense,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE EXPENSE
export const deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ success: false, error: 'Expense not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Expense deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
