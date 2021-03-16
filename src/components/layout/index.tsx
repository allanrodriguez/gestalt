import { DrawerClassKey } from "@material-ui/core/Drawer/Drawer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { ClassNameMap } from "@material-ui/styles/withStyles/withStyles";
import clsx from "clsx";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import Drawer from "./components/drawer";
import Header from "./components/header";
import { selectDrawerOpen } from "./layout-slice";
import { drawerWidth } from "../../common/constants";

interface LayoutProps {
  children?: React.ReactNode;
  classes?: LayoutClassesProps;
  drawer?: React.ReactNode;
  menu?: React.ReactNode;
}

interface LayoutClassesProps {
  drawer?: Partial<ClassNameMap<DrawerClassKey>>;
}

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  headerBuffer: {
    ...theme.mixins.toolbar,
  },
  root: {
    display: "flex",
  },
}));

export default function Layout(props: LayoutProps): JSX.Element {
  const isDrawerOpen = useSelector(selectDrawerOpen);
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <div className={classes.root}>
        <Header drawer={props.drawer && true} drawerWidth={drawerWidth}>
          {props.menu}
        </Header>
        {props.drawer && (
          <Drawer width={drawerWidth} classes={props.classes?.drawer}>
            {props.drawer}
          </Drawer>
        )}
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: isDrawerOpen,
          })}
        >
          <div className={classes.headerBuffer} />
          {props.children}
        </main>
      </div>
    </>
  );
}
