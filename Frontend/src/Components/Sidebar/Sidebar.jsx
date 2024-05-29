import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ items, handleItemClick }) => {
  // console.log(items)
  const handleClick = (category) => {
    handleItemClick(category);
  };
  return (
    <>
      <div className="min-w-52 bg-slate-30 0">
        <ul className="sidebarFixedSide bg-s late-300 min-w-52">
          {items.map((item, index) => (
            <li key={index} onClick={() => handleClick(item.title)}>
              <NavLink>{item.title}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
