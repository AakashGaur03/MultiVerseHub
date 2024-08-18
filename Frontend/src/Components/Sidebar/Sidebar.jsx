import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toggleClicked } from "../../Features";

const Sidebar = ({ items, handleItemClick }) => {
  // console.log(items)
  const dispatch = useDispatch();
  const handleClick = (category) => {
    dispatch(toggleClicked(false));
    handleItemClick(category);
  };
  const isToggleClicked = useSelector((state) => state.sidebar.toggleClicked);

  return (
    <>
      {
        <div
          className={`min-w-52 bg-slate-30 h-full z-20 relative sidebarColor`}
        >
          <ul
            className={`sidebarFixedSide bg-s late-300 min-w-52 sidebarColor h-full ${
              isToggleClicked ? "sidebarBoxShadow" : "fixed"
            }`}
          >
            {items.map((item, index) => (
              <li key={index} onClick={() => handleClick(item.title)}>
                <NavLink>{item.title}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      }
    </>
  );
};

export default Sidebar;
