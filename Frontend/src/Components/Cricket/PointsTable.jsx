import React from "react";
import { useParams } from "react-router-dom";
const PointsTable = () => {
  console.log("Comos");
  const { seriesId } = useParams();

  // Now `seriesId` contains the value captured from the URL
  console.log(seriesId);
  return <div>PointsTable</div>;
};

export default PointsTable;
