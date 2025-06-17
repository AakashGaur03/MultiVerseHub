import registerReducer, {
	registerUser,
	registrationStart,
	registrationSuccess,
	registrationFailure,
	updateUserRegistered,
	UpdateRegisterMessage,
} from "./auth/registerSlice.js";

import themeReducer, { toggleTheme } from "./theme/themeSlice.js";

import loginReducer, {
	loginUser,
	loginStart,
	loginSuccess,
	loginFailure,
	storeAccessToken,
	loginMessageUpdate,
} from "./auth/loginSlice.js";

import logoutReducer, {
	logoutUser,
	logoutStart,
	logoutSuccess,
	logoutFailure,
	updateLogoutMessage,
} from "./auth/logoutSlice.js";

import sidebarReducer, { updateSidebar, toggleClicked } from "./Components/sidebarSlice.js";

import getCurrentStatusReducer, { fetchCurrentStatusUser } from "./auth/getCurrentStatusSlice.js";

import forgotPasswordReducer, {
	sendOTPMail,
	verifyOTP,
	createNewPassword,
	sendOTPMailStart,
	sendOTPMailSuccess,
	sendOTPMailFailure,
	verifyOTPStart,
	verifyOTPSuccess,
	verifyOTPFailure,
	resetPasswordStart,
	resetPasswordSuccess,
	resetPasswordFailure,
	updateErrorAndMessage,
} from "./auth/forgotPasswordSlice.js";

import weatherReducer, { getWeather } from "./APIReducers/weatherAPISlice.js";

import getNewsAPIReducer, { getNews, getFinanceNews } from "./APIReducers/getNewsAPISlice.js";

// import getGamesAPIReducer, { getGamesSectionData,getGamesSectionDataCategoryWise } from './APIReducers/getGamesSlice.js'
import getGamesAPIReducer, {
	getGamesParticularsData,
	getGamesSectionDataCategoryWise,
} from "./APIReducers/getGamesSlice.js";

import getCricketAPIReducer, {
	getCricket,
	getCricketPointsTable,
	getCricketImageCBs,
	getCricketNewsCBs,
	getCricketRanking,
	getUploadImageCloudinary,
	getCricketImageDB,
	getcricketSearchPlayer,
	getcricketPlayerInfo,
} from "./APIReducers/getCricketAPISlice.js";
import getEntertainmentReducer, {
	getEntertainmentDataMovie,
	getEntertainmentParticularsData,
	getEntertainmentDataTV,
	getEntertainmentSearchData,
} from "./APIReducers/entertainmentSlice.js";
import FavSectionReducer, {
	addFavSection,
	getFavSection,
	removeFavSection,
	addFavSectionStart,
	addFavSectionSuccess,
	addFavSectionFailure,
	getFavSectionStart,
	getFavSectionSuccess,
	getFavSectionFailure,
	removeFavSectionStart,
	removeFavSectionSuccess,
	removeFavSectionFailure,
} from "./APIReducers/favAPISlice.js";
import ChangePasswordAPIReducer, {
	changePassword,
	changePasswordFailure,
	changePasswordStart,
	changePasswordSuccess,
} from "./auth/changePasswordSlice.js";
import UpdateAccountAPIReducer, {
	updateAccountDetails,
	updateAccountFailure,
	updateAccountStart,
	updateAccountSuccess,
	clearUpdateAccountMessage,
} from "./auth/updateAccountSlice.js";
import UpdateAvatarAPIReducer, {
	updateAvatar,
	updateAvatarFailure,
	updateAvatarStart,
	updateAvatarSuccess,
	clearUpdateAvatarMessage,
} from "./auth/updateAvatarSlice.js";
import updatePasswordAPIReducer, {
	clearUpdatePasswordMessage,
	updatePassword,
	updatePasswordFailure,
	updatePasswordStart,
	updatePasswordSuccess,
} from "./auth/updatePasswordSlice.js";

updatePassword;
export {
	registerReducer,
	themeReducer,
	registerUser,
	toggleTheme,
	sidebarReducer,
	loginReducer,
	loginUser,
	logoutReducer,
	weatherReducer,
	loginStart,
	loginSuccess,
	loginFailure,
	storeAccessToken,
	loginMessageUpdate,
	registrationStart,
	registrationSuccess,
	registrationFailure,
	updateUserRegistered,
	UpdateRegisterMessage,
	logoutStart,
	logoutSuccess,
	logoutFailure,
	updateLogoutMessage,
	sendOTPMailStart,
	sendOTPMailSuccess,
	sendOTPMailFailure,
	verifyOTPStart,
	verifyOTPSuccess,
	verifyOTPFailure,
	resetPasswordStart,
	resetPasswordSuccess,
	resetPasswordFailure,
	updateErrorAndMessage,
	getWeather,
	logoutUser,
	getCurrentStatusReducer,
	fetchCurrentStatusUser,
	forgotPasswordReducer,
	sendOTPMail,
	verifyOTP,
	createNewPassword,
	getNewsAPIReducer,
	getNews,
	getFinanceNews,
	getCricketAPIReducer,
	getCricket,
	getCricketPointsTable,
	getCricketImageCBs,
	getCricketNewsCBs,
	getCricketRanking,
	getUploadImageCloudinary,
	getCricketImageDB,
	getcricketSearchPlayer,
	getcricketPlayerInfo,
	getEntertainmentReducer,
	getEntertainmentDataMovie,
	getEntertainmentDataTV,
	getEntertainmentParticularsData,
	updateSidebar,
	toggleClicked,
	getGamesAPIReducer,
	// getGamesSectionData,
	getGamesSectionDataCategoryWise,
	getGamesParticularsData,
	getEntertainmentSearchData,
	FavSectionReducer,
	addFavSection,
	getFavSection,
	removeFavSection,
	addFavSectionStart,
	addFavSectionSuccess,
	addFavSectionFailure,
	getFavSectionStart,
	getFavSectionSuccess,
	getFavSectionFailure,
	removeFavSectionStart,
	removeFavSectionSuccess,
	removeFavSectionFailure,
	changePasswordStart,
	changePasswordSuccess,
	changePasswordFailure,
	ChangePasswordAPIReducer,
	changePassword,
	updateAccountStart,
	updateAccountSuccess,
	updateAccountFailure,
	UpdateAccountAPIReducer,
	UpdateAvatarAPIReducer,
	updateAccountDetails,
	updateAvatarStart,
	updateAvatarSuccess,
	updateAvatarFailure,
	updateAvatar,
	clearUpdateAvatarMessage,
	clearUpdateAccountMessage,
	updatePasswordAPIReducer,
	updatePasswordStart,
	updatePasswordSuccess,
	updatePasswordFailure,
	clearUpdatePasswordMessage,
	updatePassword,
};
