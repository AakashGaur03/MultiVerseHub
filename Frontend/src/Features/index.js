import registerReducer, { registerUser } from "./auth/registerSlice.js";

import themeReducer, { toggleTheme } from "./theme/themeSlice.js";

import loginReducer, { loginUser } from "./auth/loginSlice.js";

import logoutReducer, { logoutUser } from "./auth/logoutSlice.js";

import sidebarRecuer, { updateSidebar } from "./Components/sidebarSlice.js"

import getCurrentStatusReducer, {
  fetchCurrentStatusUser,
} from "./auth/getCurrentStatusSlice.js";

import forgotPasswordReducer, {
  sendOTPMail,
  verifyOTP,
  createNewPassword,
} from "./auth/forgotPasswordSlice.js";

import getNewsAPIReducer, { getNews } from "./APIReducers/getNewsAPISlice.js";

// import getGamesAPIReducer, { getGamesSectionData,getGamesSectionDataCategoryWise } from './APIReducers/getGamesSlice.js'
import getGamesAPIReducer, { getGamesSectionDataCategoryWise } from './APIReducers/getGamesSlice.js'

import getCricketAPIReducer, {
  getCricket,
  getCricketPointsTable,
  getCricketImageCBs,
  getCricketNewsCBs,
  getCricketRanking,
  getUploadImageCloudinary,
  getCricketImageDB,
} from "./APIReducers/getCricketAPISlice.js";
import getEntertainmentReducer, { getEntertainmentDataMovie, getEntertainmentParticularsData, getEntertainmentDataTV } from "./APIReducers/entertainmentSlice.js";

export {
  registerReducer,
  themeReducer,
  registerUser,
  toggleTheme,
  sidebarRecuer,
  loginReducer,
  loginUser,
  logoutReducer,
  logoutUser,
  getCurrentStatusReducer,
  fetchCurrentStatusUser,
  forgotPasswordReducer,
  sendOTPMail,
  verifyOTP,
  createNewPassword,
  getNewsAPIReducer,
  getNews,
  getCricketAPIReducer,
  getCricket,
  getCricketPointsTable,
  getCricketImageCBs,
  getCricketNewsCBs,
  getCricketRanking,
  getUploadImageCloudinary,
  getCricketImageDB,
  getEntertainmentReducer,
  getEntertainmentDataMovie,
  getEntertainmentDataTV,
  getEntertainmentParticularsData,
  updateSidebar,
  getGamesAPIReducer,
  // getGamesSectionData,
  getGamesSectionDataCategoryWise,
};
