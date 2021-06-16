import AppBar from "@material-ui/core/AppBar";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "@material-ui/icons/Menu";
import React from "react";
import { useDispatch } from "react-redux";
import logo from "./gestalt-logo-web-black.svg";
import { toggleDrawer } from "../../layout-slice";

interface HeaderProps {
  children?: React.ReactNode;
  drawer?: boolean;
  drawerWidth: number;
}

const useStyles = makeStyles<Theme, HeaderProps>((theme) => ({
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
  const dispatch = useDispatch();
  const classes = useStyles(props);

  const onMenuButtonClick = () => dispatch(toggleDrawer());

  return (
    <AppBar elevation={0} position="static">
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
        {props.children}
      </Toolbar>
      <Divider />
    </AppBar>
  );
}
