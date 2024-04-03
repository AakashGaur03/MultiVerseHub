import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ items,handleItemClick }) => {
  console.log(items)
  const handleClick = (category) => {
    handleItemClick(category);
  };
  return (
    <>
      <div className="min-w-52 bg-slate-300">
        <ul className="sidebarFixedSide bg-slate-300 min-w-52">
          {items.map((item, index) => (
            <li key={index}>
              <NavLink onClick={() => handleClick(item.title)}>{item.title}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
