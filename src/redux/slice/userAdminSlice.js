import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleLoadingOff, handleLoadingOn } from "./loadingSlice";
import { manageUsersServ } from "../../services/manageUsers";

const initialState = {
  submit: true,
  update: false,
  selectedUser: {},
  userArr: [],
};

export const getAllUsersThunk = createAsyncThunk(
  "userAdmin/getAllUsersThunk",
  async (dataLocal, { _, dispatch }) => {
    dispatch(handleLoadingOn());
    const res = await manageUsersServ.getAllUsers();
    dispatch(handleLoadingOff());
    return res.data.content;
  }
);

const userAdminSlice = createSlice({
  name: "userAdmin",
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
    handleSelectUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsersThunk.fulfilled, (state, action) => {
      state.userArr = action.payload;
    });
  },
});

export const {
  handleEnableUpdateBtn,
  handleEnableSubmitBtn,
  handleSelectUser,
} = userAdminSlice.actions;

export default userAdminSlice.reducer;
