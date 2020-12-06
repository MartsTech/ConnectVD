import { configureStore } from "@reduxjs/toolkit";
import meetingChatReducer from "../features/meetingChatSlice";

export default configureStore({
  reducer: {
    meetingChat: meetingChatReducer,
  },
});
