import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUserStatusApi } from "../../Api";

const storedVal = localStorage.getItem("isUserLoggedIn") === "true" ? true : false;
const initialState = {
  isUserLoggedIn: storedVal || null,
  state: null,
};

const getCurrentStatusSlice = createSlice({
  name: "getCurrentStatus",
  initialState,
  reducers: {
    setCurrentStatus(state, action) {
      state.isUserLoggedIn = action.payload;
      state.state = null;
      localStorage.setItem("isUserLoggedIn", action.payload);
    },
    setCurrentStatusState(state, action) {
      state.state = "loading";
    },
  },
});

export const { setCurrentStatus, setCurrentStatusState } = getCurrentStatusSlice.actions;

export const fetchCurrentStatusUser = () => async (dispatch) => {
  try {
    dispatch(setCurrentStatusState());
    const accessToken = localStorage.getItem("accessToken");
    // if (accessToken) {
    const response = await getCurrentUserStatusApi(accessToken);
    if (response) {
      dispatch(setCurrentStatus(true));
      // }
    } else {
      dispatch(setCurrentStatus(false));
    }
  } catch (error) {
    dispatch(setCurrentStatus(false));
    console.log("Error fetching current user Status : ", error);
  }
};

export default getCurrentStatusSlice.reducer;
