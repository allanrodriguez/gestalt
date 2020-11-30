import { Theme } from "@material-ui/core/styles/createMuiTheme";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import { DropzoneRootProps, useDropzone } from "react-dropzone";

const useStyles = makeStyles<Theme, DropzoneRootProps>((theme) => {
  return {
    container: {
      height: "100%",
      padding: theme.spacing(2),
    },
    dropzone: {
      height: "100%",
      display: "flex",
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      padding: theme.spacing(2),
      borderWidth: 2,
      borderRadius: 2,
      borderColor: (props) => {
        console.log(JSON.stringify(props, null, 2));
        if (props.isDragAccept) {
          return theme.palette.success.main;
        }

        if (props.isDragReject) {
          return theme.palette.error.main;
        }

        return theme.palette.primary.dark;
      },
      borderStyle: "dashed",
      outline: "none",
      transition: "border .25s ease-in-out",
    },
  };
});

export default function Upload() {
  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: "image/*" });
  const classes = useStyles({ isDragAccept, isDragReject });

  return (
    <div className={classes.container}>
      <div {...getRootProps({ className: classes.dropzone })}>
        <input {...getInputProps()} />
        Drag and drop an image here, or click to select an image...
      </div>
    </div>
  );
}
