import { useSelector } from "react-redux";
import { formatDateinHumanredable } from "../../GlobalComp/formatDate";
import ImageWithLoader from "../../GlobalComp/ImageWithLoader";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import CustomCircularProgressRating from "../../GlobalComp/CustomCircularProgressRating";

const Favorite = () => {
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.getCurrentStatus.isUserLoggedIn);
  const favSectionData = useSelector((state) => state?.favSection?.allItem?.data?.favorite);
  const activeSidebarItem = useSelector((state) => state.sidebar.currentSidebar);
  const [currentSidebarItem, setCurrentSidebarItem] = useState("All");
  const loaderTrue = useSelector((state) => state.games.status === "loading");
  const [isLoading, setIsLoading] = useState(false);
  const [allGames, setsetAllGames] = useState({});
  const [allEntertainment, setAllEntertainment] = useState({});
  console.log(favSectionData, "favSectionDatafavSectionData");
  useEffect(() => {
    setAllEntertainment(favSectionData?.entertainment);
  }, [favSectionData]);
  useEffect(() => {
    setsetAllGames(favSectionData?.game);
  }, [favSectionData]);
  useEffect(() => {
    setCurrentSidebarItem(activeSidebarItem);
  }, [activeSidebarItem]);
  useEffect(() => {
    setIsLoading(loaderTrue);
  }, [loaderTrue]);
  const particularGameCall = async (id) => {
    navigate(`/game/${id}`);
    window.scroll(0, 0);
  };
  const infoAboutItem = (id, category) => {
    navigate(`/particulars/${category}/${id}`);
  };
  return (
    <>
      {!isLoggedIn && (
        <div className="favSaction w-full">
          {/* <LikeButton /> */}
          <div>Please Login to Unlock favorite Section</div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height={50}>
              <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
            </svg>
          </div>
        </div>
      )}
      {isLoggedIn && (
        <div className="overflow-y-auto w-full">
          {isLoggedIn && (currentSidebarItem === "Game" || currentSidebarItem === "All") && (
            <div className="favSactionAfterLogin">
              <div className="flex flex-wrap justify-center pb-4 pt-10">
                {allGames?.length > 0 ? (
                  allGames.map((data) => (
                    <div className="activeClass m-4 cursor-pointer relative" key={data.gameId}>
                      <div className="absolute z-10 right-4 top-[-30px]">
                        {/* <LikeButton
                    customId={`likeButton-games-${data.id}`}
                    isActive={!!likedItems[data.id]}
                    onClick={() => handleLikeClick(data)}
                  /> */}
                      </div>
                      <div onClick={() => particularGameCall(data.gameId)}>
                        <Card style={{ width: "18rem", minHeight: "150px" }} className="overflow-x-auto rounded-3xl ">
                          {/* <Card.Img
                    variant="top"
                    className="h-100"
                    src={`${data.thumbnail}`}
                  /> */}
                          <ImageWithLoader
                            src={`${data.thumbnail}`}
                            alt="Game Thumbnail"
                            failedImage="/ImageNotFound.png"
                          />
                        </Card>
                        <div className="text-center mt-2 text-ellipsis w-60 whitespace-nowrap overflow-hidden font-semibold text-gray-300">
                          {data.title}
                        </div>
                        {data.releaseDate && (
                          <div className="text-center mt-2 text-ellipsis w-60 whitespace-nowrap overflow-hidden font-semibold text-gray-300">
                            Release Date : {formatDateinHumanredable(data.releaseDate)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : isLoading ? (
                  <div className="w-full flex justify-center">
                    <div className="loader"></div>
                  </div>
                ) : (
                  <div>No Data to Show</div>
                )}
              </div>
            </div>
          )}
          {isLoggedIn && (currentSidebarItem === "Entertainment" || currentSidebarItem === "All") && (
            <div className="overflow-y-auto flex my-2 px-5">
              <div className="flex gap-8 pb-4 pt-10 w-full">
                {allEntertainment?.length > 0 ? (
                  allEntertainment.map((data) => (
                    <div className="activeClass relative" key={data.entertainmentId}>
                      <div className="absolute z-10 right-4 top-[-30px]">
                        {/* <LikeButton
                      customId={`likeButton-entertainment-${data.entertainmentId}`}
                      isActive={!!likedItems[data.entertainmentId]}
                      onClick={() => handleLikeClick(data, MovieOrTv)}
                    /> */}
                      </div>
                      <Card
                        style={{ width: "15rem", minHeight: "357px" }}
                        className="overflow-x-auto rounded-3xl "
                        onClick={() => infoAboutItem(data.entertainmentId, data.entertainmentType)}
                      >
                        <ImageWithLoader
                          variant="top"
                          className="h-100"
                          src={`https://image.tmdb.org/t/p/w500${data.posterUrl}`}
                          alt="Movie Thumbnail"
                          failedImage="/ImageNotFoundVertical.png"
                        />
                      </Card>
                      <div className="flex justify-center mt-3 ">
                        <CustomCircularProgressRating voteAverage={data?.voteAverage} />
                      </div>

                      <div className="text-center mt-2 text-ellipsis w-60 whitespace-nowrap overflow-hidden font-semibold text-gray-300">
                        {data.title}
                      </div>
                      {data.releaseDate && (
                        <div className="text-center mt-2 text-ellipsis w-60 whitespace-nowrap overflow-hidden font-semibold text-gray-300">
                          Release Date : {formatDateinHumanredable(data.releaseDate)}
                        </div>
                      )}
                      {data.firstAirDate && (
                        <div className="text-center mt-2 text-ellipsis w-60 whitespace-nowrap overflow-hidden font-semibold text-gray-300">
                          Release Date : {formatDateinHumanredable(data.firstAirDate)}
                        </div>
                      )}
                    </div>
                  ))
                ) : isLoading ? (
                  <div className="w-full flex justify-center">
                    <div className="loader"></div>
                  </div>
                ) : (
                  <div>No Data to Show</div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Favorite;
