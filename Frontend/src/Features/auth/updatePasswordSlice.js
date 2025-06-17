// src/Features/updatePasswordSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { changePasswordApi } from "../../Api";

const updatePasswordSlice = createSlice({
	name: "updatePassword",
	initialState: {
		loading: false,
		message: null,
		error: null,
	},
	reducers: {
		updatePasswordStart: (state) => {
			state.loading = true;
			state.message = null;
			state.error = null;
		},
		updatePasswordSuccess: (state, action) => {
			state.loading = false;
			state.message = action.payload;
		},
		updatePasswordFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		clearUpdatePasswordMessage: (state) => {
			state.message = null;
			state.error = null;
		},
	},
});

export const { updatePasswordStart, updatePasswordSuccess, updatePasswordFailure, clearUpdatePasswordMessage } =
	updatePasswordSlice.actions;

export const updatePassword = (data) => async (dispatch) => {
	try {
		dispatch(updatePasswordStart());
		const accessToken = localStorage.getItem("accessToken");
		const res = await changePasswordApi(accessToken, data);
		dispatch(updatePasswordSuccess(res.data.message));
		return res.data;
	} catch (err) {
		const errorMsg = err?.response?.data?.message || "Something went wrong";
		dispatch(updatePasswordFailure(errorMsg));
	}
};

export default updatePasswordSlice.reducer;
