import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registrationStart(state) {
      state.loading = true;
      state.error = null;
    },
    registrationSuccess(state) {
      state.loading = false;
    },
    registrationFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { registrationStart, registrationSuccess, registrationFailure } =
  authSlice.actions;

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(registrationStart()); // Dispatch start action

    // Make API call to register user
    const response = await axios.post(
      "http://localhost:8000/api/v1/users/register",
      userData
    ); // Adjust URL as per your backend

    dispatch(registrationSuccess()); // Dispatch success action
    console.log("LOGGE INF");
    // Handle any further actions you want to take upon successful registration
  } catch (error) {
    // dispatch(registrationFailure(error.message)); //  // Extract error message from the response
    console.log(error)
    const errorMessage = error.response?.data?.message || "Unknown Error Ocuured While Registering user";
    dispatch(registrationFailure(errorMessage)); // Dispatch failure action with error message
    // You can also handle further error actions here if needed
  }
};

export default authSlice.reducer;
