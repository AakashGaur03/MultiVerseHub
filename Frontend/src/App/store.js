import { configureStore } from "@reduxjs/toolkit";
import { authReducer, themeReducer } from "../Features/index.js";

export default configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    // other reducers...
  },
});
