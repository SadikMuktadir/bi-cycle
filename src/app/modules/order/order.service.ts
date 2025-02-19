import { Types } from 'mongoose';
import AppError from '../../errors/AppError';
import Bicycle from '../bicycle/bicycle.model';
import Order, { IOrder } from './order.model';
import httpStatus from 'http-status';
export interface ICreateOrderPayload {
  products: { product: string; quantity: number }[];
}

const createOrder = async (
  userId: Types.ObjectId,
  payload: ICreateOrderPayload,
): Promise<IOrder> => {
  if (!payload?.products?.length) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Order is not specified');
  }

  let totalPrice = 0;
  const productDetails = await Promise.all(
    payload.products.map(async (item) => {
      const product = await Bicycle.findById(item.product);
      if (!product) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          `Product not found: ${item.product}`,
        );
      }

      const subtotal = (product.price || 0) * item.quantity;
      totalPrice += subtotal;

      return { product: product._id, quantity: item.quantity };
    }),
  );

  const order = await Order.create({
    user: userId,
    products: productDetails,
    totalPrice,
  });

  return order;
};

const calculateTotalRevenue = async (): Promise<number> => {
  const pipeline = [
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ];

  const result = await Order.aggregate(pipeline).exec();
  return result[0]?.totalRevenue || 0;
};
const getOrder = async () => {
  const result = await Order.find().populate('user');
  return result;
};

export const orderService = {
  createOrder,
  getOrder,
  calculateTotalRevenue,
};
