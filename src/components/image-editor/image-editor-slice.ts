import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../state";

interface ImageEditorState {
  isUploaded: boolean;
  url: string;
  zoomLevel: number;
}

const initialState: ImageEditorState = {
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
      state.zoomLevel = 1;
    },
    setImageUrl(state: ImageEditorState, action: PayloadAction<string>) {
      state.url = action.payload;
    },
    setZoomLevel(state: ImageEditorState, action: PayloadAction<number>) {
      state.zoomLevel = action.payload;
    },
  },
});

export function selectImageUploaded(state: RootState) {
  return state.imageEditor.isUploaded;
}

export function selectImageUrl(state: RootState) {
  return state.imageEditor.url;
}

export function selectZoomLevel(state: RootState) {
  return state.imageEditor.zoomLevel;
}

export const { setImageUploaded, setImageUrl, setZoomLevel } = slice.actions;

export default slice.reducer;
