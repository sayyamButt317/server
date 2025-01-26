import ProductModel from "../Model/Product.js";
import { uploadOnCloudinary } from "../Config/cloudinaryConfig.js";
import { error } from "console";

const getProductByIdController = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await ProductModel.findOne({ _id: productId });
    if (!product) {
      return res
        .status(404)
        .json({ status: 404, message: "Product not found" });
    }
    return res.status(200).json({ product });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, error: "Server error", details: error.message });
  }
};

const getAllProductsController = async (req, res) => {
  try {
    // Fetch all products sorted by price
    const products = await ProductModel.find()
      .populate("productName")
      .sort({ price: 1 });
    return res.status(200).json({ products });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, error: "Server error", details: error.message });
  }
};

const addProductController = async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      price,
      stock,
      category,
      
    } = req.body;

const picture = req.file?.fieldname;
const picturePath = req.file?.path;

if (!productName || !productDescription || !price || !stock || !category || !picture || !picturePath ) {
  return res.status(400).json({
    success: false,
    message: "Missing required fields",
  });
}

const { secure_url, public_id } = await uploadOnCloudinary(picturePath, "products");

if (!secure_url) {
  return res.status(400).json({
    success: false,
    message: `Failed to upload image ${error.message}`,
  });
}

    // Create a new product
    const newProduct = await ProductModel.create({

      productName,
      productDescription,
      price,
      stock,
      category,
      picture: {
        secure_url,
        public_id,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add product",
      error: error.message,
    });
  }
};
const editProductController = async (req, res) => {
  try {
    const productId = req.params.id;

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      req.body,
      {
        // Return the updated product
        new: true,
        // Validate fields based on schema
        revalidate: true,
      }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      status: 200,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", details: err.message });
  }
};
const deleteProductController = async (req, res) => {
  try {
    const productId = req.params.id;
    // Check if `id` is provided
    if (!productId) {
      return res.status(400).json({ message: " Product id is required" });
    }
    // Attempt to delete the product by ID
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);
    // If no product is found with the given ID
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    // Successful deletion
    res.status(200).json({ message: `data deleted successfully` });
  } catch (err) {
    // Handle server errors
    res.status(500).json({ message: "Server error", details: err.message });
  }
};
export {
  getAllProductsController,
  addProductController,
  editProductController,
  deleteProductController,
  getProductByIdController,
};
