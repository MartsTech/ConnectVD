import { createSlice } from "@reduxjs/toolkit";

export const controlsSlice = createSlice({
  name: "controls",
  initialState: {
    audio: true,
    video: true,
    chat: false,
    screen: false,
    leave: false,
  },
  reducers: {
    setAudio: (state, action) => {
      state.audio = action.payload.audio;
    },
    setVideo: (state, action) => {
      state.video = action.payload.video;
    },
    setChat: (state, action) => {
      state.chat = action.payload.chat;
    },
    setScreen: (state, action) => {
      state.screen = action.payload.screen;
    },
    setLeave: (state, action) => {
      state.leave = action.payload.leave;
    },
  },
});

export const {
  setAudio,
  setVideo,
  setChat,
  setScreen,
  setLeave,
} = controlsSlice.actions;

export const selectAudio = (state) => state.controls.audio;
export const selectVideo = (state) => state.controls.video;
export const selectChat = (state) => state.controls.chat;
export const selectScreen = (state) => state.controls.screen;
export const selectLeave = (state) => state.controls.leave;

export default controlsSlice.reducer;
