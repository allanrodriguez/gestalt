import React from "react";
import { Helmet } from "react-helmet-async";
import CssBaseline from "@material-ui/core/CssBaseline";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from "../../src/theme";

interface MuiLayoutProps {
  children?: React.ReactNode;
}

export default function MuiLayout(props: MuiLayoutProps): JSX.Element {
  return (
    <>
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Helmet>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </>
  );
}
