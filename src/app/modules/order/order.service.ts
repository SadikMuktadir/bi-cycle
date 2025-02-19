/* eslint-disable prefer-const */
import AppError from '../../errors/AppError';
import Bicycle from '../bicycle/bicycle.model';
import Order from './order.model';
import httpStatus from 'http-status';
import { IUser } from '../user/user.interface';
import { orderUtils } from './order.utils';
const createOrder = async (
  user: IUser,
  payload: { products: { product: string; quantity: number }[] },
  client_ip: string,
) => {
  if (!payload?.products?.length)
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Order is not specified');

  let totalPrice = 0;
  const productDetails = (
    await Promise.all(
      payload.products.map(async (item) => {
        const product = await Bicycle.findById(item.product);
        if (!product) {
          throw new AppError(
            httpStatus.NOT_FOUND,
            `Product not found: ${item.product}`,
          );
        }
        totalPrice += (product.price || 0) * item.quantity;
        return { product: product._id, quantity: item.quantity };
      }),
    )
  ).filter(Boolean);

  let order = await Order.create({
    user: user._id,
    products: productDetails,
    totalPrice,
  });

  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: 'BDT',
    customer_name: user.name,
    customer_address: user.address,
    customer_email: user.email,
    customer_phone: user.phone,
    customer_city: user.city,
    client_ip,
  };
  const payment = await orderUtils.makePayment(shurjopayPayload);

  // if (payment?.transactionStatus) {
  //   const updatedOrder = await Order.findByIdAndUpdate(
  //     order._id,
  //     {
  //       transaction: {
  //         id: payment.sp_order_id,
  //         transactionStatus: payment.transactionStatus,
  //       },
  //     },
  //     { new: true }, // Ensures the updated document is returned
  //   );

  //   if (!updatedOrder) {
  //     throw new AppError(httpStatus.NOT_FOUND, 'Order not found after update.');
  //   }

  //   order = updatedOrder; // Now TypeScript knows it's not null
  // }

  return { order, payment };
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
