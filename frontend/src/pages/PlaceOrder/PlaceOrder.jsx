

import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {

  const {
    getTotalCartAmount,
    token,
    food_list,
    cartItems,
    url
  } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {

    const name = event.target.name;
    const value = event.target.value;

    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const subtotal = getTotalCartAmount();

  const deliveryFee = subtotal > 0 ? 80 : 0;

  const total = subtotal + deliveryFee;


  // ==============================
  // PLACE ORDER WITH STRIPE
  // ==============================
  const onSubmitHandler = async (event) => {

    event.preventDefault();

    if (!token) {
      alert("Please login before placing an order.");
      return;
    }

    if (subtotal === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {

      // Create order items
      const orderItems = [];

      for (const item in cartItems) {

        if (cartItems[item] > 0) {

          const foodItem = food_list.find(
            (product) => product._id === item
          );

          if (foodItem) {

            orderItems.push({
              _id: foodItem._id,
              name: foodItem.name,
              price: foodItem.price,
              quantity: cartItems[item]
            });

          }
        }
      }


      // Send order to backend
      const response = await axios.post(
        `${url}/api/order/stripe`,
        {
          items: orderItems,
          amount: total,
          address: data
        },
        {
          headers: {
            token: token
          }
        }
      );


      console.log("Stripe Response:", response.data);


      // Redirect to Stripe
      if (response.data.success) {

        window.location.href = response.data.session_url;

      } else {

        alert(response.data.message);

      }

    } catch (error) {

      console.log("STRIPE ORDER ERROR:", error);

      if (error.response) {
        console.log(
          "Backend response:",
          error.response.data
        );
      }

      alert("Unable to proceed to payment.");

    }
  };


  return (

    <form
      className="place-order"
      onSubmit={onSubmitHandler}
    >

      {/* ================= LEFT ================= */}

      <div className="place-order-left">

        <p className="title">
          Delivery Information
        </p>


        <div className="multi-fields">

          <input
            type="text"
            name="firstName"
            value={data.firstName}
            onChange={onChangeHandler}
            placeholder="First name"
            required
          />

          <input
            type="text"
            name="lastName"
            value={data.lastName}
            onChange={onChangeHandler}
            placeholder="Last name"
            required
          />

        </div>


        <input
          type="email"
          name="email"
          value={data.email}
          onChange={onChangeHandler}
          placeholder="Email address"
          required
        />


        <input
          type="text"
          name="street"
          value={data.street}
          onChange={onChangeHandler}
          placeholder="Street"
          required
        />


        <div className="multi-fields">

          <input
            type="text"
            name="city"
            value={data.city}
            onChange={onChangeHandler}
            placeholder="City"
            required
          />

          <input
            type="text"
            name="state"
            value={data.state}
            onChange={onChangeHandler}
            placeholder="State"
            required
          />

        </div>


        <div className="multi-fields">

          <input
            type="text"
            name="zipcode"
            value={data.zipcode}
            onChange={onChangeHandler}
            placeholder="Zip code"
            required
          />

          <input
            type="text"
            name="country"
            value={data.country}
            onChange={onChangeHandler}
            placeholder="Country"
            required
          />

        </div>


        <input
          type="text"
          name="phone"
          value={data.phone}
          onChange={onChangeHandler}
          placeholder="Phone"
          required
        />

      </div>


      {/* ================= RIGHT ================= */}

      <div className="place-order-right">

        <div className="cart-total">

          <h2>
            Cart Totals
          </h2>


          <div>

            <div className="cart-total-details">

              <p>
                Subtotal
              </p>

              <p>
                ₹{subtotal.toFixed(2)}
              </p>

            </div>


            <hr />


            <div className="cart-total-details">

              <p>
                Delivery Fee
              </p>

              <p>
                ₹{deliveryFee.toFixed(2)}
              </p>

            </div>


            <hr />


            <div className="cart-total-details">

              <b>
                Total
              </b>

              <b>
                ₹{total.toFixed(2)}
              </b>

            </div>

          </div>


          <button type="submit">
            PROCEED TO PAYMENT
          </button>

        </div>

      </div>

    </form>
  );
};

export default PlaceOrder;

