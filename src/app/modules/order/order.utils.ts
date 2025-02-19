/* eslint-disable @typescript-eslint/no-explicit-any */
import Shurjopay, { PaymentResponse } from 'shurjopay';
import config from '../../config';

const shurjopay = new Shurjopay();

shurjopay.config(
  config.SP_ENDPOINT!,
  config.SP_USERNAME!,
  config.SP_PASSWORD!,
  config.SP_PREFIX!,
  config.SP_RETURN_URL!,
);
console.log(shurjopay);
const makePayment = async (paymentPayload: any): Promise<PaymentResponse> => {
  return new Promise((resolve, reject) => {
    shurjopay.makePayment(
      paymentPayload,
      (response) => resolve(response),
      (error) => reject(error),
    );
    console.log(makePayment);
  });
};
// const verifyPaymentAsync = (
//   order_id: string,
// ): Promise<VerificationResponse[]> => {
//   return new Promise((resolve, reject) => {
//     shurjopay.verifyPayment(
//       order_id,
//       (response) => resolve(response),
//       (error) => reject(error),
//     );
//   });
// };

export const orderUtils = {
  makePayment,
};
