import React, { useState } from "react";
import "./Heart.css";

const HeartToggle = () => {
  const [liked, setLiked] = useState(false);

  const handleToggle = () => {
    setLiked(!liked);
  };

  return (
    <div className="heart-toggle-container">
      <input
        type="checkbox"
        id="toggle-heart"
        checked={liked}
        onChange={handleToggle}
      />
      <label htmlFor="toggle-heart" aria-label="like" className={liked ? "liked" : ""}>
        ❤
      </label>
    </div>
  );
};

export default HeartToggle;
