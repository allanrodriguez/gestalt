import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../state";

interface ImageEditorState {
  isUploaded: boolean;
  url: string;
}

const initialState: ImageEditorState = {
  isUploaded: false,
  url: null,
};

const slice = createSlice({
  name: "image-editor",
  initialState,
  reducers: {
    setImageUploaded(state: ImageEditorState, action: PayloadAction<boolean>) {
      state.isUploaded = action.payload;
    },
    setImageUrl(state: ImageEditorState, action: PayloadAction<string>) {
      state.url = action.payload;
    },
  },
});

export function selectImageUploaded(state: RootState) {
  return state.imageEditor.isUploaded;
}

export function selectImageUrl(state: RootState) {
  return state.imageEditor.url;
}

export const { setImageUploaded, setImageUrl } = slice.actions;

export default slice.reducer;
