import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { manageMoviesServ } from "../../services/manageMovies";
import { handleLoadingOff, handleLoadingOn } from "./loadingSlice";

const initialState = {
  arrMovie: [],
  selectedMovieInfo: {},
};

export const getAllMoviesThunk = createAsyncThunk(
  "movieManagement/getAllMoviesThunk",
  async (dataLocal, { _, dispatch }) => {
    dispatch(handleLoadingOn());
    const res = await manageMoviesServ.getAllMovie();
    dispatch(handleLoadingOff());
    return res.data.content;
  }
);

export const deleteMovieThunk = createAsyncThunk(
  "movieManagement/deleteMovieThunk",
  async (id, { _, dispatch }) => {
    dispatch(handleLoadingOn());
    await manageMoviesServ.deleteMovie(id);
    dispatch(handleLoadingOff());
  }
);


const movieSlice = createSlice({
  name: "movieManagement",
  initialState,
  reducers: {
    handleSelectMovieInfo: (state, action) => {
      state.selectedMovieInfo = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllMoviesThunk.fulfilled, (state, action) => {
      state.arrMovie = action.payload;
    });
  },
});

export const { handleGetAllMovies, handleSelectMovieInfo } = movieSlice.actions;

export default movieSlice.reducer;
