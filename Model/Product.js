import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true ,
      unique: true,
      trim: true,
      index:true,
    },
    productDescription: {
      type: String,
      required: true ,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discountPercent: {
      type: Number,
      required: false,
      min: 0,
    },
    discountType:{
      type:String,
      required:false,
    },
    category: {
      type: String,
      required: true,
      index:true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    size:{
      type:String,
      required:false,
      enum: ["XS", "S","M", "L", "XL"],
    },
    status: {
      type: String,
      required: true,
      index:true,
      enum: ["Available", "Unavailable", "Out of Stock"],
    },
    gender:{
      type:String,
      required:false,
      enum: ["men", "women",],
    },
    productImage:{
      type:String,
      required:true
    }
  },
  { timestamps: true }
);

// Create unique index for productName
// ProductSchema.index({ productName: 1 }, { unique: true });
// ProductSchema.index({ category: 1 });
// ProductSchema.index({ status: 1 });


const ProductModel = mongoose.model("Product", ProductSchema);
export default ProductModel;
