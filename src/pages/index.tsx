import React from "react";
import Layout from "../components/layout";
import "../global.css";
import MonitorDrawer from "../components/monitor-drawer";
import Upload from "../components/upload";

export default function Home(): JSX.Element {
  return (
    <Layout drawer={<MonitorDrawer />}>
      <Upload />
    </Layout>
  );
}
