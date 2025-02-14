import { Router } from 'express';
import { userValidation } from './user.validation';
import { userController } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';

const userRouter = Router();
userRouter.post(
  '/register',
  validateRequest(userValidation.userSchema),
  userController.createUser,
);
userRouter.get('/', userController.getUser);
userRouter.get('/:userId', userController.getSingleUser);
userRouter.patch('/:userId', userController.updateUser);
userRouter.delete('/:userId', userController.deleteUser);
export default userRouter;
