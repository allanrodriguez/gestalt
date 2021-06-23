import localforage from "localforage";
import { uploadedImageKey } from "./common/constants";

const imageStore = localforage.createInstance({
  name: "gestalt",
  storeName: "images",
});

export async function removeUploadedImage(): Promise<boolean> {
  try {
    await imageStore.removeItem(uploadedImageKey);
  } catch (e) {
    console.error(e);
    return false;
  }

  return true;
}

export async function getUploadedImage(): Promise<File> {
  try {
    return await imageStore.getItem<File>(uploadedImageKey);
  } catch (e) {
    console.error(e);
  }

  return null;
}

export async function setUploadedImage(file: File): Promise<boolean> {
  try {
    await imageStore.setItem(uploadedImageKey, file);
  } catch (e) {
    console.error(e);
    return false;
  }

  return true;
}
