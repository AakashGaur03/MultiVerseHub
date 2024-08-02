import { createSlice } from "@reduxjs/toolkit";
import { getGamesSectionDataAPIFunc } from "../../Api";

const initialState = {
    status: "idle",
    error: null,
    gamesData: null,
}

const getGamesSectionAPISlice = createSlice({
    name: 'gamesData',
    initialState,
    reducers: {
        getGamesDataStart(state) {
            state.status = "loading";
            state.error = null;
            state.gamesData = null;
        },
        getGamesDataSuccess(state, action) {
            state.status = "fetched";
            state.error = null;
            state.gamesData = action.payload;
        },
        getGamesDataFailure(state, action) {
            state.status = "error";
            state.error = action.payload;
            state.gamesData = null;
        }
    }
})

export const { getGamesDataStart, getGamesDataSuccess, getGamesDataFailure } = getGamesSectionAPISlice.actions;

export const getGamesSectionData = () => async (dispatch) => {
    try {
        dispatch(getGamesDataStart());
        const response = await getGamesSectionDataAPIFunc();
        if (response) {
            dispatch(getGamesDataSuccess(response));
            return response;
        }

    } catch (error) {
        dispatch(getGamesDataFailure(error));
    }
}

export default getGamesSectionAPISlice.reducer;