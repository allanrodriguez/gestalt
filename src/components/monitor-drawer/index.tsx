import React from "react";
import { useDispatch } from "react-redux";
import { Fab, Theme, Typography, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Monitors from "../monitors";
import MonitorDetailsDialog from "../monitor-details-dialog";
import {
  DialogType,
  openDialog,
} from "../monitor-details-dialog/monitor-details-dialog-slice";

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
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    minHeight: 0,
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
    maxWidth: 260,
    minHeight: 0,
    overflow: "auto",
  },
}));

export default function MonitorDrawer(): JSX.Element {
  const dispatch = useDispatch();
  const classes = useStyles();

  const onFabClick = () => dispatch(openDialog(DialogType.Add));

  return (
    <>
      <MonitorDetailsDialog />
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
    </>
  );
}
