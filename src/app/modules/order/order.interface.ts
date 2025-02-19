import { ObjectId } from 'mongoose';

export interface IOrderProduct {
  product: ObjectId;
  quantity: number;
}

export interface IOrder {
  user: ObjectId;
  products: IOrderProduct[];
  totalPrice: number;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
