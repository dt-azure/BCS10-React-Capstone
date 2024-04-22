import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./slice/movieSlice";
import loadingSlice from "./slice/loadingSlice";
import movieAdminSlice from "./slice/movieAdminSlice";
import userAdminSlice from "./slice/userAdminSlice";

export const store = configureStore({
  reducer: {
    movieSlice,
    loadingSlice,
    movieAdminSlice,
    userAdminSlice,
  },
});
