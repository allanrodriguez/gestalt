import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "./header";

interface LayoutProps {
  children?: React.ReactNode;
  drawer?: boolean;
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
      <header>
        <Header drawer={props.drawer} />
      </header>
      <main>{props.children}</main>
    </>
  );
}
