import { Router } from 'express';
import bicycleRouter from '../modules/bicycle/bicycle.router';
import orderRouter from '../modules/order/order.router';
import userRouter from '../modules/user/user.router';
import { AuthRouter } from '../modules/auth/auth.router';

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
  {
    path: '/auth',
    route: AuthRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
