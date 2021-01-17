import {
  Action,
  configureStore,
  getDefaultMiddleware,
  ThunkAction
} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import controlsReducer from "../features/controlsSlice";
import dialogReducer from "../features/dialogSlide";
import userReducer from "../features/userSlice";

const controlsPersistConfig = {
  key: "controls",
  storage,
};

const controlsPersistedReducer = persistReducer(
  controlsPersistConfig,
  controlsReducer
);

export const store = configureStore({
  reducer: {
    user: userReducer,
    controls: controlsPersistedReducer,
    dialog: dialogReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
