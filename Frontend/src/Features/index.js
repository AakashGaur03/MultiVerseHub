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
  favSectionStart,
  favSectionSuccess,
  favSectionFailure,
} from "./APIReducers/favAPISlice.js";
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
  favSectionStart,
  favSectionSuccess,
  favSectionFailure,
};
