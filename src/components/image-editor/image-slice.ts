import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../state";

interface ImageState {
  isUploaded: boolean;
  url: string;
}

const initialState: ImageState = {
  isUploaded: false,
  url: null,
};

const slice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImageUploaded(state: ImageState, action: PayloadAction<boolean>) {
      state.isUploaded = action.payload;
    },
    setImageUrl(state: ImageState, action: PayloadAction<string>) {
      state.url = action.payload;
    },
  },
});

export function selectImageUploaded(state: RootState) {
  return state.image.isUploaded;
}

export function selectImageUrl(state: RootState) {
  return state.image.url;
}

export const { setImageUploaded, setImageUrl } = slice.actions;

export default slice.reducer;
