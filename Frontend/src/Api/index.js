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
