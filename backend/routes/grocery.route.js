import { Router } from 'express';
import {
  createGrocery,
  getGroceries,
  getGroceryById,
  updateGrocery,
  deleteGrocery,
} from '../controllers/grocery.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const groceryRouter = Router();

// CREATE
groceryRouter.post('/', authorize, createGrocery);

// GET ALL GROCERIES FOR USER
groceryRouter.get('/user/:userId', authorize, getGroceries);

// GET ONE BY ID
groceryRouter.get('/:id', authorize, getGroceryById);

// UPDATE
groceryRouter.put('/:id', authorize, updateGrocery);

// DELETE
groceryRouter.delete('/:id', authorize, deleteGrocery);

export default groceryRouter;
