import React from "react";

const GameInfoComp = ({ label, value }) => {
  return (
    <div>
      <p className="text-gray-300">
        {label}
        <br />
      </p>
      <p className="mb-2">{value}</p>
    </div>
  );
};

export default GameInfoComp;
