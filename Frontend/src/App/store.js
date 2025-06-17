import { configureStore } from "@reduxjs/toolkit";
import {
	loginReducer,
	logoutReducer,
	registerReducer,
	themeReducer,
	getCurrentStatusReducer,
	forgotPasswordReducer,
	getCricketAPIReducer,
	getEntertainmentReducer,
	sidebarReducer,
	getGamesAPIReducer,
	getNewsAPIReducer,
	weatherReducer,
	FavSectionReducer,
	UpdateAccountAPIReducer,
	ChangePasswordAPIReducer,
	UpdateAvatarAPIReducer,
} from "../Features/index.js";

const store = configureStore({
	reducer: {
		register: registerReducer,
		theme: themeReducer,
		login: loginReducer,
		logout: logoutReducer,
		getCurrentStatus: getCurrentStatusReducer,
		forgotPassword: forgotPasswordReducer,
		cricket: getCricketAPIReducer,
		getEntertainmentData: getEntertainmentReducer,
		sidebar: sidebarReducer,
		games: getGamesAPIReducer,
		news: getNewsAPIReducer,
		weather: weatherReducer,
		favSection: FavSectionReducer,
		updateAccount: UpdateAccountAPIReducer,
		changePassword: ChangePasswordAPIReducer,
		updateAvatar: UpdateAvatarAPIReducer,

		// other reducers...
	},
});

export default store;
