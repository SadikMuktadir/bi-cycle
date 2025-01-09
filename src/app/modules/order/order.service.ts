import Bicycle from "../bicycle/bicycle.model";
import { IOrder } from "./order.interface";
import Order from "./order.model";

const createOrder = async (payload: IOrder): Promise<IOrder> => {
  const bicycle = await Bicycle.findById(payload.product);

  if (!bicycle) {
    throw new Error("Product not found");
  }

  if (bicycle.quantity <= 0) {
    throw new Error("Product is out of stock");
  }

  const result = await Order.create(payload);
  bicycle.quantity -= payload.quantity;
  await bicycle.save();

  return result;
};

const calculateTotalRevenue = async (): Promise<number> => {
  const pipeline = [
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalPrice" },
      },
    },
  ];

  const result = await Order.aggregate(pipeline).exec();
  return result[0]?.totalRevenue || 0;
};

export const orderService = {
  createOrder,
  calculateTotalRevenue,
};
