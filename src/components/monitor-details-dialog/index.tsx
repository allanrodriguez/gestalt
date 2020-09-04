import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  closeDialog,
  selectDialogOpen,
  selectDialogType,
} from "./monitor-details-dialog-slice";
import MonitorIcon from "../monitors/components/monitor-icon";

const useStyles = makeStyles((theme) => ({
  dialog: {
    backgroundColor: theme.palette.secondary.main,
  },
  pixelDimensionsContainer: {
    display: "flex",
  },
  x: {
    alignSelf: "end",
    marginBottom: 9,
    marginLeft: 9,
    marginRight: 9,
  },
}));

function getTitleAction(type: "add" | "update"): string {
  if (type === "add") return "Add";

  if (type === "update") return "Update";

  return null;
}

export default function MonitorDetailsDialog(): JSX.Element {
  const dispatch = useDispatch();
  const classes = useStyles();
  const isOpen = useSelector(selectDialogOpen);
  const type = getTitleAction(useSelector(selectDialogType));

  const onClose = () => dispatch(closeDialog());

  return (
    <Dialog classes={{ paper: classes.dialog }} open={isOpen} onClose={onClose}>
      <DialogTitle>{`${type} monitor`}</DialogTitle>
      <DialogContent>
        <DialogContentText>{/* <MonitorIcon /> */}</DialogContentText>
        <TextField
          autoFocus
          label="Diagonal width"
          fullWidth
          InputProps={{
            endAdornment: <InputAdornment position="end">in</InputAdornment>,
          }}
        />
        <div className={classes.pixelDimensionsContainer}>
          <TextField
            margin="dense"
            label="Width"
            fullWidth
            InputProps={{
              endAdornment: <InputAdornment position="end">px</InputAdornment>,
            }}
          />
          <Close className={classes.x} />
          <TextField
            margin="dense"
            label="Height"
            fullWidth
            InputProps={{
              endAdornment: <InputAdornment position="end">px</InputAdornment>,
            }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button color="primary">Cancel</Button>
        <Button color="primary">{type}</Button>
      </DialogActions>
    </Dialog>
  );
}
