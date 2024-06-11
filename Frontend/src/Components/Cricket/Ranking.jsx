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

  // const fetchImages = async (rankings) => {
  //   setLoadingImages(
  //     rankings.reduce((acc, data) => {
  //       const imageId = data.faceImageId || data.imageId;
  //       acc[imageId] = true;
  //       return acc;
  //     }, {})
  //   );

  //   //     for (const data of rankings) {
  //   //       await getImageUrl(imageId);
  //   //     }
  //   //   };
  //   const imageFetchPromises = rankings.map((data) => {
  //     const imageId = data.faceImageId || data.imageId;
  //     return getImageUrl(imageId);
  //   });

  //   await Promise.all(imageFetchPromises);
  // };
  const fetchImages = async (rankings) => {
    setLoadingImages(
      rankings.reduce((acc, data) => {
        const imageId = data.faceImageId || data.imageId;
        acc[imageId] = true;
        return acc;
      }, {})
    );

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
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      } catch (error) {
        console.error("Error fetching image URL:", error);
      } finally {
        setLoadingImages((prevState) => ({
          ...prevState,
          [imageId]: false,
        }));
      }
    }
  };

  return (
    <div>
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
