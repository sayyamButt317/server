import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
        discount: Number,
        totalPrice: Number,
      },
    ],
    totalPrice: Number,
    orderDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Shipped", "Delivered"],
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", OrderSchema);
export default OrderModel;
