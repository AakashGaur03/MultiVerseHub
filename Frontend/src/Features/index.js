import registerReducer, { registerUser } from "./auth/registerSlice.js";

import themeReducer, { toggleTheme } from "./theme/themeSlice.js";

import loginReducer, { loginUser } from "./auth/loginSlice.js";

import logoutReducer, { logoutUser } from "./auth/logoutSlice.js";

import getCurrentStatusReducer, {
  fetchCurrentStatusUser,
} from "./auth/getCurrentStatusSlice.js";

import forgotPasswordReducer, {
  sendOTPMail,
  verifyOTP,
  createNewPassword,
} from "./auth/forgotPasswordSlice.js";

import getNewsAPIReducer, { getNews } from "./APIReducers/getNewsAPISlice.js";

import getCricketAPIReducer, {
  getCricket,
  getCricketPointsTable,
  getCricketImageCBs,
  getCricketNewsCBs,
  getCricketRanking,
  getUploadImageCloudinary,
  getCricketImageDB,
} from "./APIReducers/getCricketAPISlice.js";
import getEntertainmentReducer, { getEntertainmentData } from "./APIReducers/entertainmentSlice.js";
export {
  registerReducer,
  themeReducer,
  registerUser,
  toggleTheme,
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
  getEntertainmentData,
};
