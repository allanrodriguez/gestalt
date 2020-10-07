import React, { FocusEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import MonitorIcon from "../../../monitor-icon";
import {
  selectMonitor,
  removeMonitor,
  setMonitorWidth,
  setMonitorHeight,
} from "../../monitors-slice";
import { makeStyles } from "@material-ui/styles";

interface MonitorProps {
  id: string;
}

const useStyles = makeStyles(() => ({
  title: {
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

export default function Monitor(props: MonitorProps): JSX.Element {
  const dispatch = useDispatch();
  const monitor = useSelector(selectMonitor(props.id));
  const classes = useStyles();

  const onCloseButtonClick = () => dispatch(removeMonitor(props.id));
  const onWidthChange = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    dispatch(
      setMonitorWidth({
        id: props.id,
        widthPixels: parseInt(e.target.value),
      })
    );
  const onHeightChange = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    dispatch(
      setMonitorHeight({
        id: props.id,
        heightPixels: parseInt(e.target.value),
      })
    );

  return (
    <ListItem divider>
      <ListItemIcon>
        <MonitorIcon width={40} monitor={monitor} />
      </ListItemIcon>

      <ListItemText
        primary={<Typography className={classes.title}>{props.id}</Typography>}
        secondary={`${monitor.diagonalInches}", ${monitor.widthPixels} × ${monitor.heightPixels}`}
      />

      <ListItemSecondaryAction>
        <IconButton color="inherit" size="small" onClick={onCloseButtonClick}>
          <Close fontSize="small" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
