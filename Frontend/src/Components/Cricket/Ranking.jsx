import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import {
  getCricketImageCBs,
  getCricketImageDB,
  getUploadImageCloudinary,
} from "../../Features";
import Badge from "react-bootstrap/Badge";

const Ranking = () => {
  const location = useLocation();
  const Data = location.state?.rankingsData;
  const dispatch = useDispatch();
  const [rankingData, setRankingData] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [loadingImages, setLoadingImages] = useState({});

  useEffect(() => {
    if (Data) {
      setRankingData(Data);
      fetchImages(Data.rank);
    }
  }, [Data]);

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

  return (
    <div>
      <div className="mt-4">
        <NavLink>
          <Badge pill className="fs-6 me-5" bg="secondary">
            Men
          </Badge>
        </NavLink>
        <NavLink>
          <Badge pill className="fs-6 me-3" bg="secondary">
            Women
          </Badge>
        </NavLink>
      </div>
      <div className="mt-4 mb-3">
        <NavLink>
          <Badge pill className="fs-6 me-3" bg="secondary">
            Test
          </Badge>
        </NavLink>
        <NavLink>
          <Badge pill className="fs-6 me-3" bg="secondary">
            ODI
          </Badge>
        </NavLink>
        <NavLink>
          <Badge pill className="fs-6 me-3" bg="secondary">
            T20
          </Badge>
        </NavLink>
      </div>
      {rankingData.rank?.length > 0 ? (
        <div>
          {rankingData.rank.map((data, index) => {
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
