import express from "express";

import {
  loginUser,
  registerUser,
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/userController.js";

const userRouter = express.Router();

// Register User
userRouter.post("/register", registerUser);

// Login User
userRouter.post("/login", loginUser);

// Add food to cart
userRouter.post("/add-to-cart", addToCart);

// Remove food from cart
userRouter.post("/remove-from-cart", removeFromCart);

// Get user's cart
userRouter.post("/get-cart", getCart);

export default userRouter;
