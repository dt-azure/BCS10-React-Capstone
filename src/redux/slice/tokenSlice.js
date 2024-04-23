import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "../../utils/util";

const initialState = {
  token: ""
};

export const getTokenThunk = createAsyncThunk(
  "movieManagement/getAllMoviesThunk",
  async (dataLocal, { _, dispatch }) => {
    const user = await getLocalStorage("user");
    return user.data.content.accessToken;
  }
);

const tokenSlice = createSlice({
  name: "tokenManagement",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getTokenThunk.fulfilled, (state, action) => {
      state.token = action.payload;
    });
  },
});

export const { } = tokenSlice.actions;

export default tokenSlice.reducer;
