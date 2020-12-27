import React from "react";
import { useSelector } from "react-redux";
import Layout from "../components/layout";
import ImageEditor from "../components/image-editor";
import { selectImageUploaded } from "../components/image-editor/image-slice";
import MonitorDrawer from "../components/monitor-drawer";
import Upload from "../components/upload";
import "../global.css";

export default function Home(): JSX.Element {
  const isImageUploaded = useSelector(selectImageUploaded);

  return (
    <Layout drawer={<MonitorDrawer />}>
      {isImageUploaded ? <ImageEditor /> : <Upload />}
    </Layout>
  );
}
