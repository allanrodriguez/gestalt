import React from "react";
import { Helmet } from "react-helmet-async";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
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
