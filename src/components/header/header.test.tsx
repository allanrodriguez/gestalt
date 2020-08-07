import React from "react";
import { render } from "../../utils/test-utils";
import Header from ".";

describe("Header", () => {
  it("renders the logo", () => {
    const { queryByAltText } = render(<Header />);

    const image = queryByAltText("Gatsby logo");

    expect(image).toBeInTheDocument();
  });

  it("renders the menu button when 'drawer' is set to true", () => {
    const { queryByLabelText } = render(<Header drawer />);

    const menuButton = queryByLabelText("menu");

    expect(menuButton).toBeInTheDocument();
  });

  it("does not render the menu button when 'drawer' is set to false", () => {
    const { queryByLabelText } = render(<Header />);

    const menuButton = queryByLabelText("menu");

    expect(menuButton).not.toBeInTheDocument();
  });

  it("renders the crop button when 'cropButton' is set to true", () => {
    const { queryByText } = render(<Header cropButton />);

    const cropButton = queryByText("Crop");

    expect(cropButton).toBeInTheDocument();
  });

  it("does not render the crop button when 'cropButton' is set to false", () => {
    const { queryByText } = render(<Header />);

    const cropButton = queryByText("Crop");

    expect(cropButton).not.toBeInTheDocument();
  });
});
