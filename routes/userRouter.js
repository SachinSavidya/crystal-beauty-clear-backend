import express from "express";
import { googleLogin, saveUser, userlogin } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", saveUser);
userRouter.post("/login", userlogin);
userRouter.post("/google", googleLogin);

export default userRouter;