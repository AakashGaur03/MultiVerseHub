import { createSlice } from "@reduxjs/toolkit";
import { resetPassordApi, sendOTPApi, verifyOTPApi } from "../../Api";

const initialState = {
  status: "idle",
  error: null,
  message: null,
};

const forgotPassowrdSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    sendOTPMailStart(state) {
      state.status = "loading";
      state.error = null;
      state.message = null;
    },

    sendOTPMailSuccess(state, action) {
      state.status = "OTPsent";
      state.error = false;
      state.message = action.payload;
    },

    sendOTPMailFailure(state, action) {
      state.status = "failed";
      state.error = true;
      state.message = action.payload;
    },

    verifyOTPStart(state) {
      state.status = "loading";
      state.error = null;
      state.message = null;
    },

    verifyOTPSuccess(state, action) {
      state.status = "OTPverified";
      state.error = false;
      state.message = action.payload;
    },

    verifyOTPFailure(state, action) {
      state.status = "failed";
      state.error = true;
      state.message = action.payload;
    },

    resetPasswordStart(state) {
      state.status = "loading";
      state.error = null;
      state.message = null;
    },

    resetPasswordSuccess(state, action) {
      state.status = "idle";
      state.error = false;
      state.message = action.payload;
    },

    resetPasswordFailure(state, action) {
      state.status = "failed";
      state.error = true;
      state.message = action.payload;
    },
    updateErrorAndMessage(state, action) {
      state.error = action.payload.error;
      state.message = action.payload.message;
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
  updateErrorAndMessage,
} = forgotPassowrdSlice.actions;

export const sendOTPMail = (email) => async (dispatch) => {
  try {
    dispatch(sendOTPMailStart());
    const response = await sendOTPApi(email);
    if (response) {
      // console.log(response.data);
      dispatch(sendOTPMailSuccess(response.data.message));
      return response;
    }
  } catch (error) {
    console.log(error);
    let dispatchMessage = "";
    dispatchMessage = error.response?.data?.message || "Unknown Error Ocuured While Sending OTP";
    dispatch(sendOTPMailFailure(dispatchMessage));
  }
};

export const verifyOTP = (otp) => async (dispatch) => {
  try {
    dispatch(verifyOTPStart());
    const response = await verifyOTPApi(otp);
    if (response) {
      // console.log(response);
      dispatch(verifyOTPSuccess(response.data.message));
      return response;
    }
  } catch (error) {
    // dispatch(verifyOTPFailure(error.message));
    let dispatchMessage = "";
    dispatchMessage = error.response?.data?.message || "Unknown Error Ocuured While Verifying OTP";
    dispatch(sendOTPMailFailure(dispatchMessage));
  }
};

export const createNewPassword = (data) => async (dispatch) => {
  try {
    dispatch(resetPasswordStart());
    const response = await resetPassordApi(data);
    console.log(response, "dfdf11");
    if (response) {
      console.log(response, "dfdf");
      dispatch(resetPasswordSuccess(response.data.message));
      return response;
    }
  } catch (error) {
    // dispatch(resetPasswordFailure(error.message));
    let dispatchMessage = "";
    dispatchMessage = error.response?.data?.message || "Unknown Error Ocuured While Reseting Password";
    dispatch(resetPasswordFailure(dispatchMessage));
  }
};

export default forgotPassowrdSlice.reducer;
