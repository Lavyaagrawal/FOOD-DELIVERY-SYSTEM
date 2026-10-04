import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    addToCart,
    getTotalCartAmount,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const subtotal = getTotalCartAmount();

  // Delivery fee is $2 only when cart has items
  const deliveryFee = subtotal > 0 ? 2 : 0;

  const total = subtotal + deliveryFee;

  return (
    <div className="cart">
      {/* Cart Items */}
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <br />
        <hr />

        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt={item.name} />

                  <p>{item.name}</p>

                  <p>${item.price}</p>

                  <div className="cart-quantity">
                    <button onClick={() => removeFromCart(item._id)}>-</button>

                    <p>{cartItems[item._id]}</p>

                    <button onClick={() => addToCart(item._id)}>+</button>
                  </div>

                  <p>${(item.price * cartItems[item._id]).toFixed(2)}</p>

                  <img
                    className="cart-remove"
                    onClick={() => {
                      for (let i = 0; i < cartItems[item._id]; i++) {
                        removeFromCart(item._id);
                      }
                    }}
                    src={assets.cross_icon}
                    alt="Remove"
                  />
                </div>

                <hr />
              </div>
            );
          }

          return null;
        })}
      </div>

      {/* Cart Bottom */}
      <div className="cart-bottom">
        {/* Cart Total */}
        <div className="cart-total">
          <h2>Cart Totals</h2>

          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${deliveryFee.toFixed(2)}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <b>Total</b>
              <b>${total.toFixed(2)}</b>
            </div>
          </div>

          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>

        {/* Promo Code */}
        <div className="cart-promocode">
          <p>If you have a promo code, enter it here</p>

          <div className="cart-promocode-input">
            <input type="text" placeholder="promo code" />

            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
