import User from '../models/user.model.js';
import Grocery from '../models/grocery.model.js';
import mongoose from 'mongoose';

// CREATE GROCERY
export const createGrocery = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { userId, month, shop, items } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, error: 'User Id is required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const [newGrocery] = await Grocery.create(
      [{ userId, month, shop, items }],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      message: 'Grocery list created successfully',
      data: newGrocery,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

// GET ALL GROCERIES FOR USER
export const getGroceries = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ success: false, error: 'User id is required' });
    }

    const groceries = await Grocery.find({ userId });

    if (!groceries || groceries.length === 0) {
      return res.status(404).json({ success: false, error: 'No groceries found' });
    }

    return res.status(200).json({
      success: true,
      data: groceries,
    });
  } catch (error) {
    next(error);
  }
};

// GET GROCERY BY ID
export const getGroceryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const grocery = await Grocery.findById(id);

    if (!grocery) {
      return res.status(404).json({ success: false, error: 'Grocery not found' });
    }

    return res.status(200).json({
      success: true,
      data: grocery,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE GROCERY
export const updateGrocery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { items, shop, month } = req.body;

    const updatedGrocery = await Grocery.findByIdAndUpdate(
      id,
      { items, shop, month },
      { new: true, runValidators: true }
    );

    if (!updatedGrocery) {
      return res.status(404).json({ success: false, error: 'Grocery not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Grocery updated successfully',
      data: updatedGrocery,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE GROCERY
export const deleteGrocery = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedGrocery = await Grocery.findByIdAndDelete(id);

    if (!deletedGrocery) {
      return res.status(404).json({ success: false, error: 'Grocery not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Grocery deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
