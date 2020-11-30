import React from "react";
import { initialState } from "../../../../state";
import { render } from "../../../../utils/test-utils";
import Monitor from ".";

describe("Monitor", () => {
  it("shows monitor pixel dimensions", () => {
    const id = "1";
    const expectedWidthPixels = 1920;
    const expectedHeightPixels = 1080;
    const state = {
      ...initialState,
      monitors: {
        ...initialState.monitors,
        selectedId: id,
        ids: [id],
        byId: {
          [id]: {
            ...initialState.monitors.byId[id],
            widthPixels: expectedWidthPixels,
            heightPixels: expectedHeightPixels,
          },
        },
      },
    };
    const { getByText } = render(<Monitor id={id} />, { initialState: state });

    const pixelDimensions = getByText(
      new RegExp(expectedWidthPixels.toString())
    );

    expect(pixelDimensions).toHaveTextContent(
      `${expectedWidthPixels} × ${expectedHeightPixels}`
    );
  });

  it("shows monitor diagonal length", () => {
    const id = "1";
    const expectedDiagonalInches = 20;
    const state = {
      ...initialState,
      monitors: {
        ...initialState.monitors,
        selectedId: id,
        ids: [id],
        byId: {
          [id]: {
            ...initialState.monitors.byId[id],
            diagonalInches: expectedDiagonalInches,
          },
        },
      },
    };
    const { getByText } = render(<Monitor id={id} />, { initialState: state });

    const pixelDimensions = getByText(
      new RegExp(expectedDiagonalInches.toString())
    );

    expect(pixelDimensions).toHaveTextContent(`${expectedDiagonalInches}"`);
  });

  it("shows as selected when id is equal to the state selected id", () => {
    const id = "1";
    const state = {
      ...initialState,
      monitors: {
        ...initialState.monitors,
        selectedId: id,
        ids: [id],
        byId: {
          [id]: {
            widthPixels: 1920,
            heightPixels: 1080,
            diagonalInches: 20,
          },
        },
      },
    };
    const { getAllByRole } = render(<Monitor id={id} />, {
      initialState: state,
    });

    const monitor = getAllByRole("button")[0];

    expect(monitor).toHaveClass("Mui-selected");
  });

  it("does not show as selected when id is not equal to the state selected id", () => {
    const id = "1";
    const state = {
      ...initialState,
      monitors: {
        ...initialState.monitors,
        selectedId: "2",
        ids: [id],
        byId: {
          [id]: {
            widthPixels: 1920,
            heightPixels: 1080,
            diagonalInches: 20,
          },
        },
      },
    };
    const { getAllByRole } = render(<Monitor id={id} />, {
      initialState: state,
    });

    const monitor = getAllByRole("button")[0];

    expect(monitor).not.toHaveClass("Mui-selected");
  });
});
