import React from "react";
import Layout from "../components/layout";
import "../global.css";
import MonitorDrawer from "../components/monitor-drawer";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(() => ({
  layoutDrawer: {
    backgroundColor: "#263238",
    borderRight: "1px solid rgba(255, 255, 255, 0.12)",
  },
}));

export default function Home(): JSX.Element {
  const classes = useStyles();

  return (
    <Layout
      classes={{ drawer: { paper: classes.layoutDrawer } }}
      drawer={<MonitorDrawer />}
    >
      hello
    </Layout>
  );
}
