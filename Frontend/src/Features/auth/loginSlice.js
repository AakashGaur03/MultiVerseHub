import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setCurrentStatus } from "./getCurrentStatus";

const initialState = {
  loading: false,
  message: null,
  currentState: "logout",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.message = null;
      state.currentState = "logout";
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.currentState = "login";
    },
    loginFailure(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.currentState = "logout";
    },
    storeAccessToken(state, action) {
      state.accessToken = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure,storeAccessToken } = loginSlice.actions;

export const loginUser = (data) => async (dispatch) => {
  try {
    dispatch(loginStart());

    const response = await axios.post(
      "http://localhost:8000/api/v1/users/login",
      data
    );
    const accessToken = response?.data?.data?.accessToken;
    localStorage.setItem("accessToken",accessToken)
    document.cookie = `accessToken=${accessToken}; path=/; domain=localhost`;

    dispatch(storeAccessToken(accessToken));

    let dispatchMessage = "";
    dispatchMessage = response?.data?.data?.message || "User Logged In SuccessFully ";
    dispatch(setCurrentStatus(true));

    dispatch(loginSuccess(dispatchMessage));
  } catch (error) {
    console.log(error);
    let dispatchMessage = "";
    dispatchMessage =
      error.response?.data?.message ||
      "Unknown Error Ocuured While logging In user";
    dispatch(loginFailure(dispatchMessage));
  }
};

export default loginSlice.reducer;
