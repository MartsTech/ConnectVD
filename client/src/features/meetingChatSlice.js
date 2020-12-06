import { createSlice } from "@reduxjs/toolkit";

export const meetingChatSlice = createSlice({
  name: "meetingChat",
  initialState: {
    meetingChat: false,
  },
  reducers: {
    setMeetingChat: (state, action) => {
      state.meetingChat = action.payload.meetingChat;
    },
  },
});

export const { setMeetingChat } = meetingChatSlice.actions;

export const selectMeetingChat = (state) => state.meetingChat.meetingChat;

export default meetingChatSlice.reducer;
