import { createSlice } from "@reduxjs/toolkit";

export const controlsSlice = createSlice({
  name: "controls",
  initialState: {
    audio: null,
    video: null,
    chat: null,
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
  },
});

export const { setAudio, setVideo, setChat } = controlsSlice.actions;

export const selectAudio = (state) => state.controls.audio;
export const selectVideo = (state) => state.controls.video;
export const selectChat = (state) => state.controls.chat;

export default controlsSlice.reducer;
