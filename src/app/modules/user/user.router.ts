import { Router } from 'express';
import { userValidation } from './user.validation';
import { userController } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const userRouter = Router();
userRouter.post(
  '/register',
  validateRequest(userValidation.userSchema),
  userController.createUser,
);
userRouter.get('/', userController.getUser);
userRouter.get('/:userId', auth(USER_ROLE.admin), userController.getSingleUser);
userRouter.patch('/:userId', auth(USER_ROLE.admin), userController.updateUser);
userRouter.delete('/:userId', auth(USER_ROLE.admin), userController.deleteUser);
export default userRouter;
