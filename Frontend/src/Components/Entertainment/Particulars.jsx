import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getEntertainmentParticularsData } from "../../Features";
import { CustomCircularProgressRating } from "../..";
import { Badge } from "react-bootstrap";
import { formatDateinHumanredable } from "../../GlobalComp/formatDate";

const Particulars = () => {
  const globalParticularData = useSelector(
    (state) => state.getEntertainmentData.entertainmentParticularData
  );

  const [particularData, setParticulatData] = useState(globalParticularData);

  const [aboutData, setAboutData] = useState([]);
  const [creditsDate, setCreditsData] = useState([]);
  const [reviewsDate, setReviewsData] = useState([]);
  const [videoDate, setVideoData] = useState([]);
  const [imagesDate, setImagesData] = useState([]);

  const { category, id } = useParams();
  const dispatch = useDispatch();

  function giveTimeInHours(minutes) {
    let remainHour = Math.floor(minutes / 60);
    let remainMin = minutes % 60;

    remainHour = remainHour.toString().padStart(2, "0");
    remainMin = remainMin.toString().padStart(2, "0");
    return `${remainHour} h ${remainMin} min`;
  }

  useEffect(() => {
    let payload = {
      category: category,
      id: id,
    };
    dispatch(getEntertainmentParticularsData(payload));
  }, []);

  useEffect(() => {
    setParticulatData(globalParticularData);
    console.log(globalParticularData, "globalParticularData");
    setAboutData(globalParticularData?.about);
    console.log(particularData);
  }, [globalParticularData]);
  return (
    <>
      <div
        style={{
          backgroundImage: `url(	https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${aboutData?.backdrop_path})`,
        }}
        className=" bg-no-repeat bg-cover"
      >
        <div
          style={{ background: "linear-gradient(45deg, black, transparent)" }}
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
                  src={`	https://media.themoviedb.org/t/p/w300_and_h450_bestv2${aboutData?.poster_path}`}
                  alt=""
                />
              </div>
            </div>
            <div className="col-md-8 flex flex-col justify-evenly">
              <div>
                <h2 className="text-3xl">
                  {aboutData?.original_title || aboutData?.original_name}
                </h2>
                <div>
                  {aboutData?.release_date && (
                    <>
                      Release Date :{" "}
                      {formatDateinHumanredable(aboutData?.release_date)}
                    </>
                  )}
                  {aboutData?.first_air_date && (
                    <>
                      First Air Date :{" "}
                      {formatDateinHumanredable(aboutData?.first_air_date)}
                    </>
                  )}

                  <div>{aboutData?.runtime && giveTimeInHours(aboutData?.runtime)}</div>
                  <div>
                    {aboutData?.number_of_episodes && (
                      <>Total Episode(s) : {aboutData?.number_of_episodes}</>
                    )}
                  </div>
                  <div>
                    {aboutData?.number_of_seasons && (
                      <>Total Season(s) : {aboutData?.number_of_seasons}</>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <CustomCircularProgressRating
                  voteAverage={aboutData?.vote_average}
                />
              </div>
              <div className="italic text-gray-300">{aboutData?.tagline}</div>
              <div>
                <div className="mb-3">Overview</div>
                <div className="leading-6 px-6">{aboutData?.overview}</div>
              </div>
              {/* <div className="flex"> */}
              <div className="flex flex-wrap gap-2">
                {aboutData?.genres?.map((genre) => (
                  <div className="customBadge" key={genre.id}>
                    {genre.name}
                  </div>
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
