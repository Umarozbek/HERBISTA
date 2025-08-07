import { UserTypes } from "@/types/RootTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  data: UserTypes[] | [];
  isPending: boolean;
  error: string;
}

const initialState: UserState = {
  data: [],
  isPending: false,
  error: "",
};

const ProductsSlicer = createSlice({
  name: "Admins",
  initialState,
  reducers: {
    setUsers(state, { payload }: PayloadAction<UserTypes[]>) {
      state.data = payload;
      state.isPending = false;
      state.error = "";
    },
    setUsersPending(state) {
      state.isPending = true;
    },
    setUsersError(state, { payload }: PayloadAction<string>) {
      state.error = payload;
      state.isPending = false;
    },
  },
});

export const { setUsers, setUsersError, setUsersPending } =
  ProductsSlicer.actions;
export default ProductsSlicer.reducer;
