import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Monitor } from "../../common/models";
import { RootState } from "../../state";

export enum DialogType {
  Add,
  Update,
}

interface InputErrors {
  diagonal: boolean;
  height: boolean;
  width: boolean;
}

interface MonitorDetailsDialogState {
  errors: InputErrors;
  isOpen: boolean;
  monitor: Monitor;
  type: DialogType;
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
  type: DialogType.Add,
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
      action: PayloadAction<DialogType>
    ) {
      state.isOpen = true;
      state.errors = initialState.errors;
      state.monitor = initialState.monitor;
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
    },
  },
});

export function selectDialogOpen(state: RootState): boolean {
  return state.detailsDialog.isOpen;
}

export function selectDialogType(state: RootState): DialogType {
  return state.detailsDialog.type;
}

export function selectDiagonalError(state: RootState): boolean {
  return state.detailsDialog.errors.diagonal;
}

export function selectHeightError(state: RootState): boolean {
  return state.detailsDialog.errors.height;
}

export function selectWidthError(state: RootState): boolean {
  return state.detailsDialog.errors.width;
}

export function selectDiagonal(state: RootState): number {
  return state.detailsDialog.monitor.diagonalInches;
}

export function selectHeight(state: RootState): number {
  return state.detailsDialog.monitor.heightPixels;
}

export function selectWidth(state: RootState): number {
  return state.detailsDialog.monitor.widthPixels;
}

export const {
  closeDialog,
  openDialog,
  setDiagonalInches,
  setDiagonalError,
  setHeightError,
  setHeightPixels,
  setWidthError,
  setWidthPixels,
} = slice.actions;

export default slice.reducer;
