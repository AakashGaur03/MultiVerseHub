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
} from "../Features/index.js";

export default configureStore({
  reducer: {
    register: registerReducer,
    theme: themeReducer,
    login: loginReducer,
    logout: logoutReducer,
    getCurrentStatus: getCurrentStatusReducer,
    forgotPassword: forgotPasswordReducer,
    cricket: getCricketAPIReducer,
    getEntertainmentData: getEntertainmentReducer,

    // other reducers...
  },
});
