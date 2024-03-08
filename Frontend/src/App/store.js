import { configureStore } from "@reduxjs/toolkit";
import {
  loginReducer,
  registerReducer,
  themeReducer,
} from "../Features/index.js";

export default configureStore({
  reducer: {
    register: registerReducer,
    theme: themeReducer,
    login: loginReducer,

    // other reducers...
  },
});
