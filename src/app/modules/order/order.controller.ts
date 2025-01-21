/* eslint-disable no-console */
import { Request, Response } from 'express';
import { orderService } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await orderService.createOrder(payload);
    res.status(201).send({
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).send({
      success: false,
      message: 'An error occurred while creating the order',
      error: error,
    });
  }
};
const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await orderService.calculateTotalRevenue();
    res.send({
      success: true,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'An error occurred while calculating revenue',
      error: error,
    });
  }
};
export const orderController = {
  createOrder,
  calculateRevenue,
};
