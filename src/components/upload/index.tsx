import React from "react";
import { DropzoneRootProps, useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AddPhotoAlternateRounded from "@material-ui/icons/AddPhotoAlternateRounded";
import { setUploadedImage } from "../../store";
import { setImageUploaded } from "../image-editor/image-editor-slice";

const useStyles = makeStyles<Theme, DropzoneRootProps>((theme) => {
  return {
    container: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing(3),
    },
    dropzone: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      backgroundColor: theme.palette.primary.light,
      marginBottom: 64,
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
      marginBottom: "1rem",
    },
  };
});

const Upload: React.FC = () => {
  const dispatch = useDispatch();
  const { getRootProps, getInputProps, isDragAccept, isDragReject, isFocused } =
    useDropzone({
      accept: "image/*",
      maxFiles: 1,
      onDropAccepted: async (files) => {
        if (await setUploadedImage(files[0])) dispatch(setImageUploaded(true));
      },
    });
  const classes = useStyles({ isDragAccept, isDragReject, isFocused });

  return (
    <div className={classes.container}>
      <div {...getRootProps({ className: classes.dropzone })}>
        <input {...getInputProps()} />
        <h2>Drag and drop an image here, or click to select an image</h2>
        <AddPhotoAlternateRounded
          className={classes.uploadIcon}
          fontSize="large"
        />
      </div>
    </div>
  );
};

export default Upload;
