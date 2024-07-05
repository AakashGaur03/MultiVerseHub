import { createSlice } from "@reduxjs/toolkit";
import { getEntertainmentDataAPIFunc } from "../../Api";

const initialState = {
    state: "idle",
    error: null,
    entertainmentData: null,
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
        getEntertainmentDataFailure(state, action) {
            state.state = "error";
            state.error = action.payload;
            state.entertainmentData = null;
        },
    }
})

export const { getEntertainmentDataStart, getEntertainmentDataSuccess, getEntertainmentDataFailure } = getEntertainmentDataPISlice.actions;

export const getEntertainmentData = () => async (dispatch) => {
    try {
        dispatch(getEntertainmentDataStart());
        const response = await getEntertainmentDataAPIFunc();
        if (response) {
            dispatch(getEntertainmentDataSuccess(response));
            return response;
        }

    } catch (error) {
        dispatch(getEntertainmentDataFailure(error));
    }
}



export default getEntertainmentDataPISlice.reducer
