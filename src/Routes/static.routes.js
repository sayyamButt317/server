import UserModel from "../Model/User.js";
import { Router } from "express";
import {
  getProductsController,
  addProductController,
  editProductController,
  deleteProductController,
  getSingleProductController,
} from "../Controllers/product.Controller.js";
import {AllUserController,getSingleUsers} from "../Controllers/user.Controller.js"
import registerController from "../Controllers/register.Controller.js";
import loginController from "../Controllers/login.Controller.js";



const router = Router();

// Product routes

router.get("/products", getProductsController)
router.post("/create", addProductController)
router.patch("/edit/:id",editProductController)
router.delete("/delete/:id",deleteProductController);

router.get("/products/:id",getSingleProductController)

router.post("/users/register", registerController)
router.post("/users/login", loginController);

router.get("/users/all-users",AllUserController)
router.get("/users/:id", getSingleUsers);

export default router;
