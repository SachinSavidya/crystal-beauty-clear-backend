import express from "express";
import { saveUser, userlogin } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", saveUser);
userRouter.post("/login", userlogin);

export default userRouter;