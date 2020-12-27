import React from "react";
import { Helmet } from "react-helmet-async";
import Divider from "@material-ui/core/Divider";
import Header from "../header";

interface LayoutProps {
  children?: React.ReactNode;
  drawer?: React.ReactNode;
}

export default function Layout(props: LayoutProps): JSX.Element {
  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Header drawer={props.drawer && true} />
      <Divider />
      {props.drawer}
      <main>{props.children}</main>
    </>
  );
}
