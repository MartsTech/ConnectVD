import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface DialogState {
  opened: boolean;
}

const initialState: DialogState = {
  opened: false,
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openDialog: (state) => {
      state.opened = true;
    },
    closeDialog: (state) => {
      state.opened = false;
    },
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;

export const selectDialog = (state: RootState) => state.dialog.opened;

export default dialogSlice.reducer;
