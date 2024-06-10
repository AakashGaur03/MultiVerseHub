import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  getCricketImageCBs,
  getCricketImageDB,
  getUploadImageCloudinary,
} from "../../Features";

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
    setLoadingImages(
      rankings.reduce((acc, data) => {
        acc[data.faceImageId] = true;
        return acc;
      }, {})
    );

    //     for (const data of rankings) {
    //       await getImageUrl(data.faceImageId);
    //     }
    //   };
    const imageFetchPromises = rankings.map((data) =>
      getImageUrl(data.faceImageId)
    );

    await Promise.all(imageFetchPromises);
  };

  const getImageUrl = async (faceImageId) => {
    if (!imageUrls[faceImageId]) {
      try {
        const imageDB = await dispatch(getCricketImageDB(faceImageId));
        if (imageDB) {
          setImageUrls((prevState) => ({
            ...prevState,
            [faceImageId]: imageDB.secureUrl,
          }));
        } else {
          const response = await dispatch(getCricketImageCBs(faceImageId));
          if (response) {
            setImageUrls((prevState) => ({
              ...prevState,
              [faceImageId]: response.imageUrl,
            }));
            await dispatch(
              getUploadImageCloudinary(response.imageUrl, faceImageId)
            );
          }
          await new Promise((resolve) => setTimeout(resolve, 300));
        }
      } catch (error) {
        console.error("Error fetching image URL:", error);
      } finally {
        setLoadingImages((prevState) => ({
          ...prevState,
          [faceImageId]: false,
        }));
      }
    }
  };

  return (
    <div>
      {rankingData.rank?.length > 0 ? (
        <div>
          {rankingData.rank.map((data, index) => (
            <div key={index} className="flex">
              <div>{data.rank}</div>
              <div>{data.rating}</div>
              <div>{data.faceImageId}</div>
              {loadingImages[data.faceImageId] ? (
                <div>Loading...</div>
              ) : (
                <img src={imageUrls[data.faceImageId]} alt="" />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>No Data Available</div>
      )}
    </div>
  );
};

export default Ranking;
