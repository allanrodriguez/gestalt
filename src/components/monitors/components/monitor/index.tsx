import React, { FocusEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
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

const useStyles = makeStyles(theme => ({
  formContainer: {
    display: "grid",
    gridGap: "4px",
  },
  width: {
    gridRow: "1",
    gridColumn: "1",
  },
  height: {
    gridRow: "1",
    gridColumn: "3",
  },
  x: {
    gridRow: "1",
    gridColumn: "2",
    alignSelf: "end",
  },
  diagonal: {
    gridRow: "2",
    gridColumn: "1 / 4"
  },
  pixels: {
    gridRow: "1",
    gridColumn: "4",
    alignSelf: "end",
    paddingBottom: "5px",
  },
  inches: {
    gridRow: "2",
    gridColumn: "4",
    paddingBottom: "5px",
    alignSelf: "end",
  }
}))

export default function Monitor(props: MonitorProps): JSX.Element {
  const dispatch = useDispatch();
  const monitor = useSelector(selectMonitor(props.id));
  const classes = useStyles()

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

      <ListItemText>
        <div className={classes.formContainer}>
          <TextField
            className={classes.width}
            label="Width"
            size="small"
            onBlur={onWidthChange}
          />
          <div className={classes.x}>
            <Close fontSize="small" />
          </div>
          <TextField
            className={classes.height}
            label="Height"
            size="small"
            onBlur={onHeightChange}
          />
          <span className={classes.pixels}>pixels</span>
          <TextField
            className={classes.diagonal}
            label="Diagonal"
            size="small"
          />
          <span className={classes.inches}>inches</span>
        </div>
      </ListItemText>

      <ListItemSecondaryAction>
        <IconButton color="inherit" size="small" onClick={onCloseButtonClick}>
          <Close fontSize="small" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
