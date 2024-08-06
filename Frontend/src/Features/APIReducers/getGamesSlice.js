import { createSlice } from "@reduxjs/toolkit";
// import { getGamesSectionDataAPIFunc, getGamesSectionDataCategoryWiseAPIFunc } from "../../Api";
import { getGamesSectionDataCategoryWiseAPIFunc } from "../../Api";

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
        getGamesDataFailure(state, action) {
            state.status = "error";
            state.error = action.payload;
            state.gamesData = null;
        }
    }
})

export const { getGamesDataStart, getGamesDataCategoryWiseSuccess, getGamesDataFailure } = getGamesSectionAPISlice.actions;
// export const { getGamesDataStart, getGamesDataAllSuccess,getGamesDataCategoryWiseSuccess, getGamesDataFailure } = getGamesSectionAPISlice.actions;

// export const getGamesSectionData = () => async (dispatch) => {
//     try {
//         dispatch(getGamesDataStart());
//         const response = await getGamesSectionDataAPIFunc();
//         if (response) {
//             dispatch(getGamesDataAllSuccess(response));
//             return response;
//         }

//     } catch (error) {
//         dispatch(getGamesDataFailure(error));
//     }
// }
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

export default getGamesSectionAPISlice.reducer;