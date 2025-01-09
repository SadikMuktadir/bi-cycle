import { model, Schema } from "mongoose";
import { IBicycle } from "./bicycle.interface";

const bicycleSchema = new Schema<IBicycle>(
  {
    name: {
      type: String,
    },
    brand: {
      type: String,
    },
    price: {
      type: Number,
    },
    type: {
      type: String,
      enum: ["Mountain", "Road", "Hybrid", "BMX", "Electric"],
    },
    description: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    inStock: {
      type: Boolean,
    },
  },
  { timestamps: true }
);
const Bicycle = model<IBicycle>("Bicycle", bicycleSchema);
export default Bicycle;
