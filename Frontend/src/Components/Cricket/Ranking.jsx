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

  useEffect(() => {
    if (Data) {
      setRankingData(Data);
    }
  }, [Data]);

  const getImageUrl = async (faceImageId) => {
    if (Data) {
      if (!imageUrls[faceImageId]) {
        try {
          // const response = await dispatch(getCricketImageCBs(faceImageId));
          // const uploadResponse = await dispatch(getUploadImageCloudinary(response.imageUrl,faceImageId));
          // console.log(uploadResponse.secure_url,"uploadResponse")
          // console.log(response.imageUrl,"response.imageUrl")

          const imageDB = await dispatch(getCricketImageDB(faceImageId));
          console.log(imageDB,"imageDBimageDB")
          if (imageDB) {
            console.log("1111111");
            setImageUrls((prevState) => ({
              ...prevState,
              [faceImageId]: imageDB.secureUrl,
            }));
          } else {
            console.log("22222");

            const response = await dispatch(getCricketImageCBs(faceImageId));
            if (response) {
              setImageUrls((prevState) => ({
                ...prevState,
                [faceImageId]: response.imageUrl,
              }));
            }
            const uploadResponse = await dispatch(
              getUploadImageCloudinary(response.imageUrl, faceImageId)
            );
          }

          // if (uploadResponse) {
          //   setImageUrls(prevState => ({
          //     ...prevState,
          //     [faceImageId]: response.imageUrl
          //   }));
          // }
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
              <div onClick={() => getImageUrl(data.faceImageId)}>
                {data.faceImageId}
              </div>
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
