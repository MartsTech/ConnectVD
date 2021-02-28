import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface FriendState {
  email: string | null;
  type: "request" | "invite" | null;
}

const initialState: FriendState = {
  email: null,
  type: null,
};

export const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    setFriendEmail: (state, action) => {
      state.email = action.payload;
    },
    setRequestType: (state, action: { payload: "request" | "invite" }) => {
      state.type = action.payload;
    },
  },
});

export const { setFriendEmail, setRequestType } = friendSlice.actions;

export const selectFriendEmail = (state: RootState) => state.friend.email;
export const selectRequestType = (state: RootState) => state.friend.type;

export default friendSlice.reducer;
