import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import verifyJWT from "./middleware/auth.js";
import orderRouter from "./routes/orderRouter.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();

// CORS configuration - must be before other middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local dev
      "https://crystal-beauty-clear.vercel.app", // production frontend
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parser middleware
app.use(bodyParser.json());

// Database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to the data base");
  })
  .catch(() => {
    console.log("Connection failed");
  });

// Routes - apply authentication middleware only to protected routes
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/order", verifyJWT, orderRouter); // Apply auth only to orders if needed

// OR if you need auth on all routes, apply it selectively:
// app.use("/api/product", verifyJWT, productRouter);
// app.use("/api/user", userRouter); // Usually login/register don't need auth
// app.use("/api/order", verifyJWT, orderRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
