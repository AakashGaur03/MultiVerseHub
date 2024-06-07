import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getCricketImageCBs,getUploadImageCloudinary } from "../../Features";

const Ranking = () => {
  const location = useLocation();
  const Data = location.state?.rankingsData;
  const dispatch = useDispatch();
  const [rankingData, setRankingData] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    if (Data) {
      setRankingData(Data);
    }
  }, [Data]);

  const getImageUrl = async (faceImageId) => {
    if (Data) {
    if (!imageUrls[faceImageId]) {
        try {
          const response = await dispatch(getCricketImageCBs(faceImageId));
          const uploadResponse = await dispatch(getUploadImageCloudinary(response.imageUrl,faceImageId)); 
          if (uploadResponse) {
            setImageUrls(prevState => ({
              ...prevState,
              [faceImageId]: response.imageUrl 
            }));
          }
        } catch (error) {
          console.error("Error fetching image URL:", error);
        }
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
              <div onClick={() => getImageUrl(data.faceImageId)}>{data.faceImageId}</div>
              <img src={imageUrls[data.faceImageId]} alt="" />
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
