import { Router } from "express";
import registerController from "../Controllers/register.Controller.js";
import loginController from "../Controllers/login.Controller.js";
import VerifyToken from "../middleware/auth.middleware.js";

const router = Router();

router.post("/users/register", registerController)
router.post("/users/login", loginController);

router.get("/users", async (req, res) => {
    res.json({ message: "Hello from users" });
  });
  
  router.get("/manager", async (req, res) => {
    res.json({ message: "Hello from manager" });
  });
  
  router.get("/admin",VerifyToken, async (req, res) => {
    res.json({ message: "Hello from admin" });
  });

  export default router;