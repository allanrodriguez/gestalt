import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Close from "@material-ui/icons/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  DialogType,
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
import { addMonitor } from "../monitors/monitors-slice";

interface Monitor {
  diagonalInches: number;
  heightPixels: number;
  widthPixels: number;
}

interface Errors {
  diagonal: boolean;
  height: boolean;
  width: boolean;
}

const useStyles = makeStyles(() => ({
  allDimensionsContainer: {
    display: "flex",
    flexDirection: "column",
    width: "15rem",
  },
  dialog: {
    backgroundColor: "#263238",
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

const diagonalRegExp = /^[1-9]\d{0,2}$/;
const dimensionRegExp = /^[1-9]\d{0,4}$/;

function isNumberOrWhitespace(value: string, regExp: RegExp) {
  return value === "" || regExp.test(value);
}

function isSubmitButtonDisabled(monitor: Monitor, errors: Errors): boolean {
  return (
    errors.diagonal ||
    errors.height ||
    errors.width ||
    monitor.diagonalInches <= 0 ||
    monitor.heightPixels <= 0 ||
    monitor.widthPixels <= 0
  );
}

export default function MonitorDetailsDialog(): JSX.Element {
  const dispatch = useDispatch();
  const classes = useStyles();
  const isOpen = useSelector(selectDialogOpen);
  const type = useSelector(selectDialogType);
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

  const onDiagonalInputChange = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;

    if (errors.diagonal === isNumberOrWhitespace(target.value, diagonalRegExp))
      dispatch(setDiagonalError(!errors.diagonal));
  };

  const onDiagonalInputBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!isNumberOrWhitespace(e.target.value, diagonalRegExp)) return;

    const newDiagonal = parseInt(e.target.value, 10);

    if (newDiagonal === monitor.diagonalInches) return;

    dispatch(setDiagonalInches(Number.isNaN(newDiagonal) ? 0 : newDiagonal));
  };

  const onHeightInputChange = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;

    if (errors.height === isNumberOrWhitespace(target.value, dimensionRegExp))
      dispatch(setHeightError(!errors.height));
  };

  const onHeightInputBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!isNumberOrWhitespace(e.target.value, dimensionRegExp)) return;

    const newHeight = parseInt(e.target.value, 10);

    if (newHeight === monitor.heightPixels) return;

    dispatch(setHeightPixels(Number.isNaN(newHeight) ? 0 : newHeight));
  };

  const onWidthInputChange = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;

    if (errors.width === isNumberOrWhitespace(target.value, dimensionRegExp))
      dispatch(setWidthError(!errors.width));
  };

  const onWidthInputBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!isNumberOrWhitespace(e.target.value, dimensionRegExp)) return;

    const newWidth = parseInt(e.target.value, 10);

    if (newWidth === monitor.widthPixels) return;

    dispatch(setWidthPixels(Number.isNaN(newWidth) ? 0 : newWidth));
  };

  const onSubmit = () => {
    dispatch(closeDialog());
    dispatch(addMonitor(monitor));
  };

  return (
    <Dialog classes={{ paper: classes.dialog }} open={isOpen} onClose={onClose}>
      <DialogTitle>{`${DialogType[type]} monitor`}</DialogTitle>
      <DialogContent dividers>
        <DialogContentText component="span">
          <div className={classes.monitorIcon}>
            <MonitorIcon width={160} monitor={monitor} />
          </div>
        </DialogContentText>
        <div className={classes.allDimensionsContainer}>
          <TextField
            id="diagonal"
            autoFocus
            label="Diagonal width"
            fullWidth
            InputProps={{
              endAdornment: <InputAdornment position="end">in</InputAdornment>,
            }}
            error={errors.diagonal}
            onBlur={onDiagonalInputBlur}
            onInput={onDiagonalInputChange}
          />
          <div className={classes.pixelDimensionsContainer}>
            <TextField
              id="width"
              margin="dense"
              label="Width"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">px</InputAdornment>
                ),
              }}
              error={errors.width}
              onBlur={onWidthInputBlur}
              onInput={onWidthInputChange}
            />
            <Close className={classes.x} />
            <TextField
              id="height"
              margin="dense"
              label="Height"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">px</InputAdornment>
                ),
              }}
              error={errors.height}
              onBlur={onHeightInputBlur}
              onInput={onHeightInputChange}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={onSubmit}
          disabled={isSubmitButtonDisabled(monitor, errors)}
        >
          {DialogType[type]}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
