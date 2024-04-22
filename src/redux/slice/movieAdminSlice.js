import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  submit: true,
  update: false,
  selectedMovie: {},
};

const movieAdminSlice = createSlice({
  name: "movieAdminSlice",
  initialState,
  reducers: {
    handleEnableUpdateBtn: (state, action) => {
      state.submit = false;
      state.update = true;
    },
    handleEnableSubmitBtn: (state, action) => {
      state.submit = true;
      state.update = false;
    },
    handleSelectMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
  },
});

export const { handleEnableUpdateBtn, handleEnableSubmitBtn, handleSelectMovie } =
  movieAdminSlice.actions;

export default movieAdminSlice.reducer;
