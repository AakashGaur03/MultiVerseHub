import { createSlice } from "@reduxjs/toolkit";
import { getWeatherAPIFunc } from "../../Api";

const initialState = {
  weatherStatus: "idle",
  error: null,
  data: null,
};

const getWeatherAPISlice = createSlice({
  name: "getWeatherAPI",
  initialState,
  reducers: {
    getWeatherStart(state) {
      state.weatherStatus = "loading";
      state.error = null;
      state.data = {};
    },
    getWeatherSuccess(state, action) {
      state.weatherStatus = "Fetched";
      state.error = null;
      state.data = action.payload;
    },
    getWeatherFailure(state, action) {
      state.weatherStatus = "Failed";
      state.error = "Error";
      state.data = {};
    },
  },
});

export const { getWeatherStart, getWeatherSuccess, getWeatherFailure } =
  getWeatherAPISlice.actions;

export const getWeather = (query) => async (dispatch) => {
  try {
    dispatch(getWeatherStart());
    const response = await getWeatherAPIFunc(query);
    if (response) {
        dispatch(getWeatherSuccess(response));
      return response;
    }
  } catch (error) {
    dispatch(getWeatherFailure(error.message));
  }
};

export default getWeatherAPISlice.reducer;
