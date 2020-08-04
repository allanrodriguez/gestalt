import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { Menu } from "@material-ui/icons";

interface HeaderProps {
  drawer?: boolean;
}

export default function Header(props: HeaderProps): JSX.Element {
  return (
    <AppBar elevation={0}>
      <Toolbar>
        {props.drawer && (
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
        )}
        <Typography variant="h6">Gestalt</Typography>
      </Toolbar>
    </AppBar>
  );
}
