import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getEntertainmentParticularsData } from "../../Features";
import { CustomCircularProgressRating } from "../..";
import { Badge } from "react-bootstrap";

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
            <div className="col-md-8 flex flex-col justify-evenly">
              <div>{particularData?.about?.original_title || particularData?.about?.original_name}</div>
              <div>{particularData?.about?.release_date || particularData?.about?.first_air_date} {particularData?.about?.runtime}</div>
              <CustomCircularProgressRating
                voteAverage={particularData?.about?.vote_average}
              />
              <div>{particularData?.about?.tagline}</div>
              <div>Overview</div>
              <div>{particularData?.about?.overview}</div>
              {/* <div className="flex"> */}
                <div className="flex">
                  {particularData?.about?.genres.map((genre) => (
                    <div className="customBadge" key={genre.id}>{genre.name}</div>
                  ))}
                </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Particulars;
