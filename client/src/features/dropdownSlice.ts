import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface DropdownState {
  activeMenu: "main" | "status";
}

const initialState: DropdownState = {
  activeMenu: "main",
};

export const dropdownSlice = createSlice({
  name: "dropdown",
  initialState,
  reducers: {
    openMain: (state) => {
      state.activeMenu = "main";
    },
    openStatus: (state) => {
      state.activeMenu = "status";
    },
  },
});

export const { openMain, openStatus } = dropdownSlice.actions;

export const selectDropdown = (state: RootState) => state.dropdown.activeMenu;

export default dropdownSlice.reducer;
