import { createSlice } from "@reduxjs/toolkit";
import { updateAccountDetailsApi } from "../../Api";

const initialState = {
	loading: false,
	message: null,
};

const updateAccountSlice = createSlice({
	name: "updateAccount",
	initialState,
	reducers: {
		updateAccountStart(state) {
			state.loading = true;
			state.message = null;
		},
		updateAccountSuccess(state, action) {
			state.loading = false;
			state.message = action.payload;
		},
		updateAccountFailure(state, action) {
			state.loading = false;
			state.message = action.payload;
		},
		clearUpdateAccountMessage(state) {
			state.message = null;
		},
	},
});

export const { updateAccountStart, updateAccountSuccess, updateAccountFailure, clearUpdateAccountMessage } =
	updateAccountSlice.actions;

export const updateAccountDetails = (data) => async (dispatch) => {
	try {
		dispatch(updateAccountStart());
		const accessToken = localStorage.getItem("accessToken");
		const response = await updateAccountDetailsApi(accessToken, data);
		dispatch(updateAccountSuccess(response.data?.message));
		return response.data;
	} catch (error) {
		const message = error.response?.data?.message || "Failed to update account details";
		dispatch(updateAccountFailure(message));
	}
};

export default updateAccountSlice.reducer;
