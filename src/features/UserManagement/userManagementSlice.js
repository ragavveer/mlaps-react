import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { axiosPrivate } from "../../api/axios";

export const initialState = {
  entities: [],
  status: "idle",
  error: null,
};

export const userManagementSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getEntities.pending, (state) => {
        state.entities = [];
        state.error = null;
        state.status = "loading";
      })
      .addCase(getEntities.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = action.payload;
      })
      .addCase(getEntities.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default userManagementSlice.reducer;

export const { entities } = userManagementSlice.actions;

export const getEntities = createAsyncThunk(
  "getEntities",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.get("/employees");
      return data;
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const entityList = (state) => state.userManagement.entities;

export const entityStatus = (state) => state.userManagement.status;
