import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Ranking = () => {
  const location = useLocation();
  const Data = location.state?.rankingsData;
  const [rankingData, setRankingData] = useState([]);

  useEffect(() => {
    if (Data) {
      setRankingData(Data);
      console.log(Data, "gh as11");
      console.log(rankingData, "gh as22");
    }
  }, [Data]);
  return (
    <div>
      {rankingData.rank?.length > 0 ? (
        <div>
          {rankingData.rank.map((data, index) => (
            <div key={index}>{data.rank}</div>
          ))}
        </div>
      ) : (
        <div>No Data Available</div>
      )}
    </div>
  );
};

export default Ranking;
