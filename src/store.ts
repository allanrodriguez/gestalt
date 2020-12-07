import localforage from "localforage";

const imageStore = localforage.createInstance({
  name: "gestalt",
  storeName: "images",
});

export async function getUploadedImage(): Promise<File> {
  try {
    return await imageStore.getItem<File>("uploaded_image");
  } catch (e) {
    console.error(e);
  }

  return null;
}

export async function setUploadedImage(file: File): Promise<boolean> {
  try {
    await imageStore.setItem("uploaded_image", file);
  } catch (e) {
    console.error(e);
    return false;
  }

  return true;
}
