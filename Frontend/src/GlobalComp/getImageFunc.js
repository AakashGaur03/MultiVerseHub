// src/utils/imageUtils.js
import { getCricketImageCBs, getCricketImageDB, getUploadImageCloudinary } from "../Features";
import { useDispatch } from "react-redux";

export const getImageUrl = async (imageId, imageUrls, setImageUrls, setLoadingImages, dispatch) => {
  if (!imageUrls[imageId]) {
    try {
      console.log("Enter The Code")
      const imageDB = await dispatch(getCricketImageDB(imageId));
      
      if (imageDB) {
        console.log("Enter The Code With Image",imageDB)
        setImageUrls((prevState) => ({
          ...prevState,
          [imageId]: imageDB.secureUrl,
        }));
      } else {
      console.log("Enter The Code With out image")
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
      console.log("Exit The Code")

    } catch (error) {
      console.error("Error fetching image URL:", error);
    } finally {
      console.log("Full Exit The Code")
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
