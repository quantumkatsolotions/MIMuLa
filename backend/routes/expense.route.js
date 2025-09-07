import { Router } from 'express';
import {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} from '../controllers/expense.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const expenseRouter = Router();

// CREATE
expenseRouter.post('/', authorize, createExpense);

// GET ALL EXPENSES FOR USER
expenseRouter.get('/user/:userId', authorize, getExpenses);

// GET ONE BY ID
expenseRouter.get('/:id', authorize, getExpenseById);

// UPDATE
expenseRouter.put('/:id', authorize, updateExpense);

// DELETE
expenseRouter.delete('/:id', authorize, deleteExpense);

export default expenseRouter;
