import registerReducer, { registerUser } from "./auth/registerSlice.js";

import themeReducer, { toggleTheme } from "./theme/themeSlice.js";

import loginReducer, { loginUser } from "./auth/loginSlice.js";

import logoutReducer, { logoutUser } from "./auth/logoutSlice.js";

import getCurrentStatusReducer, {
  fetchCurrentStatusUser,
} from "./auth/getCurrentStatus.js";

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
};
