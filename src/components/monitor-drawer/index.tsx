import Divider from "@material-ui/core/Divider";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Add } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { drawerWidth } from "../../common/constants";
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
    backgroundColor: theme.palette.primary.main,
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
    maxWidth: drawerWidth,
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
    </>
  );
}
