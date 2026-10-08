import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// ===============================
// PLACE ORDER - CASH ON DELIVERY
// ===============================
const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;

    const userId = req.body.userId;

    // Create new order
    const newOrder = new orderModel({
      userId: userId,
      items: items,
      amount: amount,
      address: address,
    });

    // Save order
    await newOrder.save();

    // Clear user's cart
    await userModel.findByIdAndUpdate(userId, {
      cartData: {},
    });

    res.json({
      success: true,
      message: "Order Placed Successfully",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.log("PLACE ORDER ERROR:", error);

    res.json({
      success: false,
      message: "Error placing order",
    });
  }
};

// ===============================
// STRIPE
// ===============================
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ===============================
// PLACE ORDER WITH STRIPE
// ===============================
const placeOrderStripe = async (req, res) => {
  try {
    const { items, amount, address } = req.body;

    const userId = req.body.userId;

    // Create order
    const newOrder = new orderModel({
      userId: userId,
      items: items,
      amount: amount,
      address: address,
      payment: false,
    });

    // Save order
    await newOrder.save();

    // ===============================
    // CREATE STRIPE LINE ITEMS
    // ===============================

    const line_items = items.map((item) => {
      return {
        price_data: {
          currency: "inr",

          product_data: {
            name: item.name,
          },

          unit_amount: Math.round(item.price * 100),
        },

        quantity: item.quantity,
      };
    });

    // ===============================
    // DELIVERY FEE
    // ===============================

    const deliveryFee = 80;

    line_items.push({
      price_data: {
        currency: "inr",

        product_data: {
          name: "Delivery Fee",
        },

        unit_amount: deliveryFee * 100,
      },

      quantity: 1,
    });

    // ===============================
    // CREATE STRIPE SESSION
    // ===============================

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,

      mode: "payment",

      success_url: `${process.env.FRONTEND_URL}/verify?success=true&orderId=${newOrder._id}`,

      cancel_url: `${process.env.FRONTEND_URL}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({
      success: true,

      session_url: session.url,
    });
  } catch (error) {
    console.log("STRIPE ERROR:", error);

    res.json({
      success: false,

      message: "Payment failed",
    });
  }
};

// ===============================
// VERIFY ORDER
// ===============================
const verifyOrder = async (req, res) => {
  try {
    const { orderId, success } = req.body;

    console.log("VERIFY ORDER");
    console.log("Order ID:", orderId);
    console.log("Success:", success);

    // ===============================
    // PAYMENT SUCCESS
    // ===============================

    if (success === "true") {
      // Find order and update payment
      const order = await orderModel.findByIdAndUpdate(
        orderId,
        {
          payment: true,
        },
        {
          new: true,
        },
      );

      if (!order) {
        return res.json({
          success: false,
          message: "Order not found",
        });
      }

      // Clear user's cart
      await userModel.findByIdAndUpdate(order.userId, {
        cartData: {},
      });

      res.json({
        success: true,

        message: "Payment Successful",
      });
    }

    // ===============================
    // PAYMENT FAILED
    // ===============================
    else {
      await orderModel.findByIdAndDelete(orderId);

      res.json({
        success: false,

        message: "Payment Failed",
      });
    }
  } catch (error) {
    console.log("VERIFY ORDER ERROR:", error);

    res.json({
      success: false,

      message: "Error verifying payment",
    });
  }
};

// ===============================
// GET USER ORDERS
// ===============================
const userOrders = async (req, res) => {
  try {
    const userId = req.body.userId;

    console.log("USER ID:", userId);

    // Find all orders of logged-in user
    const orders = await orderModel.find({
      userId: userId,
    });

    res.json({
      success: true,

      data: orders,
    });
  } catch (error) {
    console.log("USER ORDERS ERROR:", error);

    res.json({
      success: false,

      message: "Error fetching orders",
    });
  }
};

// ===============================
// LIST ALL ORDERS - ADMIN
// ===============================
const listOrders = async (req, res) => {

    try {

        const orders = await orderModel.find({});

        res.json({
            success: true,
            data: orders
        });

    } catch (error) {

        console.log("LIST ORDERS ERROR:", error);

        res.json({
            success: false,
            message: "Error fetching orders"
        });

    }
};
//api for updating order sattus
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status: status });

    res.json({
      success: true,
      message: "Status Updated",
    });
  } catch (error) {
    console.log("UPDATE STATUS ERROR:", error);

    res.json({
      success: false,
      message: "Error updating status",
    });
  }
};

// ===============================
// EXPORT
// ===============================
export { placeOrder, placeOrderStripe, verifyOrder, userOrders, listOrders,updateStatus };
