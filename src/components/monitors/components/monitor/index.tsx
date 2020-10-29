import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import MonitorIcon from "../../../monitor-icon";
import {
  selectMonitor,
  selectSelectedId,
  removeMonitor,
} from "../../monitors-slice";
import { makeStyles } from "@material-ui/styles";

interface MonitorProps {
  id: string;
}

const useListItemStyles = makeStyles(
  () => ({
    selected: {},
    root: {
      "&$selected": {
        backgroundColor: "rgba(255, 255, 255, 0.08)",
      },
      "&$selected:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.04)",
      },
    },
  }),
  { name: "MuiListItem" }
);

export default function Monitor(props: MonitorProps): JSX.Element {
  const dispatch = useDispatch();
  const monitor = useSelector(selectMonitor(props.id));

  useListItemStyles();

  const onCloseButtonClick = () => dispatch(removeMonitor(props.id));

  const selectedMonitorId = useSelector(selectSelectedId);

  return (
    <ListItem button divider selected={props.id === selectedMonitorId}>
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
