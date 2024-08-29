import { createSlice } from "@reduxjs/toolkit";
import {
  entertainmentSearchAPIFUNC,
  getEntertainmentDataMovieAPIFunc,
  getEntertainmentDataTVAPIFunc,
  getEntertainmentParticularsDataAPIFunc,
} from "../../Api";

const initialState = {
  state: "idle",
  searchState: "idle",
  searchStateParticular: "idle",
  error: null,
  entertainmentData: null,
  entertainmentDataTV: null,
  entertainmentParticularData: null,
  entertainmenSearchData: null,
};

const getEntertainmentDataPISlice = createSlice({
  name: "getEntertainmentData",
  initialState,
  reducers: {
    getEntertainmentDataStart(state) {
      state.state = "loading";
      state.error = null;
      state.entertainmentData = null;
      state.entertainmentDataTV = null;
    },
    getEntertainmentDataStartLoadMore(state) {
      state.state = "loading";
      state.error = null;
    },
    getEntertainmentDataearchStart(state) {
      state.searchState = "loading";
      state.error = null;
      // state.entertainmentData = null;
      // state.entertainmentDataTV = null;
    },
    getEntertainmentDataSuccess(state, action) {
      state.state = "success";
      state.error = null;
      state.entertainmentData = action.payload;
    },
    getEntertainmentDataTVSuccess(state, action) {
      state.state = "success";
      state.error = null;
      state.entertainmentDataTV = action.payload;
    },
    getEntertainmentDataSearchSuccessTV(state, action) {
      state.searchState = "success";
      state.error = null;
      state.entertainmenSearchData = action.payload;
      state.entertainmentDataTV = {
        ...state.entertainmentDataTV,
        search_result: action.payload,
      };
    },
    getEntertainmentDataSearchSuccessMovie(state, action) {
      state.searchState = "success";
      state.error = null;
      console.log(action);
      console.log(state);
      state.entertainmentData = {
        ...state.entertainmentData,
        search_result: action.payload,
      };
      state.entertainmenSearchData = action.payload;
    },
    getEntertainmentParticularDataStart(state, action) {
      state.state = "success";
      state.error = null;
      state.entertainmentParticularData = null;
      state.searchStateParticular = "loading";
    },
    getEntertainmentDataParticluarSuccess(state, action) {
      state.state = "success";
      state.error = null;
      state.entertainmentParticularData = action.payload;
      state.searchStateParticular = null;
    },
    getEntertainmentParticularDataFailure(state, action) {
      state.state = "error";
      state.error = action.payload.message;
      state.entertainmentParticularData = null;
      state.searchStateParticular = null;
    },
    getEntertainmentDataFailure(state, action) {
      state.state = "error";
      state.error = action.payload.message;
      state.entertainmentData = null;
    },
    updateEntertainmentDataToRemoveSearchResult(state) {
      state.searchState = "success";
      state.entertainmentData = {
        ...state.entertainmentData,
        search_result: undefined,
      };
      state.entertainmentDataTV = {
        ...state.entertainmentDataTV,
        search_result: undefined,
      };
    },
  },
});

export const {
  getEntertainmentDataStart,
  getEntertainmentDataSuccess,
  getEntertainmentDataearchStart,
  getEntertainmentDataTVSuccess,
  getEntertainmentDataParticluarSuccess,
  getEntertainmentDataSearchSuccessTV,
  getEntertainmentDataSearchSuccessMovie,
  updateEntertainmentDataToRemoveSearchResult,
  getEntertainmentDataFailure,
  getEntertainmentParticularDataStart,
  getEntertainmentParticularDataFailure,
  getEntertainmentDataStartLoadMore,
} = getEntertainmentDataPISlice.actions;

export const getEntertainmentDataMovie = (payload) => async (dispatch) => {
  try {
    if (payload.loadMore) {
      dispatch(getEntertainmentDataStartLoadMore());
    } else {
      dispatch(getEntertainmentDataStart());
    }
    const response = await getEntertainmentDataMovieAPIFunc(payload);
    if (response) {
      dispatch(getEntertainmentDataSuccess(response));
      return response;
    }
  } catch (error) {
    dispatch(getEntertainmentDataFailure(error));
  }
};
export const getEntertainmentDataTV = (payload) => async (dispatch) => {
  try {
    if (payload.loadMore) {
      dispatch(getEntertainmentDataStartLoadMore());
    } else {
      dispatch(getEntertainmentDataStart());
    }
    const response = await getEntertainmentDataTVAPIFunc(payload);
    if (response) {
      dispatch(getEntertainmentDataTVSuccess(response));
      return response;
    }
  } catch (error) {
    dispatch(getEntertainmentDataFailure(error));
  }
};
export const getEntertainmentParticularsData =
  (payload) => async (dispatch) => {
    try {
      dispatch(getEntertainmentParticularDataStart());
      const response = await getEntertainmentParticularsDataAPIFunc(payload);
      if (response) {
        dispatch(getEntertainmentDataParticluarSuccess(response));
        return response;
      }
    } catch (error) {
      dispatch(getEntertainmentParticularDataFailure(error));
    }
  };
export const getEntertainmentSearchData =
  (payload) => async (dispatch, getState) => {
    try {
      dispatch(getEntertainmentDataearchStart());
      const response = await entertainmentSearchAPIFUNC(payload);
      if (response) {
        if (payload.searchQuery !== "") {
          if (payload.category === "tv") {
            dispatch(getEntertainmentDataSearchSuccessTV(response));
          } else {
            dispatch(getEntertainmentDataSearchSuccessMovie(response));
          }
        } else {
          dispatch(updateEntertainmentDataToRemoveSearchResult(response));
        }
        return response;
      }
    } catch (error) {
      dispatch(getEntertainmentDataFailure(error));
    }
  };

export default getEntertainmentDataPISlice.reducer;
