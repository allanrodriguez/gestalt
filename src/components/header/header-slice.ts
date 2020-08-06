import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../state";

interface HeaderState {
  isCropButtonEnabled: boolean;
}

const initialState: HeaderState = {
  isCropButtonEnabled: false,
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    disableCropButton: (state) => {
      state.isCropButtonEnabled = false;
    },
    enableCropButton: (state) => {
      state.isCropButtonEnabled = true;
    },
  },
});

export function selectCropButtonEnabled(state: RootState): boolean {
  return state.header.isCropButtonEnabled;
}

export const { disableCropButton, enableCropButton } = headerSlice.actions;

export default headerSlice.reducer;
