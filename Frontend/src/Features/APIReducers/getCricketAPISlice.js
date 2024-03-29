import { createSlice } from "@reduxjs/toolkit";
import { getCricketAPIFunc } from "../../Api";
const initialState = {
  status: "idle",
  error: null,
  data:null
};
const getCricketAPISlice = createSlice({
  name: "getCricketAPI",
  initialState,
  reducers: {
    getCricketStart(state) {
      state.status = "loading";
      state.error = null;
      state.data = null;
    },
    getCricketSuccess(state,action) {
      state.status = "News Fetched";
      state.error = null;
      state.data = action.payload;
    },
    getCricketFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
      state.data = null;
    },
  },
});

export const { getCricketStart, getCricketSuccess, getCricketFailure } =
  getCricketAPISlice.actions;

export const getCricket = (query) => async (dispatch) => {
  try {
    dispatch(getCricketStart());
    const response = await getCricketAPIFunc(query);
    if (response) {
      dispatch(getCricketSuccess(response));
      return response;
    }
  } catch (error) {
    dispatch(getCricketFailure(error.message));
  }
};

export default getCricketAPISlice.reducer;
