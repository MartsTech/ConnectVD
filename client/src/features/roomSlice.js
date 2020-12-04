import { createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
  name: "room",
  initialState: {
    roomId: null,
  },
  reducers: {
    setRoom: (state, action) => {
      state.roomId = action.payload.roomId;
    },
  },
});

export const { setRoom } = roomSlice.actions;

export const selectRoomId = (state) => state.room.roomId;

export default roomSlice.reducer;
