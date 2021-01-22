import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface SnackbarState {
  opened: boolean;
}

const initialState: SnackbarState = {
  opened: false,
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    openSnackbar: (state) => {
      state.opened = true;
    },
    closeSnackbar: (state) => {
      state.opened = false;
    },
  },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;

export const selectSnackbar = (state: RootState) => state.snackbar.opened;

export default snackbarSlice.reducer;
