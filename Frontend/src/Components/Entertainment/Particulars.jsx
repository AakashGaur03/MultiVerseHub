import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getEntertainmentParticularsData } from "../../Features";
import { CustomCircularProgressRating } from "../..";

const Particulars = () => {
  const globalParticularData = useSelector(
    (state) => state.getEntertainmentData.entertainmentParticularData
  );

  const [particularData, setParticulatData] = useState(globalParticularData);
  const { category, id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    let payload = {
      category: category,
      id: id,
    };
    dispatch(getEntertainmentParticularsData(payload));
  }, []);

  useEffect(() => {
    setParticulatData(globalParticularData);
    console.log(particularData);
    console.log(globalParticularData, "globalParticularData");
  }, [globalParticularData]);
  return (
    <>
      <div
        style={{
          backgroundImage: `url(	https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${particularData?.about?.backdrop_path})`,
        }}
        className=" bg-no-repeat bg-cover"
      >
        <div
          // Need To insert Linear background Here
          className=""
        >
          {/* Here Add for Image Title Percentage Overview */}
          <div className="row">
            <div className="col-md-4 flex justify-center">
              <div className="flex items-center">
                <img
                  className=""
                  style={{ height: "80%" }}
                  src={`	https://media.themoviedb.org/t/p/w300_and_h450_bestv2${particularData?.about?.poster_path}`}
                  alt=""
                />
              </div>
            </div>
            <div className="col-md-8">
              <div>{particularData?.about?.original_title}</div>
              <CustomCircularProgressRating
                voteAverage={particularData?.about?.vote_average}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Particulars;
