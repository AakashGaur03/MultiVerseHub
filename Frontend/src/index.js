import NavbarComp from "./Components/Navbar/NavbarComp.jsx";
import Dashboard from "./Components/Dashboard.jsx";
import {
  OtpForm,
  ForgotPassword,
  Login,
  Logout,
  Registration,
} from "./Components/UserControls/index.js";
import {
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
} from "./Features/index.js";

export {
  OtpForm,
  ForgotPassword,
  Login,
  Logout,
  Registration,
  NavbarComp,
  Dashboard,
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
