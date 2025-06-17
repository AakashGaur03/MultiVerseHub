import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUserStatusApi } from "../../Api";
import { setThemeFromServer } from "../theme/themeSlice";

const storedVal = localStorage.getItem("isUserLoggedIn") === "true";

const initialState = {
	isUserLoggedIn: storedVal || false,
	state: null,
	user: null,
};

const getCurrentStatusSlice = createSlice({
	name: "getCurrentStatus",
	initialState,
	reducers: {
		setCurrentStatus(state, action) {
			const user = action.payload?.user || null;
			state.user = user;
			state.isUserLoggedIn = !!user;
			state.state = null;

			localStorage.setItem("isUserLoggedIn", user ? "true" : "false");
		},
		setCurrentStatusState(state) {
			state.state = "loading";
		},
	},
});

export const { setCurrentStatus, setCurrentStatusState } = getCurrentStatusSlice.actions;

export const fetchCurrentStatusUser = () => async (dispatch) => {
	try {
		dispatch(setCurrentStatusState());
		const accessToken = localStorage.getItem("accessToken");

		const response = await getCurrentUserStatusApi(accessToken);

		if (response?.data?.data) {
			const user = response.data.data;
			dispatch(setCurrentStatus({ user }));

			// ⬅️ Apply saved theme
			if (user?.themePreference) {
				dispatch(setThemeFromServer(user.themePreference));
			}
		} else {
			dispatch(setCurrentStatus({ user: null }));
		}
	} catch (error) {
		dispatch(setCurrentStatus({ user: null }));
		console.error("Error fetching current user status:", error);
	}
};

export default getCurrentStatusSlice.reducer;
