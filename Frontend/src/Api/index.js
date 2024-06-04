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
export const getCricketRankingAPIFunc = async (format,isWomen) => {
  let url = `http://localhost:8000/api/v1/users/cricketRankings/${format}`;
  if (isWomen !== undefined && isWomen !== '') {
    url += `/${isWomen}`;
  }
  const response = await axios.get(url);
  return response.data.data.responseData;
};
export const getCricketImageAPIFunc = async (query) => {
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
