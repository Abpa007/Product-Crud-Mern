import express from "express";
import {
  userLogin,
  userRegister,
  getUser,
} from "../../controller/userController/userController.js";
import { verifyToken } from "../../middleware/authMiddleware.js";

const userRoute = express.Router();

userRoute.post("/register", userRegister);
userRoute.post("/login", userLogin);
userRoute.get("/profile", verifyToken, getUser);

export default userRoute;
