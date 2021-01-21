import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../state";

interface LayoutState {
  isDrawerOpen: boolean;
}

const initialState: LayoutState = {
  isDrawerOpen: false,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
  },
});

export function selectDrawerOpen(state: RootState): boolean {
  return state.layout.isDrawerOpen;
}

export const { toggleDrawer } = layoutSlice.actions;

export default layoutSlice.reducer;
