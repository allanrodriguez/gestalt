import { Slider } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectImageUrl, setImageUrl } from "./image-editor-slice";
import { getUploadedImage } from "../../store";

export default function ImageEditor() {
  const imageUrl = useSelector(selectImageUrl);
  const dispatch = useDispatch();

  React.useEffect(() => {
    let imageLoaded = false;

    getUploadedImage().then((image) => {
      dispatch(setImageUrl(URL.createObjectURL(image)));
      imageLoaded = true;
    });

    return () => {
      if (!imageLoaded) return;
      URL.revokeObjectURL(imageUrl);
      setImageUrl(null);
    };
  }, []);

  const [scale, setScale] = useState(1);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "15rem",
          flexShrink: 0,
          zIndex: 1,
        }}
      >
        <Slider
          onChange={(e, v) => setScale(Array.isArray(v) ? v[0] : v)}
          min={0.33}
          max={4}
        ></Slider>
      </div>
      <div>
        <img
          style={{
            border: "1px solid black",
            display: "block",
            transform: `scale(${scale})`,
          }}
          src={imageUrl}
        />
      </div>
    </div>
  );
}
