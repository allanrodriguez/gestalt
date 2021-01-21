import React from "react";
import Drawer from ".";
import { initialState, RootState } from "../../../../state";
import { render } from "../../../../utils/test-utils";

describe("Drawer", () => {
  it("renders when 'isDrawerOpen' is true", () => {
    const state: RootState = {
      ...initialState,
      layout: {
        ...initialState.layout,
        isDrawerOpen: true,
      },
    };

    const { container } = render(<Drawer width={0} />, {
      initialState: state,
    });

    expect(container.children[0]?.children[0]).toBeVisible();
  });

  it("does not render when 'isDrawerOpen' is false", () => {
    const state: RootState = {
      ...initialState,
      layout: {
        ...initialState.layout,
        isDrawerOpen: false,
      },
    };

    const { container } = render(<Drawer width={0} />, {
      initialState: state,
    });

    expect(container.children[0]?.children[0]).not.toBeVisible();
  });
});
