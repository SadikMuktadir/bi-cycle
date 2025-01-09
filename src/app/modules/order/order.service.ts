import { IOrder } from "./order.interface";
import Order from "./order.model";

const createOrder = async (payload: IOrder): Promise<IOrder> => {
  const result = await Order.create(payload);
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
