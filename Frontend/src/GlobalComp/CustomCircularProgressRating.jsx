import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const CustomCircularProgressRating = ({ voteAverage = 7.5 }) => {
  const getColor = (rating) => {
    if (rating > 8) {
      return "green";
    } else if (rating > 6) {
      return "yellow";
    } else if (rating > 4) {
      return "orange";
    } else {
      return "red";
    }
  };
  return (
    <>
      <div className="w-10">
        <CircularProgressbar
          value={voteAverage.toFixed(1) * 10}
          text={voteAverage ? `${voteAverage.toFixed(1) * 10}%` : `NR`}
          styles={buildStyles({
            pathColor: `${getColor(voteAverage.toFixed(1))}`,
            textColor: "white",
            trailColor: "blue",
            backgroundColor: "red",
          })}
        />
      </div>
    </>
  );
};

export default CustomCircularProgressRating;
