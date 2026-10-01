import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = () => {
  return (
    <div className="explore-menu">
      <h1>Explore Your Menu</h1>

      <p>Choose from a diverse menu featuring a delectable array of dishes.</p>

      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div className="explore-menu-list-item" key={index}>
            <img src={item.menu_image} alt={item.menu_name} />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMenu;
