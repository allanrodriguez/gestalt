import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ClearRounded from "@material-ui/icons/ClearRounded";
import DoneRounded from "@material-ui/icons/DoneRounded";
import clsx from "clsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { drawerWidth } from "../common/constants";
import ImageEditor from "../components/image-editor";
import {
  selectImageUploaded,
  setImageUploaded,
  setZoomLevel,
} from "../components/image-editor/image-editor-slice";
import Layout from "../components/layout";
import { selectDrawerOpen } from "../components/layout/layout-slice";
import MonitorDrawer from "../components/monitor-drawer";
import Upload from "../components/upload";

const useStyles = makeStyles((theme) => ({
  container: {
    overflow: "auto",
    position: "absolute",
    top: 56,
    [`${theme.breakpoints.up("xs")} and (orientation: landscape)`]: {
      top: 48,
    },
    [theme.breakpoints.up("sm")]: {
      top: 64,
    },
    left: 0,
    bottom: 0,
    right: 0,
    whiteSpace: "nowrap",
    transition: theme.transitions.create("left", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  containerShift: {
    transition: theme.transitions.create("left", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    left: drawerWidth,
  },
  drawerPaper: {
    background: "rgba(0, 0, 0, 0.18)",
  },
  formControl: {
    paddingLeft: 24,
    paddingRight: 24,
  },
  icon: {
    color: theme.palette.text.primary,
  },
  menuContainer: {
    display: "flex",
    alignItems: "center",
  },
  zoomSelect: {
    minWidth: 70,
  },
}));
const zoomLevels = [25, 50, 75, 100, 125, 150, 200, 300, 400];

export default function Home(): JSX.Element {
  const isDrawerOpen = useSelector(selectDrawerOpen);
  const isImageUploaded = useSelector(selectImageUploaded);
  const classes = useStyles();

  return (
    <Layout
      classes={{
        drawer: {
          paper: classes.drawerPaper,
        },
      }}
      drawer={<MonitorDrawer />}
      menu={isImageUploaded && <HomeMenu />}
    >
      <div
        className={clsx(classes.container, {
          [classes.containerShift]: isDrawerOpen,
        })}
      >
        {isImageUploaded ? <ImageEditor /> : <Upload />}
      </div>
    </Layout>
  );
}

function HomeMenu() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const onCancelButtonClick = () => dispatch(setImageUploaded(false));
  const onZoomSelectChange = (
    e: React.ChangeEvent<{
      name?: string;
      value: unknown;
    }>
  ) => {
    dispatch(setZoomLevel(Number(e.target.value)));
  };

  return (
    <div className={classes.menuContainer}>
      <FormControl className={classes.formControl}>
        <Select
          className={classes.zoomSelect}
          defaultValue="1"
          onChange={onZoomSelectChange}
        >
          {zoomLevels.map((level) => (
            <MenuItem key={level} value={level / 100}>
              {level}%
            </MenuItem>
          ))}
          <Divider />
          <MenuItem>Custom...</MenuItem>
        </Select>
      </FormControl>
      <IconButton aria-label="Continue with cropping">
        <DoneRounded className={classes.icon} />
      </IconButton>
      <IconButton aria-label="Cancel cropping" onClick={onCancelButtonClick}>
        <ClearRounded className={classes.icon} />
      </IconButton>
    </div>
  );
}
