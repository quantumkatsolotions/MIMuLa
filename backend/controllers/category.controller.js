import User from '../models/user.model.js';
import Category from '../models/category.model.js';
import mongoose from 'mongoose';

// CREATE CATEGORY
export const createCategory = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { categoryName, description, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, error: 'User Id is required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const [newCategory] = await Category.create(
      [{ categoryName, description, userId }],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: newCategory,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

// GET ALL CATEGORIES FOR USER
export const getCategories = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ success: false, error: 'User id is required' });
    }

    const categories = await Category.find({ userId });

    if (!categories || categories.length === 0) {
      return res.status(404).json({ success: false, error: 'No categories found' });
    }

    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

// GET CATEGORY BY ID
export const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }

    return res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE CATEGORY
export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { categoryName, description } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { categoryName, description },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: updatedCategory,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE CATEGORY
export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
