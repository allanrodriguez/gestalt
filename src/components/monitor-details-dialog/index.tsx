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
  selectDialogOpen,
  selectDialogType,
  selectErrors,
  setDiagonalError,
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
  const errors = useSelector(selectErrors);

  const onClose = () => dispatch(closeDialog());

  const onDiagonalChange = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const isNumberOrWhitespace = /^[1-9]\d{0,2}$/.test(e.target.value);

    console.log(`[test] ${e.target.value} - ${isNumberOrWhitespace}`);

    dispatch(setDiagonalError(!isNumberOrWhitespace));
  };

  const onPixelDimensionChange = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const isNumberOrWhitespace = /^[1-9]\d{0,4}$/.test(e.target.value);

    dispatch(setDiagonalError(!isNumberOrWhitespace));
  };

  return (
    <Dialog classes={{ paper: classes.dialog }} open={isOpen} onClose={onClose}>
      <DialogTitle>{`${type} monitor`}</DialogTitle>
      <DialogContent>
        <DialogContentText component="span">
          <div className={classes.monitorIcon}>
            <MonitorIcon
              width={160}
              monitor={{ widthPixels: 0, heightPixels: 0, diagonalInches: 0 }}
            />
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
              onBlur={onPixelDimensionChange}
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
              onBlur={onPixelDimensionChange}
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
