import React from "react";
import { initialState } from "../../state";
import { render } from "../../utils/test-utils";
import Monitors from ".";

describe("Monitors", () => {
  it("shows instructions when there are no monitors", () => {
    const { queryByText } = render(<Monitors />);

    const message = queryByText(
      /button above to add your monitors to this list\./
    );

    expect(message).toBeInTheDocument();
  });

  it("creates a monitor for every monitor id in the state", () => {
    const ids = ["1", "2", "3", "4"];
    const state = {
      ...initialState,
      monitors: {
        ...initialState.monitors,
        ids,
        byId: ids.reduce(
          (p, c) => ({
            ...p,
            [c]: {
              widthPixels: 1,
              heightPixels: 1,
              diagonalInches: 1,
            },
          }),
          {}
        ),
      },
    };
    const { getAllByText } = render(<Monitors />, { initialState: state });

    const monitors = getAllByText(/1"/);

    expect(monitors.length).toBe(ids.length);
  });
});
