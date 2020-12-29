import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { makeStyles } from "@material-ui/core";
import Header from "../header";
import MonitorDrawer from "../monitor-drawer";
import {
  selectDrawerOpen,
  toggleDrawer,
} from "../monitor-drawer/monitor-drawer-slice";

interface LayoutProps {
  children?: React.ReactNode;
}

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

export default function Layout(props: LayoutProps): JSX.Element {
  const isDrawerOpen = useSelector(selectDrawerOpen);
  const dispatch = useDispatch();
  const classes = useStyles();

  const onMenuButtonClick = () => dispatch(toggleDrawer());

  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <div className={classes.root}>
        <Header
          drawerOpen={isDrawerOpen}
          drawerWidth={drawerWidth}
          onMenuButtonClick={onMenuButtonClick}
        />
        <MonitorDrawer width={drawerWidth} />
        <main>{props.children}</main>
      </div>
    </>
  );
}
