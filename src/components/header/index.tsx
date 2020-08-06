import React from "react";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";

interface HeaderProps {
  cropButtonDisabled?: boolean;
  drawer?: boolean;
}

const useStyles = makeStyles((theme) => ({
  drawerButton: {
    color: "inherit",
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header(props: HeaderProps): JSX.Element {
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
        <Typography className={classes.title} variant="h6">
          Gestalt
        </Typography>
        <Button color="inherit" disabled={props.cropButtonDisabled}>
          Crop
        </Button>
      </Toolbar>
    </AppBar>
  );
}
