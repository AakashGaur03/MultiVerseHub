import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Particulars = () => {
  const globalParticularData = useSelector(
    (state) => state.getEntertainmentData.entertainmentParticularData
  );

  const [particularData, setParticulatData] = useState(globalParticularData);

  useEffect(() => {
    setParticulatData(globalParticularData);
    console.log(particularData);
    console.log(globalParticularData, "globalParticularData");
  }, [globalParticularData]);
  return (
    <div
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${particularData?.about?.backdrop_path})`,
      }}
      className="vh-100 bg-no-repeat bg-cover"
    >
      {particularData && particularData.about.id}
    </div>
  );
};

export default Particulars;
