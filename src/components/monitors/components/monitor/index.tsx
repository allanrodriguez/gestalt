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
import MonitorIcon from "../monitor-icon";
import {
  selectMonitor,
  removeMonitor,
  setMonitorWidth,
  setMonitorHeight,
} from "../../monitors-slice";
import styles from "./monitor.module.css";

interface MonitorProps {
  id: string;
}

export default function Monitor(props: MonitorProps): JSX.Element {
  const dispatch = useDispatch();
  const monitor = useSelector(selectMonitor(props.id));

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
        <MonitorIcon id={props.id} />
      </ListItemIcon>

      <ListItemText>
        <div className={styles.formContainer}>
          <TextField
            className={styles.width}
            label="Width"
            size="small"
            onBlur={onWidthChange}
          />
          <div className={styles.x}>
            <Close fontSize="small" />
          </div>
          <TextField
            className={styles.height}
            label="Height"
            size="small"
            onBlur={onHeightChange}
          />
          <span className={styles.pixels}>pixels</span>
          <TextField
            className={styles.diagonal}
            label="Diagonal"
            size="small"
          />
          <span className={styles.inches}>inches</span>
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
