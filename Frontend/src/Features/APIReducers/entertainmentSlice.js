import { createSlice } from "@reduxjs/toolkit";
import { getEntertainmentDataMovieAPIFunc, getEntertainmentDataTVAPIFunc, getEntertainmentParticularsDataAPIFunc } from "../../Api";

const initialState = {
    state: "idle",
    error: null,
    entertainmentData: null,
    entertainmentDataTV: null,
    entertainmentParticularData: null,
    entertainmentDataType: null,
}

const getEntertainmentDataPISlice = createSlice({
    name: "getEntertainmentData",
    initialState,
    reducers: {
        getEntertainmentDataStart(state) {
            state.state = "loading";
            state.error = null;
            state.entertainmentData = null;
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
        getEntertainmentDataParticluarSuccess(state, action) {
            state.state = "success";
            state.error = null;
            state.entertainmentParticularData = action.payload;
        },
        getEntertainmentDataFailure(state, action) {
            state.state = "error";
            state.error = action.payload.message;
            state.entertainmentData = null;
        },
    }
})

export const { getEntertainmentDataStart, getEntertainmentDataSuccess,getEntertainmentDataTVSuccess,getEntertainmentDataParticluarSuccess, getEntertainmentDataFailure } = getEntertainmentDataPISlice.actions;

export const getEntertainmentDataMovie = (payload) => async (dispatch) => {
    try {
        dispatch(getEntertainmentDataStart());
        const response = await getEntertainmentDataMovieAPIFunc(payload);
        if (response) {
            dispatch(getEntertainmentDataSuccess(response));
            return response;
        }

    } catch (error) {
        dispatch(getEntertainmentDataFailure(error));
    }
}
export const getEntertainmentDataTV = (payload) => async (dispatch) => {
    try {
        dispatch(getEntertainmentDataStart());
        const response = await getEntertainmentDataTVAPIFunc(payload);
        if (response) {
            dispatch(getEntertainmentDataTVSuccess(response));
            return response;
        }

    } catch (error) {
        dispatch(getEntertainmentDataFailure(error));
    }
}
export const getEntertainmentParticularsData = (payload) => async (dispatch) => {
    try {
        dispatch(getEntertainmentDataStart());
        const response = await getEntertainmentParticularsDataAPIFunc(payload);
        if (response) {
            dispatch(getEntertainmentDataParticluarSuccess(response));
            return response;
        }

    } catch (error) {
        dispatch(getEntertainmentDataFailure(error));
    }
}




export default getEntertainmentDataPISlice.reducer
