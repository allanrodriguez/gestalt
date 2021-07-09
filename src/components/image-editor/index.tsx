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

const ImageEditor: React.FC = () => {
  const imageUrl = useSelector(selectImageUrl);
  const initialWidth = useSelector(selectImageWidth);
  const zoomLevel = useSelector(selectZoomLevel);
  const dispatch = useDispatch();
  const classes = useStyles({ initialWidth, zoomLevel });

  React.useEffect(() => {
    let effectImageUrl: string;

    getUploadedImage().then((image) => {
      effectImageUrl = URL.createObjectURL(image);
      dispatch(setImageUrl(effectImageUrl));
    });

    return () => {
      if (effectImageUrl) URL.revokeObjectURL(effectImageUrl);
    };
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <img
        alt=""
        className={classes.image}
        onLoad={(e) => {
          const img = e.target as HTMLImageElement;
          if (img) {
            dispatch(setImageWidth(img.width));
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
};

export default ImageEditor;
