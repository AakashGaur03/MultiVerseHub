import { createSlice } from "@reduxjs/toolkit";
import { resetPassordApi, sendOTPApi, verifyOTPApi } from "../../Api";

const initialState = {
  status: "idle",
  error: null,
};

const forgotPassowrdSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    sendOTPMailStart(state) {
      state.status = "loading";
      state.error = null;
    },

    sendOTPMailSuccess(state) {
      state.status = "OTPsent";
      state.error = null;
    },

    sendOTPMailFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },

    verifyOTPStart(state) {
      state.status = "loading";
      state.error = null;
    },

    verifyOTPSuccess(state) {
      state.status = "OTPverified";
      state.error = null;
    },

    verifyOTPFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },

    resetPasswordStart(state) {
      state.status = "loading";
      state.error = null;
    },

    resetPasswordSuccess(state) {
      state.status = "idle";
      state.error = null;
    },

    resetPasswordFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  sendOTPMailStart,
  sendOTPMailSuccess,
  sendOTPMailFailure,
  verifyOTPStart,
  verifyOTPSuccess,
  verifyOTPFailure,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
} = forgotPassowrdSlice.actions;

export const sendOTPMail = (email) => async (dispatch) => {
  try {
    dispatch(sendOTPMailStart());
    const response = await sendOTPApi(email);
    if (response) {
    //   console.log(response);
      dispatch(sendOTPMailSuccess(response.data));
      return response
    }
  } catch (error) {
    dispatch(sendOTPMailFailure(error.message));
  }
};

export const verifyOTP = (otp) => async (dispatch) => {
  try {
    dispatch(verifyOTPStart());
    const response = await verifyOTPApi(otp);
    if (response) {
      console.log(response);
      dispatch(verifyOTPSuccess());
      return response
    }
  } catch (error) {
    dispatch(verifyOTPFailure(error.message));
  }
};

export const createNewPassword = (data) => async (dispatch) => {
  try {
    dispatch(resetPasswordStart());
    const response = await resetPassordApi(data);
    if (response) {
      console.log(response);
      dispatch(resetPasswordSuccess());
      return response
    }
  } catch (error) {
    dispatch(resetPasswordFailure(error.message));
  }
};

export default forgotPassowrdSlice.reducer;
