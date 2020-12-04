import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "../features/roomSlice";

export default configureStore({
  reducer: {
    room: roomReducer,
  },
});
