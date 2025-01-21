import express, { Request, Response } from 'express';
import config from './app/config';
import bicycleRouter from './app/modules/bicycle/bicycle.router';
import orderRouter from './app/modules/order/order.router';
const app = express();
app.use(express.json());
app.use('/api', bicycleRouter);
app.use('/api', orderRouter);
app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: `By-cycle server is runnig at ${config.port}`,
  });
});
export default app;
