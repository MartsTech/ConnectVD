import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface FriendState {
  email: string | null;
}

const initialState: FriendState = {
  email: null,
};

export const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    setFriendEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setFriendEmail } = friendSlice.actions;

export const selectFriendEmail = (state: RootState) => state.friend.email;

export default friendSlice.reducer;
