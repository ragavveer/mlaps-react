import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { ROLE_MAPPING } from "../../models/roles-config";

export const initialState = {
  loginData: [],
  appStatus: "idle",
  loginStatus: "idle",
  refreshStatus: "idle",
  logoutStatus: "idle",
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    appLoading(state) {
      state.appStatus = "loading";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userLogin.pending, (state) => {
        // state.error = null;
        // state.loginData = [];
        state.loginStatus = "loading";
      })
      .addCase(userRefresh.pending, (state) => {
        // state.error = null;
        // state.loginData = [];
        state.refreshStatus = "loading";
      })
      .addCase(userLogout.pending, (state) => {
        // state.error = null;
        // state.loginData = [];
        state.logoutStatus = "loading";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.loginData = action.payload;
        state.error = null;
      })
      .addCase(userRefresh.fulfilled, (state, action) => {
        state.refreshStatus = "succeeded";
        state.appStatus = "idle";
        state.loginData = action.payload;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.error = action.payload;
        state.loginData = [];
      })
      .addCase(userRefresh.rejected, (state, action) => {
        state.refreshStatus = "failed";
        state.appStatus = "idle";
        state.error = action.payload;
        state.loginData = [];
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.logoutStatus = "succeeded";
        state.error = null;
        state.loginData = action.payload;
      });
  },
});

export default authSlice.reducer;

export const { login, logout, refresh, appLoading } = authSlice.actions;

export const userLogin = createAsyncThunk(
  "userLogin",
  async (payload, { rejectWithValue }) => {
    const { formData, from } = payload;
    try {
      const { data } = await axios.post("/auth", formData, {
        withCredentials: true,
      });
      return { ...data, ...ROLE_MAPPING[0], from };
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const userRefresh = createAsyncThunk(
  "userRefresh",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/refresh", { withCredentials: true });
      return { ...data, ...ROLE_MAPPING[0] };
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const userLogout = createAsyncThunk("userLogout", async () => {
  try {
    await axios.get("/logout", { withCredentials: true });
    return [];
  } catch (err) {
    return err;
  }
});

export const token = (state) => state.auth.loginData.accessToken;

export const menu = (state) => state.auth.loginData.menu;

export const from = (state) => state.auth.loginData.from;

export const appStatus = (state) => state.auth.appStatus;

export const loginStatus = (state) => state.auth.loginStatus;

export const logoutStatus = (state) => state.auth.logoutStatus;

export const refreshStatus = (state) => state.auth.refreshStatus;
