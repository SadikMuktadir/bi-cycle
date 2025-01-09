import { model, Schema } from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema = new Schema<IOrder>({
  email: {
    type: String,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Bicycle",
  },
  quantity: {
    type: Number,
  },
  totalPrice: {
    type: Number,
  },
});
const Order = model<IOrder>("Order", orderSchema);
export default Order;
