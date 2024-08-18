import { createSlice } from "@reduxjs/toolkit";
import { getCricketAPIFunc, getCricketPointsTableAPIFunc, getCricketImageCBAPIFunc, getCricketRankingAPIFunc, getUploadImageCloudinaryFunc, getImageDBFunc, getCricketNewsCBAPIFunc, getCricketSearchPlayerAPIFunc, getCricketPlayerInfoAPIFunc } from "../../Api";
const initialState = {
  status: "idle",
  error: null,
  data: null,
  matchData: null,
  newsData: null,
  rankingData: null,
  searchPlayer: null,
  playerInfo: null,
};
const getCricketAPISlice = createSlice({
  name: "getCricketAPI",
  initialState,
  reducers: {
    getCricketStart(state) {
      state.status = "loading";
      state.error = null;
      state.data = null;
      // state.searchPlayer = null;
    },
    getCricketSuccess(state, action) {
      state.status = "News Fetched";
      state.error = null;
      state.data = action.payload;
    },
    getCricketMatchSuccess(state, action) {
      state.status = "News Fetched";
      state.error = null;
      state.matchData = action.payload;
    },
    getCricketNewsSuccess(state, action) {
      state.status = "News Fetched";
      state.error = null;
      state.newsData = action.payload;
    },
    getCricketFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
      state.data = null;
    },
    getCricketSearchPlayerSuccess(state, action) {
      state.status = "Player Info Fetched";
      state.error = null;
      state.searchPlayer = action.payload;
    },
    getCricketRankingDataSuccess(state, action) {
      state.status = "Ranking Data Fetched";
      state.error = null;
      state.rankingData = action.payload;
    },
    getCricketPlayerInfoSuccess(state, action) {
      state.status = "Player Info Fetched";
      state.error = null;
      state.playerInfo = action.payload;
    },
  },
});

export const { getCricketStart, getCricketSuccess, getCricketFailure, getCricketSearchPlayerSuccess, getCricketPlayerInfoSuccess, getCricketRankingDataSuccess, getCricketMatchSuccess, getCricketNewsSuccess } =
  getCricketAPISlice.actions;

export const getCricket = (query) => async (dispatch) => {
  try {
    dispatch(getCricketStart());
    const response = await getCricketAPIFunc(query);
    if (response) {
      dispatch(getCricketMatchSuccess(response));
      return response;
    }
  } catch (error) {
    dispatch(getCricketFailure(error.message));
  }
};
export const getCricketPointsTable = (query) => async (dispatch) => {
  try {
    dispatch(getCricketStart());
    const response = await getCricketPointsTableAPIFunc(query);
    if (response) {
      dispatch(getCricketSuccess(response));
      return response;
    }
  } catch (error) {
    dispatch(getCricketFailure(error.message));
  }
};
export const getCricketImageCBs = (query) => async (dispatch) => {
  try {
    dispatch(getCricketStart());
    const response = await getCricketImageCBAPIFunc(query);
    if (response) {
      dispatch(getCricketSuccess(response));
      return response;
    }
  } catch (error) {
    dispatch(getCricketFailure(error.message));
  }
};
export const getCricketNewsCBs = () => async (dispatch) => {
  try {
    dispatch(getCricketStart());
    const response = await getCricketNewsCBAPIFunc();
    if (response) {
      dispatch(getCricketNewsSuccess(response));
      return response;
    }
  } catch (error) {
    dispatch(getCricketFailure(error.message));
  }
};
export const getCricketRanking = (payload) => async (dispatch) => {
  try {
    dispatch(getCricketStart());
    const response = await getCricketRankingAPIFunc(payload);
    if (response) {
      dispatch(getCricketRankingDataSuccess(response));
      return response;
    }
  } catch (error) {
    dispatch(getCricketFailure(error.message));
  }
};
export const getUploadImageCloudinary = (imageUrl, faceImageID) => async (dispatch) => {
  try {
    console.log("Dispatching upload image to Cloudinary action");
    dispatch(getCricketStart());
    const response = await getUploadImageCloudinaryFunc(imageUrl, faceImageID);
    if (response) {
      dispatch(getCricketSuccess(response));
      return response;
    }
  } catch (error) {
    dispatch(getCricketFailure(error.message));
  }
};
export const getCricketImageDB = (faceImageID) => async (dispatch) => {
  try {
    console.log("Dispatching get image from DB");
    dispatch(getCricketStart());
    const response = await getImageDBFunc(faceImageID);
    if (response) {
      dispatch(getCricketSuccess(response));
      return response;
    }
  } catch (error) {
    dispatch(getCricketFailure(error.message));
  }
};
export const getcricketSearchPlayer = (payload) => async (dispatch) => {
  try {
    dispatch(getCricketStart());
    const response = await getCricketSearchPlayerAPIFunc(payload);
    if (response) {
      dispatch(getCricketSearchPlayerSuccess(response));
      return response;
    }

  } catch (error) {
    dispatch(getCricketFailure(error));
  }
}
export const getcricketPlayerInfo = (payload) => async (dispatch) => {
  try {
    dispatch(getCricketStart());
    const response = await getCricketPlayerInfoAPIFunc(payload);
    if (response) {
      dispatch(getCricketPlayerInfoSuccess(response));
      return response;
    }

  } catch (error) {
    dispatch(getCricketFailure(error));
  }
}

export default getCricketAPISlice.reducer;


// Need to Update want to make store for all independent data values
// Need to work on state management 