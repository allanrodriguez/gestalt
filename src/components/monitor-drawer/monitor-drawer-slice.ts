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
    toggleDrawer: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export function selectDrawerOpen(state: RootState): boolean {
  return state.drawer.isOpen;
}

export const { toggleDrawer } = monitorDrawerSlice.actions;

export default monitorDrawerSlice.reducer;
