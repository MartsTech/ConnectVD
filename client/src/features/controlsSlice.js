import { createSlice } from "@reduxjs/toolkit";

export const controlsSlice = createSlice({
  name: "controls",
  initialState: {
    video: true,
    sound: true,
    chat: false,
  },
  reducers: {
    setVideo: (state, action) => {
      state.video = action.payload.video;
    },
    setSound: (state, action) => {
      state.sound = action.payload.sound;
    },
    setChat: (state, action) => {
      state.chat = action.payload.chat;
    },
  },
});

export const { setVideo, setSound, setChat } = controlsSlice.actions;

export const selectVideo = (state) => state.controls.video;
export const selectSound = (state) => state.controls.sound;
export const selectChat = (state) => state.controls.chat;

export default controlsSlice.reducer;
