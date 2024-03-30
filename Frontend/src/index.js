import NavbarComp from "./Components/Navbar/NavbarComp.jsx";
import Dashboard from "./Components/Dashboard.jsx";
import OptionContainer from "./Components/OptionContainer/OptionContainer.jsx";
import Games from "./Components/Games/Games.jsx";
import Entertainment from "./Components/Entertainment/Entertainment.jsx";
import Cricket from "./Components/Cricket/Cricket.jsx";
import News from "./Components/News/News.jsx";
import Favorite from "./Components/Favorites/Favorite.jsx";
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
import truncateText from "./GlobalComp/TruncateText.js";

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
  OptionContainer,
  Entertainment,
  Cricket,
  News,
  Favorite,
  truncateText
};
