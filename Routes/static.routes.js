import UserModel from "../Model/User.js";
import { Router } from "express";
import {
  getProductsController,
  addProductController,
  editProductController,
  deleteProductController,
} from "../Controllers/product.Controller.js";
import registerController from "../Controllers/register.Controller.js";
import loginController from "../Controllers/login.Controller.js";

const router = Router();

// Product routes

router.get("/products", getProductsController)
router.post("/create", addProductController)
router.patch("/edit",editProductController)
router.delete("/delete",deleteProductController);


router.post("/users/register", registerController)
router.post("/users/login", loginController);

export default router;
