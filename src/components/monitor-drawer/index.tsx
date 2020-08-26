import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Drawer, Fab, Typography, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { closeDrawer, selectDrawerOpen } from "./monitor-drawer-slice";
import Monitors from "../monitors";
import { addMonitor } from "../monitors/monitors-slice";

interface MonitorDrawerProps {
  children?: React.ReactNode;
}

const useStyles = makeStyles((theme) => ({
  addButton: {
    minHeight: 32,
    position: "absolute",
    width: 32,
    height: 32,
    bottom: -theme.spacing(2),
    left: theme.spacing(2),
  },
  drawer: {
    backgroundColor: theme.palette.secondary.main,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    minHeight: 0,
    width: 320,
  },
  header: {
    alignItems: "center",
    display: "flex",
    minHeight: 64,
    position: "relative",
  },
  headerText: {
    marginLeft: theme.spacing(8),
  },
  list: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    maxWidth: 320,
    minHeight: 0,
    overflow: "auto",
  },
}));

export default function MonitorDrawer(props: MonitorDrawerProps): JSX.Element {
  const dispatch = useDispatch();
  const classes = useStyles();
  const isDrawerOpen = useSelector(selectDrawerOpen);

  const onDrawerClose = () => dispatch(closeDrawer());
  const onFabClick = () => dispatch(addMonitor());

  return (
    <Drawer open={isDrawerOpen} onClose={onDrawerClose}>
      <div className={classes.drawer} role="presentation">
        <div className={classes.header}>
          <Typography className={classes.headerText} variant="h6">
            Monitors
          </Typography>

          <Fab className={classes.addButton} size="small" onClick={onFabClick}>
            <Add />
          </Fab>
        </div>
        <div className={classes.list}>
          <Monitors />
        </div>
      </div>
    </Drawer>
  );
}
