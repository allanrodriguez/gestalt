import React from "react";
import { Helmet } from "react-helmet-async";
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
          href="https://fonts.googleapis.com/css2?family=Comfortaa&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Header drawer={props.drawer && true} />
      {props.drawer}
      <main>{props.children}</main>
    </>
  );
}
