import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import "dotenv/config";

// Create Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if user already exists
    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Validate password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // Create token
    const token = createToken(user._id);

    res.json({
      success: true,
      token,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Error while registering user",
    });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check fields
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Find user
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User doesn't exist",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Create token
    const token = createToken(user._id);

    res.json({
      success: true,
      token,
      message: "Login successful",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Error while logging in",
    });
  }
};

// Add To Cart
const addToCart = async (req, res) => {
  try {
    const { itemId } = req.body;

    const userData = await userModel.findById(req.body.userId);

    if (!userData) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, {
      cartData,
    });

    res.json({
      success: true,
      message: "Added to cart",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Error adding item to cart",
    });
  }
};

// Remove From Cart
const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.body;

    const userData = await userModel.findById(req.body.userId);

    if (!userData) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    let cartData = userData.cartData || {};

    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, {
      cartData,
    });

    res.json({
      success: true,
      message: "Removed from cart",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Error removing item from cart",
    });
  }
};

// Get Cart
const getCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);

    if (!userData) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      cartData: userData.cartData,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Error getting cart",
    });
  }
};

export { loginUser, registerUser, addToCart, removeFromCart, getCart };
