import { createSlice } from "@reduxjs/toolkit";
import { addFavAPIFunc, getFavAPIFunc, removeFavAPIFunc } from "../../Api";

const initialState = {
  loader: false,
  error: null,
  allItem: null,
  addItem: null,
  removeItem: null,
};

const favSectionAPISlice = createSlice({
  name: "favSection",
  initialState,
  reducers: {
    addFavSectionStart(state) {
      state.loader = true;
      state.error = null;
      state.addItem = {};
    },
    addFavSectionSuccess(state, action) {
      state.loader = false;
      state.error = null;
      state.addItem = action.payload;
    },
    addFavSectionFailure(state) {
      state.loader = false;
      state.error = "Error";
      state.addItem = {};
    },
    getFavSectionStart(state) {
      state.loader = true;
      state.error = null;
      state.allItem = {};
    },
    getFavSectionSuccess(state, action) {
      state.loader = false;
      state.error = null;
      state.allItem = action.payload;
    },
    getFavSectionFailure(state) {
      state.loader = false;
      state.error = "Error";
      state.allItem = {};
    },
    removeFavSectionStart(state) {
      state.loader = true;
      state.error = null;
      state.removeItem = {};
    },
    removeFavSectionSuccess(state, action) {
      state.loader = false;
      state.error = null;
      console.log(action.payload, "action.payload");
      state.removeItem = action.payload;
    },
    removeFavSectionFailure(state) {
      state.loader = false;
      state.error = "Error";
      state.removeItem = {};
    },
  },
});

export const {
  addFavSectionStart,
  addFavSectionSuccess,
  addFavSectionFailure,
  getFavSectionStart,
  getFavSectionSuccess,
  getFavSectionFailure,
  removeFavSectionStart,
  removeFavSectionSuccess,
  removeFavSectionFailure,
} = favSectionAPISlice.actions;

export const addFavSection = (payload, accessToken) => async (dispatch) => {
  try {
    dispatch(addFavSectionStart());
    if (!accessToken) {
      accessToken = localStorage.getItem("accessToken");
    }
    const response = await addFavAPIFunc(payload, accessToken);
    if (response) {
      dispatch(addFavSectionSuccess(response));
      return response;
    }
  } catch (error) {
    dispatch(addFavSectionFailure(error.message));
  }
};

// Action to get favorite items
export const getFavSection = (accessToken) => async (dispatch) => {
  try {
    dispatch(getFavSectionStart());
    if (!accessToken) {
      accessToken = localStorage.getItem("accessToken");
    }
    const response = await getFavAPIFunc(accessToken);
    if (response) {
      dispatch(getFavSectionSuccess(response));
      return response;
    }
  } catch (error) {
    dispatch(getFavSectionFailure(error.message));
  }
};

// Action to remove a favorite item
export const removeFavSection = (payload, accessToken) => async (dispatch) => {
  try {
    dispatch(removeFavSectionStart());
    if (!accessToken) {
      accessToken = localStorage.getItem("accessToken");
    }
    const response = await removeFavAPIFunc(payload, accessToken);
    if (response) {
      dispatch(removeFavSectionSuccess(response));
      return response;
    }
  } catch (error) {
    dispatch(removeFavSectionFailure(error.message));
  }
};

export default favSectionAPISlice.reducer;
