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

  if (payment?.transactionStatus) {
    const updatedOrder = await Order.findByIdAndUpdate(
      order._id,
      {
        transaction: {
          id: payment.sp_order_id,
          transactionStatus: payment.transactionStatus,
        },
      },
      { new: true }, // Ensures the updated document is returned
    );

    if (!updatedOrder) {
      throw new AppError(httpStatus.NOT_FOUND, 'Order not found after update.');
    }

    order = updatedOrder; // Now TypeScript knows it's not null
  }

  return payment;
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
const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }

  return verifiedPayment;
};
export const orderService = {
  createOrder,
  getOrder,
  calculateTotalRevenue,
  verifyPayment,
};
