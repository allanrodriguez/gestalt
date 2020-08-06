import React from "react";
import { useSelector } from "react-redux";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  makeStyles,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { selectCropButtonEnabled } from "./header-slice";
import logo from "./gestalt-logo-web-white.svg";

interface HeaderProps {
  cropButton?: boolean;
  drawer?: boolean;
}

const useStyles = makeStyles((theme) => ({
  drawerButton: {
    color: "inherit",
    marginRight: theme.spacing(2),
  },
  logo: {
    display: "flex",
    flexGrow: 1,
  },
}));

export default function Header(props: HeaderProps): JSX.Element {
  const isCropButtonEnabled = useSelector(selectCropButtonEnabled);
  const classes = useStyles();

  return (
    <AppBar elevation={0}>
      <Toolbar>
        {props.drawer && (
          <IconButton
            className={classes.drawerButton}
            edge="start"
            aria-label="menu"
          >
            <Menu />
          </IconButton>
        )}
        <div className={classes.logo}>
          <img src={logo} alt="Gatsby logo" height={38} />
        </div>
        {props.cropButton && (
          <Button color="inherit" disabled={!isCropButtonEnabled}>
            Crop
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
