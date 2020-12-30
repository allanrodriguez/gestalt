import React from "react";
import Header from ".";
import { render } from "../../../../utils/test-utils";

describe("Header", () => {
  it("renders the logo", () => {
    const { queryByAltText } = render(<Header />);

    const image = queryByAltText("Gatsby logo");

    expect(image).toBeInTheDocument();
  });

  it("renders the menu button when 'drawerWidth' is not 0", () => {
    const { queryByLabelText } = render(<Header drawerWidth={1} />);

    const menuButton = queryByLabelText("menu");

    expect(menuButton).toBeInTheDocument();
  });

  it("does not render the menu button when 'drawerWidth' is unspecified", () => {
    const { queryByLabelText } = render(<Header />);

    const menuButton = queryByLabelText("menu");

    expect(menuButton).not.toBeInTheDocument();
  });
});
