import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface ControlsState {
  audio: boolean;
  video: boolean;
  chat: boolean;
  screen: boolean;
  leave: boolean;
}

const initialState: ControlsState = {
  audio: true,
  video: true,
  chat: false,
  screen: false,
  leave: false,
};

export const controlsSlice = createSlice({
  name: "controls",
  initialState,
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

export const selectAudio = (state: RootState) => state.controls.audio;
export const selectVideo = (state: RootState) => state.controls.video;
export const selectChat = (state: RootState) => state.controls.chat;
export const selectScreen = (state: RootState) => state.controls.screen;
export const selectLeave = (state: RootState) => state.controls.leave;

export default controlsSlice.reducer;
