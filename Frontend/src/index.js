import NavbarComp from "./Components/Navbar/NavbarComp.jsx";
import Dashboard from "./Components/Dashboard.jsx";
import OptionContainer from "./Components/OptionContainer/OptionContainer.jsx";
import Games from "./Components/Games/Games.jsx";
import Entertainment from "./Components/Entertainment/Entertainment.jsx";
import Cricket from "./Components/Cricket/Cricket.jsx";
import PointsTable from "./Components/Cricket/PointsTable.jsx";
import Ranking from "./Components/Cricket/Ranking.jsx";
import News from "./Components/News/News.jsx";
import Favorite from "./Components/Favorites/Favorite.jsx";
import Sidebar from "./Components/Sidebar/Sidebar.jsx";
import LocalSearch from "./Components/LocalSearch/LocalSearch.jsx";
import Weather from "./Components/News/Weather.jsx";
import WordOfTheDay from "./Components/News/WordOfTheDay.jsx";
import CustomCard from "./GlobalComp/CustomCard.jsx";
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
  PointsTable,
  Ranking,
  News,
  Favorite,
  truncateText,
  Games,
  Sidebar,
  LocalSearch,
  Weather,
  WordOfTheDay,
  CustomCard,
};
