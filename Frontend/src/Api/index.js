import axios from "axios";

export const registerUserApi = async (userData) => {
  const response = await axios.post(
    "http://localhost:8000/api/v1/users/register",
    userData
  );

  return response;
};

export const loginUserApi = async (data) => {
  const response = await axios.post(
    "http://localhost:8000/api/v1/users/login",
    data
  );

  return response;
};

export const logoutuserApi = async (accessToken) => {
  const response = await axios.post(
    "http://localhost:8000/api/v1/users/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response;
};

export const getCurrentUserStatusApi = async (accessToken) => {
  const response = await axios.get(
    "http://localhost:8000/api/v1/users/current-user",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response;
};

// sendOTP
export const sendOTPApi = async (emailId) => {
  const response = await axios.post(
    "http://localhost:8000/api/v1/users/send-otp-mail",
    emailId
  );

  return response;
};
// verifyOTP
export const verifyOTPApi = async (otp) => {
  const response = await axios.post(
    "http://localhost:8000/api/v1/users/verifyOTP",
    otp
  );

  return response;
};
// resetPassword
export const resetPassordApi = async (data) => {
  const response = await axios.post(
    "http://localhost:8000/api/v1/users/create-new-password",
    data
  );

  return response;
};

export const getNewsAPIFunc = async (query) => {
  if (query === "") query = "India";
  const response = await axios.get(
    `http://localhost:8000/api/v1/users/newsApi?query=${query}`
  );

  return response;
};

// export const getCricketAPIFunc = async (query) => {
//   if (query === "") query = "recent";
//   const response = await axios.get(
//     `http://localhost:8000/api/v1/users/cricketApi/${query}`
//   );
//   return response
// };

export const getCricketAPIFunc = async (query) => {
  if (query === "") query = "recent";
  // console.log(query, "ff");
  const response = await axios.get(
    `http://localhost:8000/api/v1/users/cricketApi`
  );
  return response.data;
};
export const getCricketPointsTableAPIFunc = async (seriesId) => {
  // if (query === "") query = "recent";
  // console.log(query, "ff");
  const response = await axios.get(
    `http://localhost:8000/api/v1/users/${seriesId}/pointsTable`
  );
  // console.log(response.data,"asasasasasasass")
  return response.data.data.responseData;
};
export const getCricketNewsCBAPIFunc = async () => {
  // if (query === "") query = "recent";
  // console.log(query, "ff");
  const response = await axios.get(
    `http://localhost:8000/api/v1/users/cricketnewscb`
  );
  // console.log(response.data,"asasasasasasass")
  return response.data.data.responseData;
};
export const getCricketRankingAPIFunc = async (format, isWomen, category) => {
  // console.log(isWomen,"isWomenisWomenisWomen")
  // console.log(category,"categorycategorycategory")
  let url = `http://localhost:8000/api/v1/users/cricketRankings/${format}/${category}`;
  if (isWomen !== undefined && isWomen !== "") {
    url += `/${isWomen}`;
  }
  const response = await axios.get(url);
  return response.data.data.responseData;
};
export const getUploadImageCloudinaryFunc = async (imageUrl, faceImageID) => {
  // console.log("Request to backend with image URL:", imageUrl);
  const payload = { imageUrl, faceImageID };
  try {
    const response = await axios.post(`http://localhost:8000/api/v1/users/uploadImagetoCloudinary`, payload);
    // console.log("Response from backend:", response.data);
    return response.data.data.responseData;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
};
export const getImageDBFunc = async (faceImageID) => {
  // console.log("Request to backend with image faceimageID:", faceImageID);
  const payload = { faceImageID };
  try {
    const response = await axios.post(`http://localhost:8000/api/v1/users/getImageFromDB`, payload);
    // console.log("Response from backend:", response.data);
    return response.data.data.responseData;
  } catch (error) {
    console.error("Error getting image from DB:", error);
    throw error;
  }
};

export const getCricketImageCBAPIFunc = async (query) => {
  const response = await axios.get(
    `http://localhost:8000/api/v1/users/cricketImageApi?query=${query}`
  );
  // return response.data;
  // console.log(response.data,"asasasasasasass")
  return response.data.data;
};

export const getWeatherAPIFunc = async (city) => {
  if (city == "") city = "Delhi";
  const response = await axios.get(
    `http://localhost:8000/api/v1/users/weatherApi?query=${city}`
  );
  return response.data.data.responseData;
};
export const getWordOfTheDayAPIFunc = async () => {
  const response = await axios.get(
    `http://localhost:8000/api/v1/users/wordofthedayApi`
  );
  // console.log(response, "RESSSSSS");
  return response.data.data.responseData;
};
export const getEntertainmentDataMovieAPIFunc = async (payload) => {
  const response = await axios.post(
    `http://localhost:8000/api/v1/users/entertainmentMovieApi`, payload
  );
  return response.data.data.responseData;
};
export const getEntertainmentParticularsDataAPIFunc = async (payload) => {
  const response = await axios.post(
    `http://localhost:8000/api/v1/users/entertainmentParticularsApi`, payload
  );
  return response.data.data.responseData;
};
