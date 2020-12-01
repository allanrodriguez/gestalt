import { Theme } from "@material-ui/core/styles/createMuiTheme";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AddPhotoAlternateRounded from "@material-ui/icons/AddPhotoAlternateRounded";
import React from "react";
import { DropzoneRootProps, useDropzone } from "react-dropzone";

const useStyles = makeStyles<Theme, DropzoneRootProps>((theme) => {
  return {
    container: {
      height: "100%",
      padding: theme.spacing(3),
    },
    dropzone: {
      height: "100%",
      display: "flex",
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(2),
      borderWidth: 2,
      borderRadius: 2,
      borderColor: (props) => {
        if (props.isDragAccept) {
          return theme.palette.success.main;
        }

        if (props.isDragReject) {
          return theme.palette.error.main;
        }

        if (props.isFocused) {
          return theme.palette.text.primary;
        }

        return theme.palette.primary.dark;
      },
      borderStyle: "dashed",
      outline: "none",
      transition: "border .25s ease-in-out",
      cursor: "pointer",
    },
    uploadIcon: {
      fontSize: "5rem",
    },
  };
});

export default function Upload() {
  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
    isFocused,
  } = useDropzone({ accept: "image/*", maxFiles: 1 });
  const classes = useStyles({ isDragAccept, isDragReject, isFocused });

  return (
    <div className={classes.container}>
      <div {...getRootProps({ className: classes.dropzone })}>
        <input {...getInputProps()} />
        <h2>Drag and drop an image here, or click to select an image</h2>
        <AddPhotoAlternateRounded className={classes.uploadIcon} />
      </div>
    </div>
  );
}
