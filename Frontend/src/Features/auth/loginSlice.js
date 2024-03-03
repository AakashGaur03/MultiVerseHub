import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  message: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.message = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = loginSlice.actions;

export const loginUser = (data) => async (dispatch) => {
  try {
    dispatch(loginStart());

    const response = await axios.post(
      "http://localhost:8000/api/v1/users/login",
      data
    );

    console.log(response);

    let dispatchMessage = "";
    dispatchMessage = response?.data?.message || "User Logged In SuccessFully ";

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
