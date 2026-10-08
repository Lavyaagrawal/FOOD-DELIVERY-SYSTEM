
import userModel from "../models/userModel.js";

// Add to Cart
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

        await userModel.findByIdAndUpdate(
            req.body.userId,
            {
                cartData: cartData,
            }
        );

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


// Remove from Cart
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

        await userModel.findByIdAndUpdate(
            req.body.userId,
            {
                cartData: cartData,
            }
        );

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


export {
    addToCart,
    removeFromCart,
    getCart,
};
