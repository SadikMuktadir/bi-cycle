import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrderProduct {
  product: mongoose.Types.ObjectId; // Reference to Bicycle model
  quantity: number;
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId; // Reference to User model
  products: IOrderProduct[]; // List of products in the order
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const OrderSchema: Schema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Bicycle',
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    totalPrice: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }, // Adds createdAt & updatedAt automatically
);

const Order: Model<IOrder> = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
