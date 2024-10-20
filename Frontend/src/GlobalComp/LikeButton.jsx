import { useState, useEffect, useRef } from "react";
import { Tooltip } from "react-tooltip";

const LikeButton = ({ customId }) => {
  const [isActive, setIsActive] = useState(false);
  const buttonRef = useRef(null);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.dispatchEvent(new Event("mouseenter"));
      buttonRef.current.dispatchEvent(new Event("mouseleave"));
    }
  }, [isActive]);

  return (
    <div>
      <Tooltip
        className="z-20"
        place="left"
        anchorSelect={`#${customId}`}
        content={isActive ? "Remove From Favorite" : "Add To Favorite"}
      />
      <div ref={buttonRef} className="flex justify-center items-center" id={customId}>
        <svg
          onClick={handleClick}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={isActive ? "red" : "transparent"}
          stroke="red"
          strokeWidth="0.5"
          className={`${
            isActive ? "fill-red-500 animate-like" : "fill-transparent"
          } transition-all duration-500 transform hover:scale-110 cursor-pointer`}
          style={{ width: "50px", height: "50px" }}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
    </div>
  );
};

export default LikeButton;
