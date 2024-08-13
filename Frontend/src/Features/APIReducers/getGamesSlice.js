import { createSlice } from "@reduxjs/toolkit";
// import { getGamesSectionDataAPIFunc, getGamesSectionDataCategoryWiseAPIFunc } from "../../Api";
import { getGamesSectionDataCategoryWiseAPIFunc, getGameparticularsAPIFunc } from "../../Api";

const initialState = {
    status: "idle",
    error: null,
    gamesData: null,
    gamesDataCategoryWise: null,
    gamesDataParticular: null,
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
        // getGamesDataAllSuccess(state, action) {
        //     state.status = "fetched";
        //     state.error = null;
        //     state.gamesData = action.payload;
        // },
        getGamesDataCategoryWiseSuccess(state, action) {
            state.status = "fetched";
            state.error = null;
            state.gamesDataCategoryWise = action.payload;
        },
        getGameParticularDataSuccess(state, action) {
            state.status = "fetched";
            state.error = null;
            state.gamesDataParticular = action.payload;
        },
        getGamesDataFailure(state, action) {
            state.status = "error";
            state.error = action.payload;
            state.gamesData = null;
        }
    }
})

export const { getGamesDataStart, getGamesDataCategoryWiseSuccess, getGamesDataFailure, getGameParticularDataSuccess } = getGamesSectionAPISlice.actions;
export const getGamesSectionDataCategoryWise = (payload) => async (dispatch) => {
    try {
        dispatch(getGamesDataStart());
        const response = await getGamesSectionDataCategoryWiseAPIFunc(payload);
        if (response) {
            dispatch(getGamesDataCategoryWiseSuccess(response));
            return response;
        }

    } catch (error) {
        dispatch(getGamesDataFailure(error));
    }
}
export const getGamesParticularsData = (gameId) => async (dispatch) => {
    try {
        dispatch(getGamesDataStart());
        const response = await getGameparticularsAPIFunc(gameId);
        if (response) {
            dispatch(getGameParticularDataSuccess(response));
            return response;
        }

    } catch (error) {
        dispatch(getGamesDataFailure(error));
    }
}

export default getGamesSectionAPISlice.reducer;