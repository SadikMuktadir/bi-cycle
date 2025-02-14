import { Router } from 'express';
import bicycleRouter from '../modules/bicycle/bicycle.router';
import orderRouter from '../modules/order/order.router';
import userRouter from '../modules/user/user.router';

const router = Router();

const moduleRoutes = [
  {
    path: '/products',
    route: bicycleRouter,
  },
  {
    path: '/orders',
    route: orderRouter,
  },
  {
    path: '/auth',
    route: userRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
