import UserModel from "../Model/User.js";
import { Router } from "express";
import {
  getAllProductsController,
  addProductController,
  editProductController,
  deleteProductController,
  getProductByIdController,
} from "../Controllers/product.Controller.js";
import registerController from "../Controllers/register.Controller.js";
import loginController from "../Controllers/login.Controller.js";
import upload from "../middleware/multer.middleware.js";

const router = Router();

// Product routes

router.get("/products", getAllProductsController)
router.post("/products/create", upload.single("picture"), addProductController)
router.patch("/edit/:id",editProductController)
router.delete("/delete/:id",deleteProductController);


router.get('/products/:id',getProductByIdController)

//  Customers
router.get(`/users`);
router.get(`users/:id`)


router.post("/users/register", registerController)
router.post("/users/login", loginController);

export default router;
