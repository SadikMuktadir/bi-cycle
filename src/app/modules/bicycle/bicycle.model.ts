import { model, Schema } from "mongoose";
import { IBicycle } from "./bicycle.interface";

const bicycleSchema = new Schema<IBicycle>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true,
      minlength: [2, "Brand must be at least 2 characters long"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    type: {
      type: String,
      required: [true, "Type is required"],
      enum: {
        values: ["Mountain", "Road", "Hybrid", "BMX", "Electric"],
        message: "Type must be one of: Mountain, Road, Hybrid, BMX, Electric",
      },
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description must be less than 500 characters"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0, "Quantity must be a positive number"],
    },
    inStock: {
      type: Boolean,
      required: [true, "In stock status is required"],
    },
  },
  { timestamps: true }
);
const Bicycle = model<IBicycle>("Bicycle", bicycleSchema);
export default Bicycle;
