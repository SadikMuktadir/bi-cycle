import { Request, Response } from "express";
import { orderService } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await orderService.createOrder(payload);
    res.send({
      success: true,
      message: "Order created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
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
    console.log(error);
    res.status(500).send({
      success: false,
      message: "An error occurred while calculating revenue",
    });
  }
};
export const orderController = {
  createOrder,
  calculateRevenue,
};
