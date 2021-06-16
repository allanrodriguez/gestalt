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
    gridRow: 2,
    gridColumn: 2,
  },
  drawer: {
    gridRowStart: 1,
    gridRowEnd: 3,
    gridColumn: 1,
    width: 0,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerShift: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    width: drawerWidth,
  },
  header: {
    gridRow: 1,
    gridColumn: 2,
  },
  root: {
    display: "grid",
    width: "100vw",
    height: "100vh",
    gridTemplateRows: "min-content auto",
    gridTemplateColumns: "minmax(0, min-content) auto",
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
        <div className={classes.header}>
          <Header drawer={props.drawer && true} drawerWidth={drawerWidth}>
            {props.menu}
          </Header>
        </div>
        {props.drawer && (
          <div
            className={clsx(classes.drawer, {
              [classes.drawerShift]: isDrawerOpen,
            })}
          >
            <Drawer width={drawerWidth} classes={props.classes?.drawer}>
              {props.drawer}
            </Drawer>
          </div>
        )}
        <main className={classes.content}>{props.children}</main>
      </div>
    </>
  );
}
