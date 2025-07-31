import { createSlice } from "@reduxjs/toolkit";

const UserSlicer = createSlice({
  name: "User",
  initialState: {
    data: {},
    isPending: false,
    isError: "",
    isAuth: false,
  },
  reducers: {
    getUserPending(state) {
      state.isPending = true;
      state.isError = "";
    },
    getUserSuccess(state, { payload }) {
      state.isAuth = true;
      state.data = payload; // Populate user data on successful login
      state.isPending = false;
    },
    getUserError(state, { payload }) {
      state.isPending = false;
      state.isError = payload;
    },
  },
});

export const { getUserError, getUserPending, getUserSuccess } = UserSlicer.actions;
export default UserSlicer.reducer;
