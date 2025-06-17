import { createSlice } from "@reduxjs/toolkit";
import { updateUserAvatarApi } from "../../Api";

const initialState = {
	loading: false,
	message: null,
};

const updateAvatarSlice = createSlice({
	name: "updateAvatar",
	initialState,
	reducers: {
		updateAvatarStart(state) {
			state.loading = true;
			state.message = null;
		},
		updateAvatarSuccess(state, action) {
			state.loading = false;
			state.message = action.payload;
		},
		updateAvatarFailure(state, action) {
			state.loading = false;
			state.message = action.payload;
		},
		clearUpdateAvatarMessage(state) {
			state.message = null;
		},
	},
});

export const { updateAvatarStart, updateAvatarSuccess, updateAvatarFailure, clearUpdateAvatarMessage } =
	updateAvatarSlice.actions;

export const updateAvatar = (formData, accessToken) => async (dispatch) => {
	try {
		dispatch(updateAvatarStart());
		const response = await updateUserAvatarApi(formData, accessToken);
		dispatch(updateAvatarSuccess(response.data?.message));
	} catch (error) {
		const message = error.response?.data?.message || "Error while updating avatar";
		dispatch(updateAvatarFailure(message));
	}
};

export default updateAvatarSlice.reducer;
