import express from 'express';
import { userController } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.post('/logout', userController.logout);
// userRouter.post('/refresh_token', userController.generateAccessToken);

export default userRouter;
