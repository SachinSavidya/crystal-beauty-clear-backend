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
// Dynamic CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      "http://localhost:5173",
      "https://crystal-beauty-clear.vercel.app",
      // Add your Render backend URL for testing
      "https://crystal-beauty-clear-backend-6x08.onrender.com",
    ];

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Add explicit OPTIONS handler for preflight requests
app.options("*", cors());

// Body parser middleware
app.use(bodyParser.json());

// Test route to verify server is working
app.get("/api/health", (req, res) => {
  res.json({
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

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
