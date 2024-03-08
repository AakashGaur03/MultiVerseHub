import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  message: null,
};

const registerSlice = createSlice({
  name: "register",
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

export const { registrationStart, registrationSuccess, registrationFailure } =
  registerSlice.actions;

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(registrationStart()); // Dispatch start action

    console.log(userData,"dd")

    // Make API call to register user
    const response = await axios.post(
      "http://localhost:8000/api/v1/users/register",
      userData
    ); // Adjust URL as per your backend
    console.log(userData)
    console.log(response)
    let dispatchMessage = "";
    dispatchMessage =
    response?.data?.message || "User Registered SuccessFully ";
    dispatch(registrationSuccess(dispatchMessage));

  } catch (error) {
    // dispatch(registrationFailure(message.message)); //  // Extract message message from the response
    console.log(error);
    let dispatchMessage = "";
    dispatchMessage =
      error.response?.data?.message ||
      "Unknown Error Ocuured While Registering user";
    dispatch(registrationFailure(dispatchMessage)); // Dispatch failure action with message message
    // You can also handle further message actions here if needed
  }
};

export default registerSlice.reducer;
