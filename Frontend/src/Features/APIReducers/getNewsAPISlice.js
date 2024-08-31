import { createSlice } from "@reduxjs/toolkit";
import { getNewsAPIFunc } from "../../Api";
const initialState = {
  status: "idle",
  error: null,
  data: null,
  financeStatus: "idle",
  financeError: null,
  financeData: null,
};
const getNewsAPISlice = createSlice({
  name: "getNewsAPI",
  initialState,
  reducers: {
    getNewsStart(state) {
      state.status = "loading";
      state.error = null;
      state.data = null;
    },
    getNewsSuccess(state, action) {
      state.status = "News Fetched";
      state.error = null;
      state.data = action.payload;
    },
    getNewsFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
      state.data = null;
    },
    getFinanceNewsStart(state) {
      state.financeStatus = "loading";
      state.financeError = null;
      state.financeData = null;
    },
    getFinanceNewsSuccess(state, action) {
      state.financeStatus = "News Fetched";
      state.financeError = null;
      state.financeData = action.payload;
    },
    getFinanceNewsFailure(state, action) {
      state.financeStatus = "failed";
      state.financeError = action.payload;
      state.financeData = null;
    },
  },
});

export const {
  getNewsStart,
  getNewsSuccess,
  getNewsFailure,
  getFinanceNewsStart,
  getFinanceNewsSuccess,
  getFinanceNewsFailure,
} = getNewsAPISlice.actions;

export const getNews = (query) => async (dispatch) => {
  try {
    dispatch(getNewsStart());
    const response = await getNewsAPIFunc(query);
    if (response) {
      const { data, status } = response;
      const serializedResponse = { data, status };
      dispatch(getNewsSuccess(serializedResponse));
      return serializedResponse;
    }
  } catch (error) {
    dispatch(getNewsFailure(error.message));
  }
};
export const getFinanceNews = (query) => async (dispatch) => {
  try {
    dispatch(getFinanceNewsStart());
    query = "finance";
    const response = await getNewsAPIFunc(query);
    if (response) {
      const { data, status } = response;
      const serializedResponse = { data, status };
      dispatch(getFinanceNewsSuccess(serializedResponse));
      return serializedResponse;
    }
  } catch (error) {
    dispatch(getFinanceNewsFailure(error.message));
  }
};

export default getNewsAPISlice.reducer;
