import { ObjectId } from 'mongoose';

export interface IOrderProduct {
  product: ObjectId; // Reference to Bicycle model
  quantity: number;
}

export interface IOrder {
  user: ObjectId;
  products: IOrderProduct[];
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}
