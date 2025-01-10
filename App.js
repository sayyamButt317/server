import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import Routes from "./Routes/static.routes.js";
import morgan from "morgan";

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json({ limit: "16kb" }));
app.use(
  cors()
);
app.use(cookieParser());

// Routes Declaration
app.use("/api", Routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

export { app };
