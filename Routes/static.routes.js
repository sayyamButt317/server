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
  import VerifyToken from "../middleware/auth.middleware.js";
  import upload from "../middleware/multer.middleware.js";
  import createPaymentIntent from "../Controllers/stripe.controller.js";
  
const router = Router();

router.get("/products", getAllProductsController)
router.post("/products/create", upload.single("picture"), addProductController)
router.patch("/product/:id/edit",editProductController)
router.delete("/product/:id/delete",deleteProductController);
router.get('/products/:id',getProductByIdController)

router.post("/users/register", registerController)
router.post("/users/login", loginController);

router.post("/checkout",createPaymentIntent)

router.get("/users", async (req, res) => {
    res.json({ message: "Hello from users" });
  });
  
  router.get("/manager", async (req, res) => {
    res.json({ message: "Hello from manager" });
  });
  
  router.get("/admin",VerifyToken, async (req, res) => {
    res.json({ message: "Hello from admin" });
  });

//  Customers
router.get(`/users`);
router.get(`users/:id`)


export default router;
