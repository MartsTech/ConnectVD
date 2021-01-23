import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface DropdownState {
  activeMenu: "main" | "status" | "notifications" | "request";
  menuHeight: string;
}

const initialState: DropdownState = {
  activeMenu: "main",
  menuHeight: "",
};

export const dropdownSlice = createSlice({
  name: "dropdown",
  initialState,
  reducers: {
    openMenu: (
      state,
      action: { payload: "main" | "status" | "notifications" | "request" }
    ) => {
      state.activeMenu = action.payload;
    },
    setMenuHeight: (state, action: { payload: string }) => {
      state.menuHeight = action.payload;
    },
  },
});

export const { openMenu, setMenuHeight } = dropdownSlice.actions;

export const selectActiveMenu = (state: RootState) => state.dropdown.activeMenu;
export const selectMenuHeight = (state: RootState) => state.dropdown.menuHeight;

export default dropdownSlice.reducer;
