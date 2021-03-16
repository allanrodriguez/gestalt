import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectImageUrl,
  selectZoomLevel,
  setImageUrl,
} from "./image-editor-slice";
import { getUploadedImage } from "../../store";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function ImageEditor() {
  const imageUrl = useSelector(selectImageUrl);
  const zoomLevel = useSelector(selectZoomLevel);
  const dispatch = useDispatch();
  const classes = useStyles();

  React.useEffect(() => {
    let imageLoaded = false;

    getUploadedImage().then((image) => {
      dispatch(setImageUrl(URL.createObjectURL(image)));
      imageLoaded = true;
    });

    return () => {
      if (!imageLoaded) return;
      URL.revokeObjectURL(imageUrl);
      dispatch(setImageUrl(null));
    };
  }, []);

  return (
    <div className={classes.container}>
      <div>
        <img
          style={{
            border: "1px solid black",
            display: "block",
            transform: `scale(${zoomLevel})`,
          }}
          src={imageUrl}
        />
      </div>
    </div>
  );
}
