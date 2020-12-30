import clsx from "clsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "@material-ui/icons/Menu";
import logo from "./gestalt-logo-web-white.svg";
import { selectDrawerOpen, toggleDrawer } from "../../layout-slice";

interface HeaderProps {
  drawer?: boolean;
  drawerWidth: number;
}

const useStyles = makeStyles<Theme, HeaderProps>((theme) => ({
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: (props) => `calc(100% - ${props.drawerWidth}px)`,
    marginLeft: (props) => props.drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerButton: {
    color: theme.palette.text.primary,
    marginRight: theme.spacing(2),
  },
  logo: {
    display: "flex",
    flexGrow: 1,
  },
}));

export default function Header(props: HeaderProps): JSX.Element {
  const isDrawerOpen = useSelector(selectDrawerOpen);
  const dispatch = useDispatch();
  const classes = useStyles(props);

  const onMenuButtonClick = () => dispatch(toggleDrawer());

  return (
    <AppBar
      className={clsx(classes.appBar, {
        [classes.appBarShift]: isDrawerOpen,
      })}
      elevation={0}
      position="fixed"
    >
      <Toolbar>
        {props.drawer && (
          <IconButton
            className={classes.drawerButton}
            edge="start"
            aria-label="Open drawer"
            onClick={onMenuButtonClick}
          >
            <Menu />
          </IconButton>
        )}
        <div className={classes.logo}>
          <img src={logo} alt="Gatsby logo" height={38} />
        </div>
      </Toolbar>
    </AppBar>
  );
}
