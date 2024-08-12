import React, { useEffect, useState } from "react";
import { Card, Col, Dropdown, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  // getGamesSectionData,
  getGamesSectionDataCategoryWise,
  getGamesParticularsData,
} from "../../Features";
import { formatDateinHumanredable } from "../../GlobalComp/formatDate";
import { useNavigate } from "react-router-dom";

const Games = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [allgames, setAllGames] = useState([]);

  useEffect(() => {
    callAPI();
  }, []);
  const callAPI = async () => {
    const payload = {
      category: "mmorpg",
    };
    const response = await dispatch(getGamesSectionDataCategoryWise(payload));
    console.log(response);
    setAllGames(response);
  };
  const particularGameCall = async (id) => {
    navigate(`/game/${id}`);
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className=" my-2 ">
        {/* <div>
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={toggleDropdown}
              >
                Options
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {isOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Option 1
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Option 2
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Option 3
                  </a>
                </div>
              </div>
            )}
          </div>
        </div> */}
        {/* <Dropdown>
          <Dropdown.Toggle id="dropdown-basic">
            All Platforms
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Windows (PC)</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Browser (WEB)</Dropdown.Item>
            <Dropdown.Item href="#/action-3">All Platforms</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
        {/* <Form.Select aria-label="Default select example" className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option>All Platforms</option>
          <option value="1">Windows (PC)</option>
          <option value="2">Browser (WEB)</option>
        </Form.Select> */}

        <div className="flex justify-evenly">
          <form class="">
            <label
              for="default"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Platform
            </label>
            <select
              id="default"
              class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>All Platforms</option>
              <option value="CA">Windows (PC)</option>
              <option value="FR">Browser (WEB)</option>
            </select>
          </form>
          <form class="">
            <label
              for="default"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Platform
            </label>
            <select
              id="default"
              class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected value="mmo">MMO</option>
              <option value="mmorpg">MMORPG</option>
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
          <form class="">
            <label
              for="default"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Platform
            </label>
            <select
              id="default"
              class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected> Relevance</option>
              <option value="CA">Popularity</option>
              <option value="FR">Release Date</option>
              <option value="FR">Alphabetical</option>
            </select>
          </form>
        </div>

        <div className="flex flex-wrap justify-center pb-4 pt-10">
          {allgames?.length > 0 ? (
            allgames.map((data, index) => (
              <div
                className="activeClass m-4 cursor-pointer relative"
                key={data.id}
                onClick={() => particularGameCall(data.id)}
              >
                <Card
                  style={{ width: "18rem" }}
                  className="overflow-x-auto rounded-3xl "
                >
                  <Card.Img
                    variant="top"
                    className="h-100"
                    src={`${data.thumbnail}`}
                  />
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
            ))
          ) : (
            <div>No Data to Show</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Games;
