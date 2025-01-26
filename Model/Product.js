import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
     category: {
      type: String,
      required: true,
      index:true,
    },
 
    // discountPercent: {
    //   type: Number,
    //   required: false,
    //   min: 0,
    // },
    // discountType: {
    //   type: String,
    //   required: false,
    // },
    // size:{
    //   type:String,
    //   required:false,
    //   enum: ["XS", "S","M", "L", "XL"],
    // },
    // status: {
    //   type: String,
    //   required: true,
    //   index:true,
    //   enum: ["Available", "Unavailable", "Out of Stock"],
    // },
    // gender:{
    //   type:String,
    //   required:false,
    //   enum: ["men", "women",],
    // },
    picture: {
      secure_url:{
        type: String,
        required: true,
      },
      public_id:{
        type:String,
        required:true
      }
    
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", ProductSchema);
export default ProductModel;
