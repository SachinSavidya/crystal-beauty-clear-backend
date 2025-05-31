import express from "express";
import { getCurrentUser, googleLogin, saveUser, userlogin } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", saveUser);
userRouter.post("/login", userlogin);
userRouter.post("/google", googleLogin);
userRouter.get("/current", getCurrentUser);

export default userRouter;