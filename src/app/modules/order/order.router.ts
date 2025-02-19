import { Router } from 'express';
import { orderController } from './order.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const orderRouter = Router();
orderRouter.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  orderController.createOrder,
);
orderRouter.get('/', orderController.getOrder);
orderRouter.get('/revenue', orderController.calculateRevenue);
export default orderRouter;
