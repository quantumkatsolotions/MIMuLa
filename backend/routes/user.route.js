import { Router } from 'express';
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/user.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.get('/:id', authorize, getUser)

userRouter.get('/', authorize, getUsers)

userRouter.put('/:id',authorize, updateUser)

userRouter.delete('/:id', authorize, deleteUser)

export default userRouter;