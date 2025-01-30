import { Router } from "express";
import {
  getAllProductsController,
  addProductController,
  editProductController,
  deleteProductController,
  getProductByIdController,
} from "../Controllers/product.Controller.js";

import upload from "../middleware/multer.middleware.js";
const router = Router();

router.get("/products", getAllProductsController)
router.post("/products/create", upload.single("picture"), addProductController)
router.patch("/product/:id/edit",editProductController)
router.delete("/product/:id/delete",deleteProductController);
router.get('/products/:id',getProductByIdController)

export default router;