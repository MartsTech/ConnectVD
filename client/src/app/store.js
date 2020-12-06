import { configureStore } from "@reduxjs/toolkit";
import controlsReducer from "../features/controlsSlice";

export default configureStore({
  reducer: {
    controls: controlsReducer,
  },
});
