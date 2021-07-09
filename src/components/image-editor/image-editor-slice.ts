import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../state";

interface ImageEditorState {
  initialWidthPx: number;
  isUploaded: boolean;
  url: string;
  zoomLevel: number;
}

const initialState: ImageEditorState = {
  initialWidthPx: 0,
  isUploaded: false,
  url: null,
  zoomLevel: 1,
};

const slice = createSlice({
  name: "image-editor",
  initialState,
  reducers: {
    setImageUploaded(state: ImageEditorState, action: PayloadAction<boolean>) {
      state.isUploaded = action.payload;
      state.initialWidthPx = 0;
      state.url = null;
      state.zoomLevel = 1;
    },
    setImageUrl(state: ImageEditorState, action: PayloadAction<string>) {
      state.url = action.payload;
    },
    setImageWidth(state: ImageEditorState, action: PayloadAction<number>) {
      state.initialWidthPx = action.payload;
    },
    setZoomLevel(state: ImageEditorState, action: PayloadAction<number>) {
      state.zoomLevel = action.payload;
    },
  },
});

export function selectImageUploaded(state: RootState): boolean {
  return state.imageEditor.isUploaded;
}

export function selectImageUrl(state: RootState): string {
  return state.imageEditor.url;
}

export function selectImageWidth(state: RootState): number {
  return state.imageEditor.initialWidthPx;
}

export function selectZoomLevel(state: RootState): number {
  return state.imageEditor.zoomLevel;
}

export const { setImageUploaded, setImageUrl, setImageWidth, setZoomLevel } =
  slice.actions;

export default slice.reducer;
