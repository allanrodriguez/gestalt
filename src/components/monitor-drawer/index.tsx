import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Drawer, makeStyles } from "@material-ui/core";
import { closeDrawer, selectDrawerOpen } from "./monitor-drawer-slice";

interface MonitorDrawerProps {
  children?: React.ReactNode;
}

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 256,
    backgroundColor: theme.palette.secondary.main,
    height: "100%",
  },
}));

export default function MonitorDrawer(props: MonitorDrawerProps): JSX.Element {
  const dispatch = useDispatch();
  const classes = useStyles();
  const isDrawerOpen = useSelector(selectDrawerOpen);

  const onDrawerClose = () => dispatch(closeDrawer());

  return (
    <Drawer open={isDrawerOpen} onClose={onDrawerClose}>
      <div className={classes.drawer} role="presentation">
        {props.children}
      </div>
    </Drawer>
  );
}
