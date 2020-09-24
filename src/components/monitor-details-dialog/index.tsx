import React, { FocusEvent } from "react";
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
  selectDiagonal,
  selectDiagonalError,
  selectDialogOpen,
  selectDialogType,
  selectHeight,
  selectHeightError,
  selectWidth,
  selectWidthError,
  setDiagonalInches,
  setDiagonalError,
  setHeightError,
  setHeightPixels,
  setWidthError,
  setWidthPixels,
} from "./monitor-details-dialog-slice";
import MonitorIcon from "../monitor-icon";

const useStyles = makeStyles((theme) => ({
  dialog: {
    backgroundColor: theme.palette.secondary.main,
  },
  allDimensionsContainer: {
    display: "flex",
    flexDirection: "column",
    width: "15rem",
  },
  monitorIcon: {
    display: "flex",
    justifyContent: "center",
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
  const errors = {
    diagonal: useSelector(selectDiagonalError),
    height: useSelector(selectHeightError),
    width: useSelector(selectWidthError),
  };
  const monitor = {
    diagonalInches: useSelector(selectDiagonal),
    heightPixels: useSelector(selectHeight),
    widthPixels: useSelector(selectWidth),
  };

  const onClose = () => dispatch(closeDialog());

  const onDiagonalChange = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const matches = /^[1-9]\d{0,2}$/.exec(e.target.value);
    const isNumberOrWhitespace = matches?.length === 1;

    if (errors.diagonal === isNumberOrWhitespace)
      dispatch(setDiagonalError(!isNumberOrWhitespace));

    if (!isNumberOrWhitespace) return;

    const newDiagonal = parseInt(matches[0], 10);

    if (!Number.isNaN(newDiagonal) && newDiagonal !== monitor.diagonalInches)
      dispatch(setDiagonalInches(newDiagonal));
  };

  const onHeightDimensionChange = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const matches = /^[1-9]\d{0,4}$/.exec(e.target.value);
    const isNumberOrWhitespace = matches?.length === 1;

    if (errors.height === isNumberOrWhitespace)
      dispatch(setHeightError(!isNumberOrWhitespace));

    if (!isNumberOrWhitespace) return;

    const newHeight = parseInt(matches[0], 10);

    if (!Number.isNaN(newHeight) && newHeight !== monitor.heightPixels)
      dispatch(setHeightPixels(newHeight));
  };

  const onWidthDimensionChange = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const matches = /^[1-9]\d{0,4}$/.exec(e.target.value);
    const isNumberOrWhitespace = matches?.length === 1;

    if (errors.width === isNumberOrWhitespace)
      dispatch(setWidthError(!isNumberOrWhitespace));

    if (!isNumberOrWhitespace) return;

    const newWidth = parseInt(matches[0], 10);

    if (!Number.isNaN(newWidth) && newWidth !== monitor.widthPixels)
      dispatch(setWidthPixels(newWidth));
  };

  return (
    <Dialog classes={{ paper: classes.dialog }} open={isOpen} onClose={onClose}>
      <DialogTitle>{`${type} monitor`}</DialogTitle>
      <DialogContent>
        <DialogContentText component="span">
          <div className={classes.monitorIcon}>
            <MonitorIcon width={160} monitor={monitor} />
          </div>
        </DialogContentText>
        <div className={classes.allDimensionsContainer}>
          <TextField
            autoFocus
            label="Diagonal width"
            fullWidth
            InputProps={{
              endAdornment: <InputAdornment position="end">in</InputAdornment>,
            }}
            error={errors.diagonal}
            onBlur={onDiagonalChange}
          />
          <div className={classes.pixelDimensionsContainer}>
            <TextField
              margin="dense"
              label="Width"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">px</InputAdornment>
                ),
              }}
              error={errors.width}
              onBlur={onWidthDimensionChange}
            />
            <Close className={classes.x} />
            <TextField
              margin="dense"
              label="Height"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">px</InputAdornment>
                ),
              }}
              error={errors.height}
              onBlur={onHeightDimensionChange}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary">{type}</Button>
      </DialogActions>
    </Dialog>
  );
}
