// batsmen|bowlers|allrounders|teams
// test|odi|t20 (if isWomen parameter is 1, there will be no odi)
// isWomen (optional) Set to 1 to get rankings for women
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  getCricketImageCBs,
  getCricketImageDB,
  getCricketRanking,
  getUploadImageCloudinary,
} from "../../Features";
import Badge from "react-bootstrap/Badge";
import { Button } from "react-bootstrap";

const Ranking = () => {
  const location = useLocation();
  const Data = location.state?.rankingsData;
  const dispatch = useDispatch();
  const [rankingData, setRankingData] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [loadingImages, setLoadingImages] = useState({});
  const [selectedGender, setSelectedGender] = useState("men");
  const [selectedFormat, setSelectedFormat] = useState("test");
  const [selectedCategory, setSelectedCategory] = useState("batsmen");

  useEffect(() => {
    if (Data) {
      setRankingData(Data);
      fetchImages(Data.rank);
    }
  }, [Data]);
  useEffect(() => {
    if (selectedGender === "women" && selectedFormat === "test") {
      setSelectedFormat("odi");
    }
  }, [selectedGender, selectedFormat, selectedCategory]);

  useEffect(() => {
    if (!(selectedGender === "women" && selectedFormat === "test")) {
      callRankingApi();
    }
  }, [selectedFormat, selectedGender, selectedCategory]);

  const fetchImages = async (rankings) => {
    const newLoadingImages = {};
    rankings.forEach((data) => {
      const imageId = data.faceImageId || data.imageId;
      newLoadingImages[imageId] = true;
    });
    setLoadingImages(newLoadingImages);

    for (const data of rankings) {
      const imageId = data.faceImageId || data.imageId;
      await getImageUrl(imageId);
      await new Promise((resolve) => setTimeout(resolve, 500)); // Adding 500ms delay between each fetch
    }
  };

  const getImageUrl = async (imageId) => {
    if (!imageUrls[imageId]) {
      try {
        const imageDB = await dispatch(getCricketImageDB(imageId));
        if (imageDB) {
          setImageUrls((prevState) => ({
            ...prevState,
            [imageId]: imageDB.secureUrl,
          }));
        } else {
          const response = await dispatch(getCricketImageCBs(imageId));
          if (response) {
            setImageUrls((prevState) => ({
              ...prevState,
              [imageId]: response.imageUrl,
            }));
            await dispatch(
              getUploadImageCloudinary(response.imageUrl, imageId)
            );
          }
        }
      } catch (error) {
        console.error("Error fetching image URL:", error);
      } finally {
        setLoadingImages((prevState) => ({
          ...prevState,
          [imageId]: false,
        }));
      }
    } else {
      setLoadingImages((prevState) => ({
        ...prevState,
        [imageId]: false,
      }));
    }
  };

  const updateSelectedFormat = (format) => {
    setSelectedFormat(format);
    // callRankingApi();
  };

  const callRankingApi = async () => {
    let response = await dispatch(
      getCricketRanking(
        selectedFormat,
        selectedGender === "women" ? "1" : "",
        selectedCategory
      )
    );
    setRankingData(response);
    fetchImages(response.rank);
  };

  return (
    <div>
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
        <div>
          {rankingData.rank.slice(0, 15).map((data, index) => {
            const imageId = data.faceImageId || data.imageId;
            return (
              <div key={index} className="flex">
                <div>{data.rank}</div>
                <div>{data.rating}</div>
                <div>{imageId}</div>
                {loadingImages[imageId] ? (
                  <div>Loading...</div>
                ) : (
                  <img src={imageUrls[imageId]} alt="" />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div>No Data Available</div>
      )}
    </div>
  );
};

export default Ranking;
