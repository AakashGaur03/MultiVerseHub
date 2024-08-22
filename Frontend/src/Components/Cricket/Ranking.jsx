// batsmen|bowlers|allrounders|teams
// test|odi|t20 (if isWomen parameter is 1, there will be no odi)
// isWomen (optional) Set to 1 to get rankings for women
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";

import {
  getCricketImageCBs,
  getCricketImageDB,
  getCricketRanking,
  getUploadImageCloudinary,
} from "../../Features";
import Badge from "react-bootstrap/Badge";
import { getImageUrl } from "../../GlobalComp/getImageFunc";

const Ranking = () => {
  const storeRankingData = useSelector((state) => state.cricket.rankingData);
  const location = useLocation();
  const Data = location.state?.rankingsData;
  const dispatch = useDispatch();
  const [rankingData, setRankingData] = useState([]);
  const [rankindDataType, setRankindDataType] = useState("");
  const [imageUrls, setImageUrls] = useState({});
  const [loadingImages, setLoadingImages] = useState({});
  const [selectedGender, setSelectedGender] = useState("men");
  const [selectedFormat, setSelectedFormat] = useState("test");
  const [selectedCategory, setSelectedCategory] = useState("batsmen");
  const [cache, setCache] = useState({});
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (Data) {
  //     setRankingData(Data);
  //     fetchImages(Data.rank);
  //   }
  // }, [Data]);
  useEffect(() => {
    // if (selectedGender === "women" && selectedFormat === "test") {
    //   setSelectedFormat("odi");
    // } else {
    //   const cachedData = getCachedData();
    //   if (cachedData) {
    //     setRankingData(cachedData);
    //     fetchImages(cachedData.rank);
    //   } else {
    callRankingApi();
    // }
    // }
  }, [selectedGender, selectedFormat, selectedCategory]);

  const getCachedData = () => {
    const key = `${selectedGender}-${selectedFormat}-${selectedCategory}`;
    return cache[key];
  };
  const updateCache = (data) => {
    const key = `${selectedGender}-${selectedFormat}-${selectedCategory}`;
    setCache((prevCache) => ({ ...prevCache, [key]: data }));
  };

  const fetchImages = async (rankings) => {
    const newLoadingImages = {};
    rankings?.forEach((data) => {
      const imageId = data.faceImageId || data.imageId;
      newLoadingImages[imageId] = true;
    });
    setLoadingImages(newLoadingImages);

    if (rankings) {
      for (const data of rankings) {
        const imageId = data.faceImageId || data.imageId;
        // await getImageUrl(imageId);
        await getImageUrl(
          imageId,
          imageUrls,
          setImageUrls,
          setLoadingImages,
          dispatch
        );
        // await new Promise((resolve) => setTimeout(resolve, 500)); // Adding 500ms delay between each fetch
      }
    }
  };
  const updateSelectedFormat = (format) => {
    if (selectedGender === "women" && format === "test") {
      setSelectedFormat("odi");
    } else {
      setSelectedFormat(format);
    }
  };

  const callRankingApi = async () => {
    try {
      let format = selectedFormat;
      let category = selectedCategory;
      let isWomen = selectedGender === "women" ? "1" : "";
      let payload = {
        format: selectedFormat,
        category: selectedCategory,
        isWomen: selectedGender === "women" ? "1" : "",
        prevData: storeRankingData,
      };
      let name = `${format}${isWomen}${category}`;
      setRankindDataType(name);
      await dispatch(getCricketRanking(payload));
    } catch (error) {
      console.error("Error fetching ranking data:", error);
    }
  };

  useEffect(() => {
    setRankingData(storeRankingData?.[rankindDataType]);
    updateCache(storeRankingData?.[rankindDataType]);
    fetchImages(storeRankingData?.[rankindDataType]?.rank);
  }, [storeRankingData]);

  const callParticularPlayer = (playerId) => {
    console.log("wdsddssdsd")
    if(selectedCategory != "teams"){
      navigate(`/cricket/playerInfo/${playerId}`);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="w-full pl-0 md:pl-11">
      <div className="mt-4">
        <Badge
          pill
          className={`fs-6 me-5 cursor-pointer ${
            selectedGender === "men" ? "bg-primary" : "bg-secondary"
          }`}
          onClick={() => setSelectedGender("men")}
        >
          Men
        </Badge>
        <Badge
          pill
          className={`fs-6 me-5 cursor-pointer ${
            selectedGender === "women" ? "bg-primary" : "bg-secondary"
          }`}
          onClick={() => setSelectedGender("women")}
        >
          Women
        </Badge>
      </div>
      <div className="mt-4 mb-3">
        {selectedGender == "men" && (
          <Badge
            pill
            className={`fs-6 me-3 cursor-pointer ${
              selectedFormat === "test" ? "bg-primary" : "bg-secondary"
            } `}
            onClick={() => updateSelectedFormat("test")}
          >
            Test
          </Badge>
        )}
        <Badge
          pill
          className={`fs-6 me-3 cursor-pointer ${
            selectedFormat === "odi" ? "bg-primary" : "bg-secondary"
          } `}
          onClick={() => updateSelectedFormat("odi")}
        >
          ODI
        </Badge>
        <Badge
          pill
          className={`fs-6 me-3 cursor-pointer ${
            selectedFormat === "t20" ? "bg-primary" : "bg-secondary"
          } `}
          onClick={() => updateSelectedFormat("t20")}
        >
          T20
        </Badge>
      </div>
      <div>
        <Badge
          pill
          className={`fs-6 me-5 cursor-pointer ${
            selectedCategory === "batsmen" ? "bg-primary" : "bg-secondary"
          }`}
          onClick={() => setSelectedCategory("batsmen")}
        >
          Batting
        </Badge>
        <Badge
          pill
          className={`fs-6 me-5 cursor-pointer ${
            selectedCategory === "bowlers" ? "bg-primary" : "bg-secondary"
          }`}
          onClick={() => setSelectedCategory("bowlers")}
        >
          Bowling
        </Badge>
        <Badge
          pill
          className={`fs-6 me-5 cursor-pointer ${
            selectedCategory === "allrounders" ? "bg-primary" : "bg-secondary"
          }`}
          onClick={() => setSelectedCategory("allrounders")}
        >
          All-rounders
        </Badge>
        <Badge
          pill
          className={`fs-6 me-5 cursor-pointer ${
            selectedCategory === "teams" ? "bg-primary" : "bg-secondary"
          }`}
          onClick={() => setSelectedCategory("teams")}
        >
          Teams
        </Badge>
      </div>
      {rankingData?.rank?.length > 0 ? (
        <Table responsive className="table" borderless hover variant="dark">
          <thead>
            <tr>
              <th>Position</th>
              {selectedCategory !== "teams" && <th>Player</th>}
              {selectedCategory == "teams" && <th>Teams</th>}
              <th>Info</th>
              {selectedCategory == "teams" && <th>Ratings</th>}
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {rankingData.rank.slice(0, 15).map((data, index) => {
              const imageId = data.faceImageId || data.imageId;
              return (
                <tr key={index} className="d-fle x" onClick={() => callParticularPlayer(data.id)}>
                  <td>{data.rank || "-"}</td>
                  {loadingImages[imageId] ? (
                    <td>Loading...</td>
                  ) : (
                    <td>
                      <img
                        style={{ maxHeight: "68px", maxWidth: "90px" }}
                        src={imageUrls[imageId]}
                        alt=""
                      />
                    </td>
                  )}
                  <td>
                    <>
                      {data.name || "-"}
                      {selectedCategory == "teams" && data.matches && (
                        <div>Matches: {data.matches || "-"}</div>
                      )}
                      {selectedCategory !== "teams" && (
                        <div>{data.country || "-"}</div>
                      )}
                    </>
                  </td>
                  {selectedCategory == "teams" && <td>{data.rating || "-"}</td>}
                  <td>{data.points || "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <div>No Data Available</div>
      )}
    </div>
  );
};

export default Ranking;
