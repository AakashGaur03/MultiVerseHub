import { createSlice } from "@reduxjs/toolkit";
import { setCurrentStatus } from "./getCurrentStatusSlice";
import { logoutuserApi } from "../../Api";
import { resetTheme } from "../theme/themeSlice";

const initialState = {
	loading: false,
	logoutMessage: null,
};

const logoutSlice = createSlice({
	name: "logout",
	initialState,
	reducers: {
		logoutStart(state) {
			state.loading = true;
			state.logoutMessage = null;
		},
		logoutSuccess(state, action) {
			state.loading = false;
			state.logoutMessage = action.payload;
		},
		logoutFailure(state, action) {
			state.loading = false;
			state.logoutMessage = action.payload;
		},
		updateLogoutMessage(state, action) {
			state.logoutMessage = action.payload;
		},
	},
});

export const { logoutStart, logoutSuccess, logoutFailure, updateLogoutMessage } = logoutSlice.actions;

export const logoutUser = (accessToken) => async (dispatch) => {
	try {
		dispatch(logoutStart());

		if (!accessToken) {
			accessToken = localStorage.getItem("accessToken");
		}

		const response = await logoutuserApi(accessToken);

		// console.log(response);

		let dispatchMessage = "";
		dispatchMessage = response?.data?.message || "User Logged Out SuccessFully ";
		dispatch(setCurrentStatus({ user: null }));
		dispatch(resetTheme());
		dispatch(logoutSuccess(dispatchMessage));
		localStorage.setItem("accessToken", "");
		return response.data;
	} catch (error) {
		console.log(error);
		let dispatchMessage = "";
		dispatchMessage = error.response?.data?.message || "Unknown Error Ocuured While logging Out user";
		dispatch(logoutFailure(dispatchMessage));
	}
};

export default logoutSlice.reducer;
