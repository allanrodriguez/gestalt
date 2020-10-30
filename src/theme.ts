import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: `#0277bd`,
      dark: `#004c8c`,
      light: `#58a5f0`,
    },
    secondary: {
      main: `#263238`,
      dark: `#000a12`,
      light: `#4f5b62`,
    },
    background: {
      default: `#0277bd`,
    },
    text: {
      primary: `#ffffff`,
      secondary: `#ffffff`,
    },
  },
  typography: {
    fontFamily: `Comfortaa`,
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: `#000a12`,
      paper: `#263238`,
    },
  },
  typography: {
    fontFamily: `Comfortaa`,
  },
});

export default theme;

export { darkTheme };
