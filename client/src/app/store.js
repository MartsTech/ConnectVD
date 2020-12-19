import { configureStore } from "@reduxjs/toolkit";
import controlsReducer from "../features/controlsSlice";
import userReducer from "../features/userSlice";

export default configureStore({
  reducer: {
    controls: controlsReducer,
    user: userReducer,
  },
});
