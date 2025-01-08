import ProductModel from "../Model/Product.js";

const getProductsController = async (req, res) => {
  try {
    const users = await ProductModel.find().sort({ "price":1 });
    res.status(200).json({ status: 200, data: users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addProductController = async (req, res) => {
  try {
    const newProduct = new ProductModel(req.body);
    await newProduct.save();
    res
      .status(201)
      .json({
        status: 201,
        message: "Product added Successfully",
        data: newProduct,
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const editProductController = async (req, res) => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      status: 200,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
const deleteProductController = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.body._id);
    res.status(200).json({ status: 200, message: `data deleted successfully` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
export {getProductsController, addProductController,editProductController,deleteProductController};

