import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGamesParticularsData } from "../../Features";
import { Col, Row } from "react-bootstrap";
import { formatDateinHumanredable } from "../../GlobalComp/formatDate";
import GameInfoComp from "../../GlobalComp/GameInfoComp";
import ImageWithLoader from "../../GlobalComp/ImageWithLoader";

const ParticularGame = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [gameData, setGameData] = useState([]);
  const loaderTrue = useSelector(
    (state) => state.games.gamesDataParticularState === "loading"
  );

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(loaderTrue);
  }, [loaderTrue]);
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
      {gameData ? (
        <div className="container-md">
          <div
            style={{ background: "linear-gradient(45deg, black, transparent)" }}
            className=""
          >
            <div className="row my-5">
              <div className="col-md-4 flex justify-center ">
                <div className="">
                  <div className="sticky top-24">
                    <img className="" src={gameData.thumbnail} alt="" />
                    <div className="flex flex-wrap justify-around mt-4">
                      <a
                        className="shine-effect text-white bg-gradient-to-r from-blue-900 via-blue-950 to-blue-950 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-950 dark:focus:ring-blue-950 shadow-lg shadow-blue-950 dark:shadow-lg dark:shadow-blue-950 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
                        target="_blank"
                        href={gameData?.freetogame_profile_url}
                      >
                        View More
                      </a>
                      <a
                        target="_blank"
                        href={gameData?.game_url}
                        className="shine-effect text-white bg-gradient-to-r from-blue-900 via-blue-950 to-blue-950 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-950 dark:focus:ring-blue-950 shadow-lg shadow-blue-950 dark:shadow-lg dark:shadow-blue-950 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
                      >
                        Play Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <section>
                  <h2 className="text-3xl mb-3 md:mt-0 mt-6 text-center">
                    {gameData?.title}
                  </h2>
                  <div className="mb-3">
                    {gameData?.release_date && (
                      <>
                        Release Date :{" "}
                        {formatDateinHumanredable(gameData?.release_date)}
                      </>
                    )}
                  </div>
                  <div className="italic text-gray-300 mb-3">
                    {gameData?.short_description
                      ? gameData?.short_description
                      : "Tagline Not Available"}
                  </div>
                  <div className="mb-2">Description</div>
                  <div className="leading-6 px-6 mb-3">
                    {gameData?.description
                      ? gameData?.description
                      : "Description not Available"}
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <div className="customBadge">{gameData.genre}</div>
                  </div>
                </section>
                <section className="my-5">
                  <div className="mb-5">
                    <div
                      className={`font-semibold text-2xl text-gray-400 text-center`}
                    >
                      <span className="cursor-pointer">
                        Minimum System Requirements
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      {gameData?.minimum_system_requirements?.os && (
                        <GameInfoComp
                          label="OS"
                          value={gameData?.minimum_system_requirements?.os}
                        />
                      )}

                      {gameData?.minimum_system_requirements?.memory && (
                        <GameInfoComp
                          label="Memory"
                          value={gameData?.minimum_system_requirements?.memory}
                        />
                      )}

                      {gameData?.minimum_system_requirements?.storage && (
                        <GameInfoComp
                          label="Storage"
                          value={gameData?.minimum_system_requirements?.storage}
                        />
                      )}
                    </div>
                    <div className="col-sm-6">
                      {gameData?.minimum_system_requirements?.processor && (
                        <GameInfoComp
                          label="Processor"
                          value={
                            gameData?.minimum_system_requirements?.processor
                          }
                        />
                      )}

                      {gameData?.minimum_system_requirements?.graphics && (
                        <GameInfoComp
                          label="Graphics"
                          value={
                            gameData?.minimum_system_requirements?.graphics
                          }
                        />
                      )}

                      <GameInfoComp
                        label=" Additional Notes"
                        value="Specifications may change during development"
                      />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
          <section className="my-5 mx-4">
            <div className="flex mb-5">
              <div
                className={`mb-2 mt-3 ps-5 font-semibold text-2xl text-gray-400 text-center`}
              >
                <span className="cursor-pointer">
                  {gameData?.title} Image(s) ({gameData?.screenshots?.length})
                </span>
              </div>
            </div>

            <div className="flex gap-4 overflow-x-auto">
              {gameData?.screenshots &&
                (gameData?.screenshots?.length > 0 ? (
                  gameData?.screenshots?.map((image, index) => (
                    <div key={index} className="flex-none">
                      <ImageWithLoader
                        src={`${image.image}`}
                        width={560}
                        alt="Game screenshot"
                        failedImage ="/ImageNotFound.png"
                      />
                    </div>
                  ))
                ) : (
                  <div className="ps-5">No Image To Show</div>
                ))}
            </div>
          </section>
          <section>
            <div className="mb-5">
              <div
                className={`font-semibold text-2xl text-gray-400 text-center`}
              >
                <span className="cursor-pointer">Additional Information</span>
              </div>
            </div>

            <div className="row mb-3 text-center">
              <div className="col-6 col-md-4">
                <GameInfoComp label="Title" value={gameData?.title} />
              </div>
              <div className="col-6 col-md-4">
                <GameInfoComp label="Developer" value={gameData?.developer} />
              </div>
              <div className="col-6 col-md-4">
                <GameInfoComp label="Publisher" value={gameData?.publisher} />
              </div>
              <div className="col-6 col-md-4">
                <GameInfoComp
                  label="Release Date"
                  value={gameData?.release_date}
                />
              </div>
              <div className="col-6 col-md-4">
                <GameInfoComp label="Genre" value={gameData?.genre} />
              </div>
              <div className="col-6 col-md-4">
                <GameInfoComp label="Platform" value={gameData?.platform} />
              </div>
            </div>
          </section>
        </div>
      ) : isLoading ? (
        <div className="w-full flex justify-center hscreen align-items-center">
          <div className="loader"></div>
        </div>
      ) : (
        <div>No Data to Show</div>
      )}
    </>
  );
};

export default ParticularGame;
