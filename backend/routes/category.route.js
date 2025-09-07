import express from 'express';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from '../controllers/category.controller.js';

import authorize from '../middlewares/auth.middleware.js';

const categoryRoute = express.Router();

// CREATE category
categoryRoute.post('/', authorize, createCategory);

// GET all categories for a user
categoryRoute.get('/user/:userId', authorize, getCategories);

// GET category by ID
categoryRoute.get('/:id', authorize, getCategoryById);

// UPDATE category by ID
categoryRoute.put('/:id', authorize, updateCategory);

// DELETE category by ID
categoryRoute.delete('/:id', authorize, deleteCategory);

export default categoryRoute;
