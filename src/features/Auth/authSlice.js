import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { ROLE_MAPPING } from "../../models/roles-config";

export const initialState = {
  loginData: [],
  status: "idle",
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(userLogin.pending, (state) => {
        state.error = null;
        state.loginData = [];
        state.status = "loading";
      })
      .addCase(userRefresh.pending, (state) => {
        state.error = null;
        state.loginData = [];
        state.status = "loading";
      })
      .addCase(userLogout.pending, (state) => {
        state.error = null;
        state.loginData = [];
        state.status = "loading";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loginData = action.payload;
      })
      .addCase(userRefresh.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loginData = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(userRefresh.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loginData = action.payload;
      });
  },
});

export default authSlice.reducer;

export const { login, logout, refresh } = authSlice.actions;

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

export const userLogout = createAsyncThunk(
  "userLogout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.get("/logout", { withCredentials: true });
      return [];
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const token = (state) => state.auth.loginData.accessToken;

export const menu = (state) => state.auth.loginData.menu;

export const from = (state) => state.auth.loginData.from;

export const status = (state) => state.auth.status;
