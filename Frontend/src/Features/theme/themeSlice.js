import { createSlice } from "@reduxjs/toolkit";
import { updateUserThemePreference } from "../../Api";

const initialState = {
	theme: "dark",
	textColor: "text-white",
	isSaving: false,
};

const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		toggleTheme(state) {
			state.theme = state.theme === "light" ? "dark" : "light";
			state.textColor = state.theme === "light" ? "text-black" : "text-white";
		},
		setThemeFromServer(state, action) {
			const theme = action.payload === "light" ? "light" : "dark";
			state.theme = theme;
			state.textColor = theme === "light" ? "text-black" : "text-white";
		},

		saveThemeStart(state) {
			state.isSaving = true;
		},
		saveThemeSuccess(state) {
			state.isSaving = false;
		},
		saveThemeFailure(state) {
			state.isSaving = false;
		},
		resetTheme(state) {
			state.theme = "dark";
			state.textColor = "text-white";
			state.isSaving = false;
		},
	},
});

export const { toggleTheme, setThemeFromServer, saveThemeStart, saveThemeSuccess, saveThemeFailure, resetTheme } =
	themeSlice.actions;

// Async thunk to save theme
export const saveThemePreference = (theme) => async (dispatch) => {
	try {
		dispatch(saveThemeStart());
		const accessToken = localStorage.getItem("accessToken");
		await updateUserThemePreference(accessToken, theme);
		dispatch(saveThemeSuccess());
	} catch (error) {
		console.error("Error saving theme:", error);
		dispatch(saveThemeFailure());
	}
};

export default themeSlice.reducer;
