import { createSlice } from "@reduxjs/toolkit";
import { getEntertainmentDataAPIFunc, getEntertainmentParticularsDataAPIFunc, getEntertainmentTypeWiseAPIFunc } from "../../Api";

const initialState = {
    state: "idle",
    error: null,
    entertainmentData: null,
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
        getEntertainmentDataParticluarSuccess(state, action) {
            state.state = "success";
            state.error = null;
            state.entertainmentParticularData = action.payload;
        },
        getEntertainmentTypeWiseDataSuccess(state, action) {
            state.state = "success";
            state.error = null;
            state.entertainmentDataType = action.payload;
        },
        getEntertainmentDataFailure(state, action) {
            state.state = "error";
            state.error = action.payload;
            state.entertainmentData = null;
        },
    }
})

export const { getEntertainmentDataStart, getEntertainmentDataSuccess,getEntertainmentDataParticluarSuccess,getEntertainmentTypeWiseDataSuccess, getEntertainmentDataFailure } = getEntertainmentDataPISlice.actions;

export const getEntertainmentData = (payload) => async (dispatch) => {
    try {
        dispatch(getEntertainmentDataStart());
        const response = await getEntertainmentDataAPIFunc(payload);
        if (response) {
            dispatch(getEntertainmentDataSuccess(response));
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
export const getEntertainmentTypeWiseData = (payload) => async (dispatch) => {
    try {
        dispatch(getEntertainmentDataStart());
        const response = await getEntertainmentTypeWiseAPIFunc(payload);
        if (response) {
            dispatch(getEntertainmentTypeWiseDataSuccess(response));
            return response;
        }

    } catch (error) {
        dispatch(getEntertainmentDataFailure(error));
    }
}



export default getEntertainmentDataPISlice.reducer
