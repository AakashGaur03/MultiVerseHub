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

export const getCricketAPIFunc = async (query) => {
  if (query === "") query = "recent";
  const options = {
    method: "GET",
    url: `https://cricbuzz-cricket.p.rapidapi.com/matches/v1/${query}`,
    headers: {
      "X-RapidAPI-Key": "bb3721361emshddcfed580ee75dap16315bjsn1b92129b04d2",
      "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
    },
  };
  try {
    const response = await axios.request(options);
    return response.data
  } catch (error) {
    console.log(error);
  }
};
