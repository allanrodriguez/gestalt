import React from "react";
import { makeStyles, Theme } from "@material-ui/core";
import { Monitor } from "../../common/models";

interface MonitorIconProps {
  width: number;
  monitor: Monitor;
}

const useStyles = makeStyles<Theme, MonitorIconProps>((theme) => ({
  svg: {
    height: (props) => props.width,
    width: (props) => props.width,
  },
  base: {
    fill: "#3c474b",
  },
  border: {
    fill: "#536267",
  },
  neck: {
    fill: "#485559",
  },
  screen: {
    fill: "#007fff",
  },
}));

function calculatePpi(
  widthPixels: number,
  heightPixels: number,
  diagonalInches: number
): number {
  const angle = Math.atan(heightPixels / widthPixels);

  const pixelArea = widthPixels * heightPixels;
  const inchArea = diagonalInches ** 2 * Math.sin(angle) * Math.cos(angle);

  return Math.sqrt(pixelArea / inchArea);
}

export default function MonitorIcon(props: MonitorIconProps): JSX.Element {
  const classes = useStyles(props);

  const width = props.monitor.widthPixels || 800;
  const height = props.monitor.heightPixels || 600;
  const diagonal = props.monitor.diagonalInches || 20;

  const ppi = calculatePpi(width, height, diagonal);

  const borderWidth = 0.5 * ppi;

  const baseColumnWidth = 3 * ppi;
  const baseColumnHeight = 2 * ppi;

  const baseBottomWidth = 8 * ppi;
  const baseTopWidth = 6 * ppi;
  const baseHeight = 1.25 * ppi;

  const monitorWidth = width + 2 * borderWidth;
  const monitorHeight = height + 2 * borderWidth;

  const viewBoxWidth = monitorWidth;
  const viewBoxHeight = monitorHeight + baseColumnHeight + baseHeight / 2;

  return (
    <svg
      className={classes.svg}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
    >
      <rect
        className={classes.border}
        width={monitorWidth}
        height={monitorHeight}
      />
      <rect
        className={classes.screen}
        x={borderWidth}
        y={borderWidth}
        width={width}
        height={height}
      />
      <path
        className={classes.base}
        d={`M ${(monitorWidth - baseBottomWidth) / 2} ${viewBoxHeight} L ${
          (monitorWidth - baseTopWidth) / 2
        } ${viewBoxHeight - baseHeight} h ${baseTopWidth} L ${
          (monitorWidth + baseBottomWidth) / 2
        } ${viewBoxHeight} Z`}
      />
      <rect
        className={classes.neck}
        x={(monitorWidth - baseColumnWidth) / 2}
        y={monitorHeight}
        width={baseColumnWidth}
        height={baseColumnHeight}
      />
    </svg>
  );
}
