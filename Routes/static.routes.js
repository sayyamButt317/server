import UserModel from "../Model/User.js";
import { Router } from "express";
import {
  getProductsController,
  addProductController,
  editProductController,
  deleteProductController,
} from "../Controllers/productController.js";
import registerController from "../Controllers/registerController.js";
import loginController from "../Controllers/loginController.js";

const router = Router();

// Product routes
router.get("/products", getProductsController);
router.post("/create", addProductController);
router.post("/edit",editProductController);
router.post("/delete",deleteProductController);

// User routes
router.post("/users/register", registerController);
router.post("/users/login", loginController);

export default router;
