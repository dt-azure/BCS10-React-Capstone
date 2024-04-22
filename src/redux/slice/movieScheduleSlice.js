import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleLoadingOff, handleLoadingOn } from "./loadingSlice";
import { manageMoviesServ } from "../../services/manageMovies";

const initialState = {
  selectedSchedule: {},
};

export const getMovieScheduleThunk = createAsyncThunk(
  "movieManagement/getMovieScheduleThunk",
  async (id, { _, dispatch }) => {
    dispatch(handleLoadingOn());
    const res = await manageMoviesServ.getSchedule(id);
    dispatch(handleLoadingOff());
    return res.data.content;
  }
);

const movieScheduleSlice = createSlice({
  name: "movieManagement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovieScheduleThunk.fulfilled, (state, action) => {
      state.arrMovie = action.payload;
    });
  },
});

export const { handleGetAllMovies, handleSelectMovieInfo } = movieSlice.actions;

export default movieScheduleSlice.reducer;
