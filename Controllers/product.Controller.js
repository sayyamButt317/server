import ProductModel from "../Model/Product.js";

const getSingleProductController = async (req, res) => {
  const productId = req.params.ProductId;
  try {
    const product = await ProductModel.findOne({ _id: productId });
    if (!product) {
      return res
        .status(404)
        .json({ status: 404, message: "Product not found" });
    }
  } catch (error) {
      return res
        .status(500)
        .json({ status: 500, error: "Server error", details: error.message });
    }
  
};

const getProductsController = async (req, res) => {
  try {
    // Fetch all products sorted by price
    const products = await ProductModel.find().populate("productName").sort({ price: 1 });
    return res.status(200).json({ products });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, error: "Server error", details: error.message });
  }
};

const addProductController = async (req, res) => {
  try {
    const Product = new ProductModel(req.body);
    await Product.save();
    res.status(201).json({
      id: Product._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const editProductController = async (req, res) => {
  try {
    const productId = req.params.ProductId;

    const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body, {
      // Return the updated product
      new: true,
      // Validate fields based on schema
      revalidate: true,
    });
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
    const id = req.params.id;
    // Check if `id` is provided
    if (!id) {
      return res.status(400).json({ message: " Product id is required" });
    }
    // Attempt to delete the product by ID
    const deletedProduct = await ProductModel.findByIdAndDelete(id);
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
  getProductsController,
  addProductController,
  editProductController,
  deleteProductController,
  getSingleProductController
};
