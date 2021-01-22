import MuiDrawer, { DrawerClassKey } from "@material-ui/core/Drawer/Drawer";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { ClassNameMap } from "@material-ui/styles/withStyles/withStyles";
import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";
import { selectDrawerOpen } from "../../layout-slice";

interface DrawerProps {
  children?: React.ReactNode;
  classes?: Partial<ClassNameMap<DrawerClassKey>>;
  className?: string;
  width: number;
}

const useStyles = makeStyles<Theme, DrawerProps>(() => ({
  drawer: {
    width: (props) => `${props.width}px !important`,
  },
  drawerPaper: {
    width: (props) => `${props.width}px !important`,
  },
}));

export default function Drawer(props: DrawerProps): JSX.Element {
  const classes = useStyles({ width: props.width });
  const isDrawerOpen = useSelector(selectDrawerOpen);

  return (
    <MuiDrawer
      className={clsx(props.className, classes.drawer)}
      variant="persistent"
      anchor="left"
      open={isDrawerOpen}
      classes={{
        ...props.classes,
        paper: clsx(props.classes?.paper, classes.drawerPaper),
      }}
    >
      {props.children}
    </MuiDrawer>
  );
}
