import {
  Action,
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import controlsReducer from "../features/controlsSlice";
import dialogReducer from "../features/dialogSlice";
import dropdownReducer from "../features/dropdownSlice";
import friendReducer from "../features/friendSlice";
import mailReducer from "../features/mailSlice";
import meetingReducer from "../features/meetingSlice";
import sidebarReducer from "../features/sidebarSlice";
import snackbarReducer from "../features/snackbarSlice";

const controlsPersistConfig = {
  key: "controls",
  storage,
};

const mailPersistConfig = {
  key: "mail",
  storage,
};

const controlsPersistedReducer = persistReducer(
  controlsPersistConfig,
  controlsReducer
);

const mailPersistedReducer = persistReducer(mailPersistConfig, mailReducer);

export const store = configureStore({
  reducer: {
    controls: controlsPersistedReducer,
    dialog: dialogReducer,
    dropdown: dropdownReducer,
    snackbar: snackbarReducer,
    friend: friendReducer,
    mail: mailPersistedReducer,
    sidebar: sidebarReducer,
    meeting: meetingReducer,
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
