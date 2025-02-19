import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { orderService } from './order.service';
import sendResponse from '../../utils/sendResponse';
import { Request, Response } from 'express';
const createOrder = catchAsync(async (req, res) => {
  const user = req.user;
  const order = await orderService.createOrder(user, req.body, req.ip!);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Order placed successfully',
    data: order,
    success: true,
  });
});

const getOrder = async (req: Request, res: Response) => {
  const result = await orderService.getOrder();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrived successfully',
    data: result,
  });
};

const calculateRevenue = async (req: Request, res: Response) => {
  const totalRevenue = await orderService.calculateTotalRevenue();
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Order placed successfully',
    data: totalRevenue,
    success: true,
  });
};

const verifyPayment = catchAsync(async (req, res) => {
  const order = await orderService.verifyPayment(req.query.order_id as string);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Order verified successfully',
    data: order,
    success: true,
  });
});

export const orderController = {
  createOrder,
  getOrder,
  calculateRevenue,
  verifyPayment,
};
