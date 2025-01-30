import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import ProductRoutes from "./Routes/product.routes.js";
import AuthRoutes from "./Routes/auth.routes.js";
import Routes from "./Routes/static.routes.js"
import morgan from "morgan";
import errorHandler from "./middleware/errorhandler.middleware.js";

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json({ limit: "16kb" }));
app.use(cors());
app.use(cookieParser());

// Error Handler
app.use(errorHandler);

// Routes Declaration
app.use("/api",Routes);


export { app };
