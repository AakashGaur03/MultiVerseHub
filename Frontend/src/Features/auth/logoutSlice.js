import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  logoutMessage: null,
};

const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    logoutStart(state) {
      state.loading = true;
      state.logoutMessage = null;
    },
    logoutSuccess(state, action) {
      state.loading = false;
      state.logoutMessage = action.payload;
    },
    logoutFailure(state, action) {
      state.loading = false;
      state.logoutMessage = action.payload;
    },
  },
});

export const { logoutStart, logoutSuccess, logoutFailure } =
  logoutSlice.actions;

export const logoutUser = (accessToken) => async (dispatch) => {
  try {
    dispatch(logoutStart());
    const response = await axios.post(
      "http://localhost:8000/api/v1/users/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(response);

    let dispatchMessage = "";
    dispatchMessage =
      response?.data?.message || "User Logged Out SuccessFully ";

    dispatch(logoutSuccess(dispatchMessage));
  } catch (error) {
    console.log(error);
    let dispatchMessage = "";
    dispatchMessage =
      error.response?.data?.message ||
      "Unknown Error Ocuured While logging Out user";
    dispatch(logoutFailure(dispatchMessage));
  }
};

export default logoutSlice.reducer;
