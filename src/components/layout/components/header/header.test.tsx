import React from "react";
import Header from ".";
import { render } from "../../../../utils/test-utils";

describe("Header", () => {
  it("renders the logo", () => {
    const { queryByAltText } = render(<Header drawerWidth={0} />);

    const image = queryByAltText("Gatsby logo");

    expect(image).toBeInTheDocument();
  });

  it("renders the menu button when 'drawer' is true", () => {
    const { queryByLabelText } = render(<Header drawer drawerWidth={0} />);

    const menuButton = queryByLabelText("Open drawer");

    expect(menuButton).toBeInTheDocument();
  });

  it("does not render the menu button when 'drawer' is unspecified", () => {
    const { queryByLabelText } = render(<Header drawerWidth={0} />);

    const menuButton = queryByLabelText("Open drawer");

    expect(menuButton).not.toBeInTheDocument();
  });
});
