import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  // getGamesSectionData,
  getGamesSectionDataCategoryWise,
} from "../../Features";
import { formatDateinHumanredable } from "../../GlobalComp/formatDate";
import { useNavigate } from "react-router-dom";
import ImageWithLoader from "../../GlobalComp/ImageWithLoader";
import { LikeButton } from "../..";

const Games = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [allgames, setAllGames] = useState([]);
  const [platform, setPlatform] = useState("all");
  const [category, setcategory] = useState("mmorpg");
  const [sortBy, setSortBy] = useState("relevance");
  const loaderTrue = useSelector((state) => state.games.status === "loading");
  const allGameState = useSelector((state) => state.games.gamesDataCategoryWise);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(loaderTrue);
  }, [loaderTrue]);
  useEffect(() => {
    callAPI();
  }, [platform, category, sortBy]);
  const callAPI = async () => {
    const payload = {
      category,
      sortBy,
      platform,
    };
    // category="strategy",sortBy="release-date",platform="all"
    const response = await dispatch(getGamesSectionDataCategoryWise(payload));
    // console.log(response);
    // setAllGames(response);
  };

  useEffect(() => {
    setAllGames(allGameState);
  }, [allGameState]);

  const particularGameCall = async (id) => {
    navigate(`/game/${id}`);
    window.scroll(0, 0);
  };
  const updatePlatform = (e) => {
    setPlatform(e.target.value);
  };
  const updateCategory = (e) => {
    setcategory(e.target.value);
  };
  const updateSortBy = (e) => {
    setSortBy(e.target.value);
  };
  return (
    <>
      <div className=" my-2 ">
        <div className="flex justify-evenly flex-wrap">
          <form className="">
            <label htmlFor="default" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Platform
            </label>
            <select
              id="default"
              onChange={updatePlatform}
              className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="all">All Platforms</option>
              <option value="pc">Windows (PC)</option>
              <option value="browser">Browser (WEB)</option>
            </select>
          </form>
          <form className="">
            <label htmlFor="default" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Category
            </label>
            <select
              id="default"
              onChange={updateCategory}
              className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="mmorpg">MMORPG</option>
              <option value="mmo">MMO</option>
              <option value="shooter">Shooter</option>
              <option value="strategy">Strategy</option>
              <option value="moba">Moba</option>
              <option value="card">Card Games</option>
              <option value="racing">Racing</option>
              <option value="sports">Sports</option>
              <option value="social">Social</option>
              <option value="fighting">Fighting</option>
              <option value="mmofps">MMOFPS</option>
              <option value="action-rpg">Action RPG</option>
              <option value="sandbox">Sandbox</option>
              <option value="open-world">Open World</option>
              <option value="survival">Survival</option>
              <option value="battle-royale">Battle Royale</option>
              <option value="mmotps">MMOTPS</option>
              <option value="anime">Anime</option>
              <option value="pvp">PvP</option>
              <option value="pve">PvE</option>
              <option value="pixel">Pixel</option>
              <option value="mmorts">MMORTS</option>
              <option value="fantasy">Fantasy</option>
              <option value="sci-fi">Sci-Fi</option>
              <option value="action">Action</option>
              <option value="voxel">Voxel</option>
              <option value="zombie">Zombie</option>
              <option value="turn-based">Turn-Based</option>
              <option value="first-person">First Person View</option>
              <option value="third-Person">Third Person View</option>
              <option value="top-down">Top-Down View</option>
              <option value="3d">3D Graphics</option>
              <option value="2d">2D Graphics</option>
              <option value="tank">Tank</option>
              <option value="space">Space</option>
              <option value="sailing">Sailing</option>
              <option value="side-scroller">Side Scroller</option>
              <option value="superhero">Superhero</option>
              <option value="permadeath">Permadeath</option>
            </select>
          </form>
          <form className="">
            <label htmlFor="default" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Platform
            </label>
            <select
              id="default"
              onChange={updateSortBy}
              className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="relevance"> Relevance</option>
              <option value="popularity">Popularity</option>
              <option value="release-date">Release Date</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </form>
        </div>

        <div className="font-semibold text-2xl text-gray-400 text-center">Total ({allgames?.length})</div>

        <div className="flex flex-wrap justify-center pb-4 pt-10">
          {allgames?.length > 0 ? (
            allgames.map((data, index) => (
              <div className="activeClass m-4 cursor-pointer relative" key={data.id}>
                <div className="absolute z-10 right-4 top-[-30px]">
                  <LikeButton customId={`likeButton-games-${data.id}`} />
                </div>
                <div onClick={() => particularGameCall(data.id)}>
                  <Card style={{ width: "18rem", minHeight: "150px" }} className="overflow-x-auto rounded-3xl ">
                    {/* <Card.Img
                    variant="top"
                    className="h-100"
                    src={`${data.thumbnail}`}
                  /> */}
                    <ImageWithLoader src={`${data.thumbnail}`} alt="Game Thumbnail" failedImage="/ImageNotFound.png" />
                  </Card>
                  <div className="text-center mt-2 text-ellipsis w-60 whitespace-nowrap overflow-hidden font-semibold text-gray-300">
                    {data.title}
                  </div>
                  {data.release_date && (
                    <div className="text-center mt-2 text-ellipsis w-60 whitespace-nowrap overflow-hidden font-semibold text-gray-300">
                      Release Date : {formatDateinHumanredable(data.release_date)}
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
    </>
  );
};

export default Games;
