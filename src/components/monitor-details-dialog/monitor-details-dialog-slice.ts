import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../state";

interface MonitorDetailsDialogState {
  isOpen: boolean;
  type: "add" | "update";
}

const initialState: MonitorDetailsDialogState = {
  isOpen: false,
  type: null,
};

const slice = createSlice({
  name: "monitor-details-dialog",
  initialState,
  reducers: {
    closeDialog(state: MonitorDetailsDialogState) {
      state.isOpen = false;
    },
    openDialog(
      state: MonitorDetailsDialogState,
      action: PayloadAction<"add" | "update">
    ) {
      state.isOpen = true;
      state.type = action.payload;
    },
  },
});

export function selectDialogOpen(state: RootState): boolean {
  return state.detailsDialog.isOpen;
}

export function selectDialogType(state: RootState): "add" | "update" {
  return state.detailsDialog.type;
}

export const { closeDialog, openDialog } = slice.actions;

export default slice.reducer;
