import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import MonitorIcon from "../monitor-icon";
import { selectMonitor, removeMonitor } from "../../monitors-slice";

interface MonitorProps {
  id: string;
}

const useStyles = makeStyles((theme) => ({
  diagonalContainer: {
    display: "flex",
    alignItems: "baseline",
    paddingTop: theme.spacing(1),
  },
  dimensionsContainer: {
    display: "flex",
    alignItems: "baseline",

    // transition
  },
}));

export default function Monitor(props: MonitorProps): JSX.Element {
  const classes = useStyles();
  const dispatch = useDispatch();
  const monitor = useSelector(selectMonitor(props.id));

  const onCloseButtonClick = () => dispatch(removeMonitor(props.id));

  return (
    <ListItem>
      <ListItemIcon>
        <MonitorIcon id={props.id} />
      </ListItemIcon>

      <ListItemText>
        Resolution (pixels)
        <div className={classes.dimensionsContainer}>
          <TextField label="Width" size="small" />
          &nbsp;
          <Close fontSize="small" />
          &nbsp;
          <TextField label="Height" size="small" />
        </div>
        <div className={classes.diagonalContainer}>
          <TextField label="Diagonal" size="small" />
          &nbsp;in.
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
