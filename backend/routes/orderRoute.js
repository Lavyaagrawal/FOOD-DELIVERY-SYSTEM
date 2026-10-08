import express from "express";

import {
  placeOrder,
  placeOrderStripe,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus,
} from "../controllers/orderController.js";

import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

// Normal order
orderRouter.post("/place", authMiddleware, placeOrder);

// Stripe payment
orderRouter.post("/stripe", authMiddleware, placeOrderStripe);

// Verify payment
orderRouter.post("/verify", authMiddleware, verifyOrder);

// Get user's orders
orderRouter.post("/userorders", authMiddleware, userOrders);

orderRouter.get('/list',listOrders)

orderRouter.post("/status", updateStatus);

export default orderRouter;
