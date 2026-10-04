import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Your Menu</h1>

      <p>Choose from a diverse menu featuring a delectable array of dishes.</p>

      <div className="explore-menu-list">
        {menu_list.map((item) => (
          <div
            key={item.menu_name}
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "ALL" : item.menu_name,
              )
            }
            className="explore-menu-list-item"
          >
            <img
              className={category === item.menu_name ? "active" : ""}
              src={item.menu_image}
              alt={item.menu_name}
            />

            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>

      <hr />
    </div>
  );
};

export default ExploreMenu;
