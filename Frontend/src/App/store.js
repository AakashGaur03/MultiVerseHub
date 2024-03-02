import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Features/auth/authSlice.js';

export default configureStore({
  reducer: {
    auth: authReducer,
    // other reducers...
  },
});
