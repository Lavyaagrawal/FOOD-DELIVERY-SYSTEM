

import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const url = "https://food-delivery-system-2xcs.onrender.com";

    const [food_list, setFoodList] = useState([]);
    const [cartItems, setCartItems] = useState({});

    // Get token directly from localStorage
    const [token, setToken] = useState(
        localStorage.getItem("token") || ""
    );


    // =========================
    // FETCH FOOD LIST
    // =========================

    const fetchFoodList = async () => {

        try {

            const response = await axios.get(
                `${url}/api/food/list`
            );

            if (response.data.success) {

                setFoodList(response.data.data);

            } else {

                console.log(response.data.message);

            }

        } catch (error) {

            console.log(
                "Error fetching food list:",
                error
            );

        }
    };


    // =========================
    // ADD TO CART
    // =========================

    const addToCart = async (itemId) => {

        // Update frontend immediately

        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));


        // Update database if logged in

        if (token) {

            try {

                const response = await axios.post(
                    `${url}/api/cart/add`,
                    {
                        itemId: itemId
                    },
                    {
                        headers: {
                            token: token
                        }
                    }
                );

                console.log(
                    "Add to cart response:",
                    response.data
                );

                if (!response.data.success) {

                    console.log(
                        response.data.message
                    );

                }

            } catch (error) {

                console.log(
                    "Error adding item to cart:",
                    error
                );

            }
        }
    };


    // =========================
    // REMOVE FROM CART
    // =========================

    const removeFromCart = async (itemId) => {

        if (!cartItems[itemId]) {
            return;
        }


        // Update frontend

        setCartItems((prev) => {

            const updatedCart = {
                ...prev
            };

            if (updatedCart[itemId] === 1) {

                delete updatedCart[itemId];

            } else {

                updatedCart[itemId] =
                    updatedCart[itemId] - 1;

            }

            return updatedCart;

        });


        // Update database

        if (token) {

            try {

                const response = await axios.post(
                    `${url}/api/cart/remove`,
                    {
                        itemId: itemId
                    },
                    {
                        headers: {
                            token: token
                        }
                    }
                );

                console.log(
                    "Remove from cart response:",
                    response.data
                );

                if (!response.data.success) {

                    console.log(
                        response.data.message
                    );

                }

            } catch (error) {

                console.log(
                    "Error removing item from cart:",
                    error
                );

            }
        }
    };


    // =========================
    // LOAD CART FROM DATABASE
    // =========================

    const loadCartData = async (userToken) => {

        try {

            const response = await axios.post(
                `${url}/api/cart/get`,
                {},
                {
                    headers: {
                        token: userToken
                    }
                }
            );

            console.log(
                "Cart data response:",
                response.data
            );

            if (response.data.success) {

                setCartItems(
                    response.data.cartData || {}
                );

            } else {

                console.log(
                    response.data.message
                );

            }

        } catch (error) {

            console.log(
                "Error loading cart:",
                error
            );

        }
    };


    // =========================
    // GET TOTAL CART AMOUNT
    // =========================

    const getTotalCartAmount = () => {

        let totalAmount = 0;

        for (const item in cartItems) {

            const itemInfo = food_list.find(
                (product) => product._id === item
            );

            if (itemInfo) {

                totalAmount +=
                    itemInfo.price *
                    cartItems[item];

            }
        }

        return totalAmount;
    };


    // =========================
    // FETCH INITIAL DATA
    // =========================

    useEffect(() => {

        fetchFoodList();

    }, []);


    // =========================
    // LOAD CART WHEN TOKEN CHANGES
    // =========================

    useEffect(() => {

        if (token) {

            loadCartData(token);

        }

    }, [token]);


    // =========================
    // CONTEXT VALUE
    // =========================

    const contextValue = {

        food_list,

        cartItems,
        setCartItems,

        addToCart,
        removeFromCart,

        getTotalCartAmount,

        loadCartData,

        token,
        setToken,

        url

    };


    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
