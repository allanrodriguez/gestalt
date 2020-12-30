import MuiDrawer from "@material-ui/core/Drawer";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import { useSelector } from "react-redux";
import { selectDrawerOpen } from "../../layout-slice";

interface DrawerProps {
  children: React.ReactNode;
  width: number;
}

const useStyles = makeStyles<Theme, DrawerProps>(() => ({
  drawer: {
    flexShrink: 0,
    width: (props) => props.width,
  },
  drawerPaper: {
    width: (props) => props.width,
  },
}));

export default function Drawer(props: DrawerProps): JSX.Element {
  const classes = useStyles(props);
  const isDrawerOpen = useSelector(selectDrawerOpen);

  return (
    <MuiDrawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={isDrawerOpen}
      classes={{ paper: classes.drawerPaper }}
    >
      {props.children}
    </MuiDrawer>
  );
}
