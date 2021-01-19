import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type UserContext = {
  displayName: string;
  email: string;
  photoUrl?: string;
  uid: string;
};

interface UserState {
  user: UserContext | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: { payload: UserContext }) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
