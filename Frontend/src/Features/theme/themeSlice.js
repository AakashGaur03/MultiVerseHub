import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	theme: "dark",
	textColor: "text-white",
};

const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		toggleTheme(state) {
			state.theme = state.theme === "light" ? "dark" : "light";
			state.textColor = state.theme == "light" ? "text-black" : "text-white";
		},
	},
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
