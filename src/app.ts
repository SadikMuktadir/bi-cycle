import express, { Application, Request, Response } from 'express';
import config from './app/config';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app: Application = express();

app.use(express.json());

app.use(cookieParser());

app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: `Bicycle website server is runnig at ${config.port}`,
  });
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
