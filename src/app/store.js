import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authSlice";
import userManagementReducer from "../features/UserManagement/userManagementSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userManagement: userManagementReducer,
  },
});
