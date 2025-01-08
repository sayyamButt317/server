import ProductModel from "../Model/Product.js";

const getProductsController = async (req, res) => {
  try {
    const id = req.params.id;

    // Fetch product by ID
    if (id) {
      const product = await ProductModel.findById(id);
      // if 'id' is provided
      if (!product) {
        return res.status(404).json({ status: 404, message: "Product not found" });
      }
      return res.status(200).json({ status: 200, data: product });
    }

    // Fetch all products sorted by price if 'id' is not provided
    const products = await ProductModel.find().sort({ price: 1 });
    return res.status(200).json({ status: 200, data: products });

  } catch (error) {
    // Handle any errors
    return res.status(500).json({ status: 500, error: 'Server error', details: error.message });
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
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ status: 400, message: "Product id is required" });
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(id,req.body,{
      // Return the updated product
      new: true,
      // Validate fields based on schema
      revalidate: true,
    });
    if(!updatedProduct){
      return res.status(404).json({ status: 404, message: "Product not found" });
    }
    res.status(200).json({
      status: 200,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: "Server error", details: err.message });
  }
}
const deleteProductController = async (req, res) => {
  try {
    const  id  = req.params.id;
    // Check if `id` is provided
    if(!id){
      return res.status(400).json({ status: 400, message: " Product id is required" });
    }
    // Attempt to delete the product by ID
    const deletedProduct  = await ProductModel.findByIdAndDelete(id);
    // If no product is found with the given ID
    if(!deletedProduct){
      return res.status(404).json({ status: 404, message: "Product not found" });
    }
    // Successful deletion
    res.status(200).json({ status: 200, message: `data deleted successfully` });
  } catch (err) {
    // Handle server errors
    res.status(500).json({ status: 500, message: "Server error", details: err.message });

  }
}
export {getProductsController, addProductController,editProductController,deleteProductController};

