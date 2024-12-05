// src/utils/imageUtils.js
import { getCricketImageCBs, getCricketImageDB, getUploadImageCloudinary } from "../Features";

export const getImageUrl = async (imageId, imageUrls, setImageUrls, setLoadingImages, dispatch) => {
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
          await dispatch(getUploadImageCloudinary(response.imageUrl, imageId));
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
