import React from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Close from "@material-ui/icons/Close";
import MonitorIcon from "../../../monitor-icon";
import {
  removeMonitor,
  selectMonitor,
  selectSelectedId,
  setSelectedId,
} from "../../monitors-slice";

interface MonitorProps {
  id: string;
}

export default function Monitor(props: MonitorProps): JSX.Element {
  const dispatch = useDispatch();
  const monitor = useSelector(selectMonitor(props.id));

  const selectedMonitorId = useSelector(selectSelectedId);

  const onCloseButtonClick = () => dispatch(removeMonitor(props.id));

  const onListItemClick = () => {
    if (props.id !== selectedMonitorId) dispatch(setSelectedId(props.id));
  };

  return (
    <ListItem
      button
      divider
      onClick={onListItemClick}
      selected={props.id === selectedMonitorId}
    >
      <ListItemIcon>
        <MonitorIcon width={40} monitor={monitor} />
      </ListItemIcon>

      <ListItemText>
        {monitor.diagonalInches}"
        <br />
        {monitor.widthPixels} × {monitor.heightPixels}
      </ListItemText>

      <ListItemSecondaryAction>
        <IconButton color="inherit" size="small" onClick={onCloseButtonClick}>
          <Close fontSize="small" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
