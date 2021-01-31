import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type snackbarContent = {
  message: string;
  status: "error" | "warning" | "info" | "success";
};

interface SnackbarState {
  opened: boolean;
  content: snackbarContent | null;
}

const initialState: SnackbarState = {
  opened: false,
  content: null,
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
    setSnackbarContent: (state, action: { payload: snackbarContent }) => {
      state.content = action.payload;
    },
  },
});

export const {
  openSnackbar,
  closeSnackbar,
  setSnackbarContent,
} = snackbarSlice.actions;

export const selectSnackbar = (state: RootState) => state.snackbar.opened;
export const selectSnackbarContent = (state: RootState) =>
  state.snackbar.content;

export default snackbarSlice.reducer;
