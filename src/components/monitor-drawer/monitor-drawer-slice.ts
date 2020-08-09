import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../state";

interface MonitorDrawerState {
  isOpen: boolean;
}

const initialState: MonitorDrawerState = {
  isOpen: false,
};

const monitorDrawerSlice = createSlice({
  name: "monitor-drawer",
  initialState,
  reducers: {
    closeDrawer: (state) => {
      state.isOpen = false;
    },
    openDrawer: (state) => {
      state.isOpen = true;
    },
  },
});

export function selectDrawerOpen(state: RootState): boolean {
  return state.drawer.isOpen;
}

export const { closeDrawer, openDrawer } = monitorDrawerSlice.actions;

export default monitorDrawerSlice.reducer;
