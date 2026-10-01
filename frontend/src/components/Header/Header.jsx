import React from "react";
import "./Header.css";
const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order Your Favourite food here</h2>
        <p>
          Craving something delicious? Browse your favorite dishes, place your
          order, and get fresh, tasty food delivered right to your doorstep.
        </p>
        <button>View Menu</button>
      </div>
      <h2></h2>
    </div>
  );
};

export default Header;
