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
  sidebarRecuer,
  getGamesAPIReducer,
  getNewsAPIReducer,
  weatherReducer,
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
    sidebar: sidebarRecuer,
    games: getGamesAPIReducer,
    news: getNewsAPIReducer,
    weather: weatherReducer,

    // other reducers...
  },
});

export default store;
