import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface SidebarState {
  opened: boolean;
}

const initialState: SidebarState = {
  opened: true,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.opened = true;
    },
    closeSidebar: (state) => {
      state.opened = false;
    },
  },
});

export const { openSidebar, closeSidebar } = sidebarSlice.actions;

export const selectSidebar = (state: RootState) => state.sidebar.opened;

export default sidebarSlice.reducer;
