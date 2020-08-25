import React from "react";
import { useSelector } from "react-redux";
import { selectMonitor } from "../../monitors-slice";
import styles from "./monitor-icon.module.css";

interface MonitorIconProps {
  id: string;
}

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
  const monitor = useSelector(selectMonitor(props.id));

  const width = monitor.widthPixels || 800;
  const height = monitor.heightPixels || 600;
  const diagonal = monitor.diagonalInches || 20;

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
    <svg viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}>
      <rect
        className={styles.border}
        width={monitorWidth}
        height={monitorHeight}
      />
      <rect
        className={styles.screen}
        x={borderWidth}
        y={borderWidth}
        width={width}
        height={height}
      />
      <path
        className={styles.base}
        d={`M ${(monitorWidth - baseBottomWidth) / 2} ${viewBoxHeight} L ${
          (monitorWidth - baseTopWidth) / 2
        } ${viewBoxHeight - baseHeight} h ${baseTopWidth} L ${
          (monitorWidth + baseBottomWidth) / 2
        } ${viewBoxHeight} Z`}
      />
      <rect
        className={styles.neck}
        x={(monitorWidth - baseColumnWidth) / 2}
        y={monitorHeight}
        width={baseColumnWidth}
        height={baseColumnHeight}
      />
    </svg>
  );
}
