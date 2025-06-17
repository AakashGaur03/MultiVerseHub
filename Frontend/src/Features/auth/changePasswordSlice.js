import { createSlice } from "@reduxjs/toolkit";
import { changePasswordApi } from "../../Api";

const initialState = {
	loading: false,
	message: null,
};

const changePasswordSlice = createSlice({
	name: "changePassword",
	initialState,
	reducers: {
		changePasswordStart(state) {
			state.loading = true;
			state.message = null;
		},
		changePasswordSuccess(state, action) {
			state.loading = false;
			state.message = action.payload;
		},
		changePasswordFailure(state, action) {
			state.loading = false;
			state.message = action.payload;
		},
	},
});

export const { changePasswordStart, changePasswordSuccess, changePasswordFailure } = changePasswordSlice.actions;

export const changePassword = (data, accessToken) => async (dispatch) => {
	try {
		dispatch(changePasswordStart());
		const response = await changePasswordApi(data, accessToken);
		dispatch(changePasswordSuccess(response.data?.message));
	} catch (error) {
		const message = error.response?.data?.message || "Error occurred while changing password";
		dispatch(changePasswordFailure(message));
	}
};

export default changePasswordSlice.reducer;
