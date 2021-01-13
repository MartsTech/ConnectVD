import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import controlsReducer from "../features/controlsSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    controls: controlsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
