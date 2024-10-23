import { createSlice } from "@reduxjs/toolkit";
import { addFavAPIFunc, getFavAPIFunc, removeFavAPIFunc } from "../../Api";

const initialState = {
  loader: false,
  error: null,
  data: null,
};

const favSectionAPISlice = createSlice({
  name: "favSection",
  initialState,
  reducers: {
    favSectionStart(state) {
      state.loader = true;
      state.error = null;
      state.data = {};
    },
    favSectionSuccess(state, action) {
      state.loader = false;
      state.error = null;
      state.data = action.payload;
    },
    favSectionFailure(state) {
      state.loader = false;
      state.error = "Error";
      state.data = {};
    },
  },
});

export const { favSectionStart, favSectionSuccess, favSectionFailure } = favSectionAPISlice.actions;

export const addFavSection = (payload, accessToken) => async (dispatch) => {
  try {
    dispatch(favSectionStart());
    if (!accessToken) {
      accessToken = localStorage.getItem("accessToken");
    }
    const response = await addFavAPIFunc(payload, accessToken);
    if (response) {
      dispatch(favSectionSuccess(response));
      return response;
    }
  } catch (error) {
    dispatch(favSectionFailure(error.message));
  }
};

// Action to get favorite items
export const getFavSection = (accessToken) => async (dispatch) => {
  try {
    dispatch(favSectionStart());
    if (!accessToken) {
      accessToken = localStorage.getItem("accessToken");
    }
    const response = await getFavAPIFunc(accessToken);
    if (response) {
      dispatch(favSectionSuccess(response));
      return response;
    }
  } catch (error) {
    dispatch(favSectionFailure(error.message));
  }
};

// Action to remove a favorite item
export const removeFavSection = (payload, accessToken) => async (dispatch) => {
  try {
    dispatch(favSectionStart());
    if (!accessToken) {
      accessToken = localStorage.getItem("accessToken");
    }
    const response = await removeFavAPIFunc(payload, accessToken);
    if (response) {
      dispatch(favSectionSuccess(response));
      return response;
    }
  } catch (error) {
    dispatch(favSectionFailure(error.message));
  }
};

export default favSectionAPISlice.reducer;
