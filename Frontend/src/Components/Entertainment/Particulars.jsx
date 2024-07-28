import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getEntertainmentParticularsData } from "../../Features";

const Particulars = () => {
  const globalParticularData = useSelector(
    (state) => state.getEntertainmentData.entertainmentParticularData
  );

  const [particularData, setParticulatData] = useState(globalParticularData);
  const { category, id } = useParams();
  const dispatch = useDispatch();
  useEffect(()=>{
    let payload = {
      category: category,
      id: id,
    };
    dispatch(getEntertainmentParticularsData(payload));
  },[])

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
