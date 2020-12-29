import clsx from "clsx";
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Toolbar from "@material-ui/core/Toolbar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Menu from "@material-ui/icons/Menu";
import logo from "./gestalt-logo-web-white.svg";

interface HeaderProps {
  cropButton?: boolean;
  drawerOpen?: boolean;
  drawerWidth?: number;
  onMenuButtonClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
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
  const classes = useStyles(props);

  return (
    <AppBar
      className={clsx(classes.appBar, {
        [classes.appBarShift]: props.drawerOpen,
      })}
      elevation={0}
      position="fixed"
    >
      <Toolbar>
        {props.drawerWidth && (
          <IconButton
            className={classes.drawerButton}
            edge="start"
            aria-label="Open drawer"
            onClick={props.onMenuButtonClick}
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
