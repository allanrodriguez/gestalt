import createTheme from "@material-ui/core/styles/createTheme";

const theme = createTheme({
  palette: {
    primary: {
      main: `#ffab91`,
      dark: `#c97b63`,
      light: `#ffddc1`,
    },
    secondary: {
      main: `#90caf9`,
      dark: `#5d99c6`,
      light: `#c3fdff`,
    },
    background: {
      default: `#ffab91`,
    },
  },
  typography: {
    fontFamily: `Comfortaa, sans-serif`,
  },
});

const darkTheme = createTheme({
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
