import React from "react";
import { useParams, useLocation } from "react-router-dom";
const PointsTable = () => {
  const location = useLocation();
  const pointsTableDaat = location.state?.pointsTableData;
  console.log("Comos23", pointsTableDaat);
  const { seriesId } = useParams();

  // Now `seriesId` contains the value captured from the URL
  console.log(seriesId);
  return (
    <div>
      {pointsTableDaat?.data &&
        pointsTableDaat?.data.map((data, index) => (
          <div key={index}>
            <div>Hi</div>
          </div>
        ))}
      Hlo
    </div>
  );
};

export default PointsTable;
