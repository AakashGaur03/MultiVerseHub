import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  message: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registrationStart(state) {
      state.loading = true;
      state.message = null;
    },
    registrationSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    registrationFailure(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
  },
});

export const { registrationStart, registrationSuccess, registrationFailure } = authSlice.actions;

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(registrationStart()); // Dispatch start action

    // Make API call to register user
    const response = await axios.post("http://localhost:8000/api/v1/users/register", userData); // Adjust URL as per your backend
    // console.log(response)
    let dispatchMessage = "";
    dispatchMessage = response?.data?.message || "User Registered SuccessFully2 ";
    dispatch(registrationSuccess(dispatchMessage));

    // console.log("LOGGE INF");
    // Handle any further actions you want to take upon successful registration
  } catch (error) {
    // dispatch(registrationFailure(message.message)); //  // Extract message message from the response
    console.log(error);
    let dispatchMessage = "";
    dispatchMessage = error.response?.data?.message || "Unknown message Ocuured While Registering user";
    dispatch(registrationFailure(dispatchMessage)); // Dispatch failure action with message message
    // You can also handle further message actions here if needed
  }
};

export default authSlice.reducer;
