import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGamesParticularsData } from "../../Features";
import { Col, Row } from "react-bootstrap";
import { formatDateinHumanredable } from "../../GlobalComp/formatDate";

const ParticularGame = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [gameData, setGameData] = useState([]);
  const particularGameData = useSelector(
    (state) => state.games.gamesDataParticular
  );
  useEffect(() => {
    dispatch(getGamesParticularsData(id));
  }, []);
  useEffect(() => {
    setGameData(particularGameData);
    console.log(particularGameData);
  }, [particularGameData]);

  return (
    <>
      {gameData && (
        // <>
        //   <div className="mt-5">
        //     <Row>
        //       <Col md={4}>
        //         <div className="flex justify-center flex-col items-center">
        //           <div>
        //           <img src={gameData.thumbnail} alt="" />
        //           </div>
        //           <div className="flex w-full justify-around mt-4">
        //            <button>View More</button>
        //            <button>Play Now</button>
        //           </div>
        //         </div>
        //       </Col>
        //       <Col md={8}>Hi</Col>
        //     </Row>
        //   </div>
        // </>
        <div>
          <div
            style={{ background: "linear-gradient(45deg, black, transparent)" }}
            className=""
          >
            <div className="row">
              <div className="col-md-4 flex justify-center ">
                <div className="content-center">
                  <div>
                    <img className="" src={gameData.thumbnail} alt="" />
                  </div>
                  <div className="flex justify-around mt-4">
                    <button>View More</button>
                    <button>Play Now</button>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div>
                  <h2 className="text-3xl">{gameData?.title}</h2>
                  <div>
                    {gameData?.release_date && (
                      <>
                        Release Date :{" "}
                        {formatDateinHumanredable(gameData?.release_date)}
                      </>
                    )}
                  </div>
                </div>
                <div className="italic text-gray-300">
                  {gameData?.short_description
                    ? gameData?.short_description
                    : "Tagline Not Available"}
                </div>
                <div>
                  <div className="mb-3">Description</div>
                  <div className="leading-6 px-6">
                    {gameData?.description
                      ? gameData?.description
                      : "Description not Available"}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="customBadge">{gameData.genre}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ParticularGame;
