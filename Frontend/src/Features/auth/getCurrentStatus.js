import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUserStatusApi } from "../../Api";

const initialState = {
  isUserLoggedIn: null,
};

const getCurrentStatusSlice = createSlice({
  name: "getCurrentStatus",
  initialState,
  reducers: {
    setCurrentStatus(state, action) {
      state.isUserLoggedIn = action.payload;
    },
  },
});

export const { setCurrentStatus } = getCurrentStatusSlice.actions;

export const fetchCurrentStatusUser = () => async (dispatch) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const response = await getCurrentUserStatusApi(accessToken);
      if (response) {
        dispatch(setCurrentStatus(true));
      }
    } else {
      dispatch(setCurrentStatus(false));
    }
  } catch (error) {
    console.log("Error fetching current user Status : ", error);
  }
};

export default getCurrentStatusSlice.reducer;
