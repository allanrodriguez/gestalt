import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { render } from "../../utils/test-utils";
import Layout from ".";

describe("Layout", () => {
  it("renders the header when drawer component exists", () => {
    const { queryByRole } = render(
      <HelmetProvider context={{}}>
        <Layout drawer={<div />} />
      </HelmetProvider>
    );

    const menuButton = queryByRole("button", { name: "menu" });

    expect(menuButton).toBeInTheDocument();
  });

  it("does not render the header when drawer component does not exist", () => {
    const { queryByRole } = render(
      <HelmetProvider context={{}}>
        <Layout />
      </HelmetProvider>
    );

    const menuButton = queryByRole("button", { name: "menu" });

    expect(menuButton).not.toBeInTheDocument();
  });

  it("adds drawer to document when drawer exists", () => {
    const expectedText = "hello";
    const { queryByText } = render(
      <HelmetProvider context={{}}>
        <Layout drawer={<div>{expectedText}</div>} />
      </HelmetProvider>
    );

    const drawer = queryByText(expectedText);

    expect(drawer).toBeInTheDocument();
  });

  it("adds children to <main>", () => {
    const expectedText = "hello";
    const { queryByRole, queryByText } = render(
      <HelmetProvider context={{}}>
        <Layout>
          <div>{expectedText}</div>
        </Layout>
      </HelmetProvider>
    );

    const main = queryByRole("main");
    const drawer = queryByText(expectedText);

    expect(main).toContainElement(drawer);
  });
});
