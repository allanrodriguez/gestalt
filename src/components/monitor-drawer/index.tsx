import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Drawer,
  Fab,
  Theme,
  ThemeProvider,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Monitors from "../monitors";
import MonitorDetailsDialog from "../monitor-details-dialog";
import {
  DialogType,
  openDialog,
} from "../monitor-details-dialog/monitor-details-dialog-slice";
import { selectDrawerOpen } from "./monitor-drawer-slice";
import { darkTheme } from "../../theme";

export interface MonitorDrawerProps {
  width: number;
}

const useStyles = makeStyles<Theme, MonitorDrawerProps>((theme) => ({
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
    width: (props) => props.width,
  },
  drawerPaper: {
    top: "unset",
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

export default function MonitorDrawer(props: MonitorDrawerProps): JSX.Element {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const isDrawerOpen = useSelector(selectDrawerOpen);

  const onFabClick = () => dispatch(openDialog(DialogType.Add));

  return (
    <ThemeProvider theme={darkTheme}>
      <Drawer
        variant="persistent"
        open={isDrawerOpen}
        classes={{ paper: classes.drawerPaper }}
      >
        <MonitorDetailsDialog />
        <div className={classes.drawer} role="presentation">
          <div className={classes.header}>
            <Typography className={classes.headerText} variant="h6">
              Monitors
            </Typography>

            <Fab
              className={classes.addButton}
              size="small"
              onClick={onFabClick}
            >
              <Add />
            </Fab>
          </div>
          <div className={classes.list}>
            <Monitors />
          </div>
        </div>
      </Drawer>
    </ThemeProvider>
  );
}
