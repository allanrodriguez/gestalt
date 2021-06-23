import { Theme } from "@material-ui/core/styles/createMuiTheme";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectImageUrl,
  selectImageWidth,
  selectZoomLevel,
  setImageUrl,
  setImageWidth,
} from "./image-editor-slice";
import { uploadedImageMargin } from "../../common/constants";
import { getUploadedImage } from "../../store";

interface StyleProps {
  initialWidth: number;
  zoomLevel: number;
}

const useStyles = makeStyles<Theme, StyleProps>(() => ({
  container: {
    display: "inline-block",
    marginLeft: `${uploadedImageMargin}%`,
    marginRight: `${uploadedImageMargin}%`,
    height: "100%",
    "&::before, &::after": {
      display: "block",
      content: `""`,
      height: `${uploadedImageMargin}%`,
    },
  },
  image: {
    border: "1px solid black",
    display: "block",
    width: (props) => {
      const newWidth = props.initialWidth * props.zoomLevel;
      return newWidth > 0 ? newWidth : undefined;
    },
  },
}));

export default function ImageEditor() {
  const imageUrl = useSelector(selectImageUrl);
  const initialWidth = useSelector(selectImageWidth);
  const zoomLevel = useSelector(selectZoomLevel);
  const dispatch = useDispatch();
  const classes = useStyles({ initialWidth, zoomLevel });

  React.useEffect(() => {
    getUploadedImage().then((image) => {
      dispatch(setImageUrl(URL.createObjectURL(image)));
    });

    return () => {
      if (!imageUrl) return;
      URL.revokeObjectURL(imageUrl);
    };
  }, []);

  return (
    <div className={classes.container}>
      <img
        className={classes.image}
        onLoad={(e) => {
          const img = e.target as HTMLImageElement;
          if (img) {
            console.log("loaded");
            dispatch(setImageWidth(img.width));
            console.log(img.width);
            img.scrollIntoView({
              block: "center",
              inline: "center",
            });
          }
        }}
        src={imageUrl}
      />
    </div>
  );
}
