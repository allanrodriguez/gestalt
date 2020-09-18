import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Monitor } from "../../common/models";
import { RootState } from "../../state";

interface InputErrors {
  diagonal: boolean;
  height: boolean;
  width: boolean;
}

interface MonitorDetailsDialogState {
  errors: InputErrors;
  isOpen: boolean;
  monitor: Monitor;
  type: "add" | "update";
}

const initialState: MonitorDetailsDialogState = {
  errors: {
    diagonal: false,
    height: false,
    width: false,
  },
  isOpen: false,
  monitor: {
    diagonalInches: 0,
    heightPixels: 0,
    widthPixels: 0,
  },
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
    setDiagonalInches(
      state: MonitorDetailsDialogState,
      action: PayloadAction<number>
    ) {
      state.monitor.diagonalInches = action.payload;
    },
    setHeightPixels(
      state: MonitorDetailsDialogState,
      action: PayloadAction<number>
    ) {
      state.monitor.heightPixels = action.payload;
    },
    setWidthPixels(
      state: MonitorDetailsDialogState,
      action: PayloadAction<number>
    ) {
      state.monitor.widthPixels = action.payload;
    },
    setDiagonalError(
      state: MonitorDetailsDialogState,
      action: PayloadAction<boolean>
    ) {
      state.errors.diagonal = action.payload;
    },
    setHeightError(
      state: MonitorDetailsDialogState,
      action: PayloadAction<boolean>
    ) {
      state.errors.height = action.payload;
    },
    setWidthError(
      state: MonitorDetailsDialogState,
      action: PayloadAction<boolean>
    ) {
      state.errors.width = action.payload;
    }
  },
});

export function selectDialogOpen(state: RootState): boolean {
  return state.detailsDialog.isOpen;
}

export function selectDialogType(state: RootState): "add" | "update" {
  return state.detailsDialog.type;
}

export function selectErrors(state: RootState): InputErrors {
  return state.detailsDialog.errors
}

export const { closeDialog, openDialog, setDiagonalError } = slice.actions;

export default slice.reducer;
