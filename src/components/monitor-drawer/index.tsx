import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Drawer, Fab, Typography, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { closeDrawer, selectDrawerOpen } from "./monitor-drawer-slice";

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
    width: 256,
    backgroundColor: theme.palette.secondary.main,
    height: "100%",
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
    marginTop: theme.spacing(4),
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
        <div className={classes.header}>
          <Typography className={classes.headerText} variant="h6">
            Monitors
          </Typography>

          <Fab className={classes.addButton} size="small">
            <Add />
          </Fab>
        </div>
        <div className={classes.list}>Hello</div>
      </div>
    </Drawer>
  );
}
