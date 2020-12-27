import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Add } from "@material-ui/icons";
import Monitors from "../monitors";
import MonitorDetailsDialog from "../monitor-details-dialog";
import {
  DialogType,
  openDialog,
} from "../monitor-details-dialog/monitor-details-dialog-slice";
import { closeDrawer, selectDrawerOpen } from "./monitor-drawer-slice";

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
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    minHeight: 0,
    width: 260,
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
  const isDrawerOpen = useSelector(selectDrawerOpen);

  const onDrawerClose = () => dispatch(closeDrawer());
  const onFabClick = () => dispatch(openDialog(DialogType.Add));

  return (
    <Drawer open={isDrawerOpen} onClose={onDrawerClose}>
      <MonitorDetailsDialog />
      <div className={classes.drawer} role="presentation">
        <div className={classes.header}>
          <Typography className={classes.headerText} variant="h6">
            Monitors
          </Typography>

          <Fab
            className={classes.addButton}
            color="secondary"
            size="small"
            onClick={onFabClick}
          >
            <Add />
          </Fab>
        </div>
        <Divider />
        <div className={classes.list}>
          <Monitors />
        </div>
      </div>
    </Drawer>
  );
}
