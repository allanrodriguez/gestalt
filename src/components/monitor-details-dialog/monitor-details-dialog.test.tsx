import React from "react";
import MonitorDetailsDialog from ".";
import { DialogType } from "./monitor-details-dialog-slice";
import { initialState } from "../../state";
import { render } from "../../utils/test-utils";

describe("MonitorDetailsDialog", () => {
  it("is visible when state 'isOpen' is true", () => {
    const state = {
      ...initialState,
      detailsDialog: {
        ...initialState.detailsDialog,
        isOpen: true,
      },
    };
    const { baseElement } = render(<MonitorDetailsDialog />, {
      initialState: state,
    });

    expect(baseElement.children.length).toBeGreaterThan(1);
  });

  it("is not visible when state 'isOpen' is false", () => {
    const state = {
      ...initialState,
      detailsDialog: {
        ...initialState.detailsDialog,
        isOpen: false,
      },
    };
    const { baseElement } = render(<MonitorDetailsDialog />, {
      initialState: state,
    });

    expect(baseElement.children).toHaveLength(1);
  });

  it.each([
    ["Add", DialogType.Add],
    ["Update", DialogType.Update],
  ])(
    "shows title as '%s monitor' when state 'type' is '%s'",
    (expected, type) => {
      const state = {
        ...initialState,
        detailsDialog: {
          ...initialState.detailsDialog,
          isOpen: true,
          type,
        },
      };
      const { queryByText } = render(<MonitorDetailsDialog />, {
        initialState: state,
      });

      const title = queryByText(new RegExp(`${expected} monitor`));

      expect(title).toBeInTheDocument();
    }
  );

  it("adds error CSS class to diagonal input when state 'errors.diagonal' is true", () => {
    const state = {
      ...initialState,
      detailsDialog: {
        ...initialState.detailsDialog,
        isOpen: true,
        errors: {
          ...initialState.detailsDialog.errors,
          diagonal: true,
        },
      },
    };
    const { queryByLabelText } = render(<MonitorDetailsDialog />, {
      initialState: state,
    });

    const diagonalInput = queryByLabelText(/Diagonal width/);

    expect(diagonalInput.parentElement).toHaveClass("Mui-error");
  });

  it("does not add error CSS class to diagonal input when state 'errors.diagonal' is false", () => {
    const state = {
      ...initialState,
      detailsDialog: {
        ...initialState.detailsDialog,
        isOpen: true,
        errors: {
          ...initialState.detailsDialog.errors,
          diagonal: false,
        },
      },
    };
    const { queryByLabelText } = render(<MonitorDetailsDialog />, {
      initialState: state,
    });

    const diagonalInput = queryByLabelText(/Diagonal width/);

    expect(diagonalInput.parentElement).not.toHaveClass("Mui-error");
  });

  it("adds error CSS class to width input when state 'errors.width' is true", () => {
    const state = {
      ...initialState,
      detailsDialog: {
        ...initialState.detailsDialog,
        isOpen: true,
        errors: {
          ...initialState.detailsDialog.errors,
          width: true,
        },
      },
    };
    const { queryByLabelText } = render(<MonitorDetailsDialog />, {
      initialState: state,
    });

    const widthInput = queryByLabelText(/Width/);

    expect(widthInput.parentElement).toHaveClass("Mui-error");
  });

  it("does not add error CSS class to width input when state 'errors.width' is false", () => {
    const state = {
      ...initialState,
      detailsDialog: {
        ...initialState.detailsDialog,
        isOpen: true,
        errors: {
          ...initialState.detailsDialog.errors,
          width: false,
        },
      },
    };
    const { queryByLabelText } = render(<MonitorDetailsDialog />, {
      initialState: state,
    });

    const widthInput = queryByLabelText(/Width/);

    expect(widthInput.parentElement).not.toHaveClass("Mui-error");
  });

  it("adds error CSS class to height input when state 'errors.height' is true", () => {
    const state = {
      ...initialState,
      detailsDialog: {
        ...initialState.detailsDialog,
        isOpen: true,
        errors: {
          ...initialState.detailsDialog.errors,
          height: true,
        },
      },
    };
    const { queryByLabelText } = render(<MonitorDetailsDialog />, {
      initialState: state,
    });

    const heightInput = queryByLabelText(/Height/);

    expect(heightInput.parentElement).toHaveClass("Mui-error");
  });

  it("does not add error CSS class to height input when state 'errors.height' is false", () => {
    const state = {
      ...initialState,
      detailsDialog: {
        ...initialState.detailsDialog,
        isOpen: true,
        errors: {
          ...initialState.detailsDialog.errors,
          height: false,
        },
      },
    };
    const { queryByLabelText } = render(<MonitorDetailsDialog />, {
      initialState: state,
    });

    const heightInput = queryByLabelText(/Height/);

    expect(heightInput.parentElement).not.toHaveClass("Mui-error");
  });

  it.each([
    ["Add", DialogType.Add],
    ["Update", DialogType.Update],
  ])(
    "shows submit button with title '%s' when state 'type' is '%s'",
    (expected, type) => {
      const state = {
        ...initialState,
        detailsDialog: {
          ...initialState.detailsDialog,
          isOpen: true,
          type,
        },
      };
      const { queryByText } = render(<MonitorDetailsDialog />, {
        initialState: state,
      });

      const title = queryByText(expected);

      expect(title).toBeInTheDocument();
    }
  );

  it("enables submit button when all state 'errors' fields are false and all 'monitor' fields have values", () => {
    const state = {
      ...initialState,
      detailsDialog: {
        ...initialState.detailsDialog,
        isOpen: true,
        type: DialogType.Add,
        monitor: {
          diagonalInches: 1,
          heightPixels: 1,
          widthPixels: 1,
        },
        errors: {
          diagonal: false,
          height: false,
          width: false,
        },
      },
    };
    const { queryByText } = render(<MonitorDetailsDialog />, {
      initialState: state,
    });

    const button = queryByText("Add").parentElement;

    expect(button).not.toHaveClass("Mui-disabled");
  });

  it.each([
    [
      { diagonalInches: 0, widthPixels: 0, heightPixels: 0 },
      { diagonal: false, width: false, height: true },
    ],
    [
      { diagonalInches: 0, widthPixels: 0, heightPixels: 1 },
      { diagonal: false, width: false, height: true },
    ],
    [
      { diagonalInches: 0, widthPixels: 1, heightPixels: 0 },
      { diagonal: false, width: false, height: true },
    ],
    [
      { diagonalInches: 0, widthPixels: 1, heightPixels: 1 },
      { diagonal: false, width: false, height: true },
    ],
    [
      { diagonalInches: 1, widthPixels: 0, heightPixels: 0 },
      { diagonal: false, width: false, height: true },
    ],
    [
      { diagonalInches: 1, widthPixels: 0, heightPixels: 1 },
      { diagonal: false, width: false, height: true },
    ],
    [
      { diagonalInches: 1, widthPixels: 1, heightPixels: 0 },
      { diagonal: false, width: false, height: true },
    ],
    [
      { diagonalInches: 0, widthPixels: 0, heightPixels: 0 },
      { diagonal: false, width: true, height: false },
    ],
    [
      { diagonalInches: 0, widthPixels: 0, heightPixels: 1 },
      { diagonal: false, width: true, height: false },
    ],
    [
      { diagonalInches: 0, widthPixels: 1, heightPixels: 0 },
      { diagonal: false, width: true, height: false },
    ],
    [
      { diagonalInches: 0, widthPixels: 1, heightPixels: 1 },
      { diagonal: false, width: true, height: false },
    ],
    [
      { diagonalInches: 1, widthPixels: 0, heightPixels: 0 },
      { diagonal: false, width: true, height: false },
    ],
    [
      { diagonalInches: 1, widthPixels: 0, heightPixels: 1 },
      { diagonal: false, width: true, height: false },
    ],
    [
      { diagonalInches: 1, widthPixels: 1, heightPixels: 0 },
      { diagonal: false, width: true, height: false },
    ],
    [
      { diagonalInches: 0, widthPixels: 0, heightPixels: 0 },
      { diagonal: false, width: true, height: true },
    ],
    [
      { diagonalInches: 0, widthPixels: 0, heightPixels: 1 },
      { diagonal: false, width: true, height: true },
    ],
    [
      { diagonalInches: 0, widthPixels: 1, heightPixels: 0 },
      { diagonal: false, width: true, height: true },
    ],
    [
      { diagonalInches: 0, widthPixels: 1, heightPixels: 1 },
      { diagonal: false, width: true, height: true },
    ],
    [
      { diagonalInches: 1, widthPixels: 0, heightPixels: 0 },
      { diagonal: false, width: true, height: true },
    ],
    [
      { diagonalInches: 1, widthPixels: 0, heightPixels: 1 },
      { diagonal: false, width: true, height: true },
    ],
    [
      { diagonalInches: 1, widthPixels: 1, heightPixels: 0 },
      { diagonal: false, width: true, height: true },
    ],
    [
      { diagonalInches: 0, widthPixels: 0, heightPixels: 0 },
      { diagonal: true, width: false, height: false },
    ],
    [
      { diagonalInches: 0, widthPixels: 0, heightPixels: 1 },
      { diagonal: true, width: false, height: false },
    ],
    [
      { diagonalInches: 0, widthPixels: 1, heightPixels: 0 },
      { diagonal: true, width: false, height: false },
    ],
    [
      { diagonalInches: 0, widthPixels: 1, heightPixels: 1 },
      { diagonal: true, width: false, height: false },
    ],
    [
      { diagonalInches: 1, widthPixels: 0, heightPixels: 0 },
      { diagonal: true, width: false, height: false },
    ],
    [
      { diagonalInches: 1, widthPixels: 0, heightPixels: 1 },
      { diagonal: true, width: false, height: false },
    ],
    [
      { diagonalInches: 1, widthPixels: 1, heightPixels: 0 },
      { diagonal: true, width: false, height: false },
    ],
    [
      { diagonalInches: 0, widthPixels: 0, heightPixels: 0 },
      { diagonal: true, width: false, height: true },
    ],
    [
      { diagonalInches: 0, widthPixels: 0, heightPixels: 1 },
      { diagonal: true, width: false, height: true },
    ],
    [
      { diagonalInches: 0, widthPixels: 1, heightPixels: 0 },
      { diagonal: true, width: false, height: true },
    ],
    [
      { diagonalInches: 0, widthPixels: 1, heightPixels: 1 },
      { diagonal: true, width: false, height: true },
    ],
    [
      { diagonalInches: 1, widthPixels: 0, heightPixels: 0 },
      { diagonal: true, width: false, height: true },
    ],
    [
      { diagonalInches: 1, widthPixels: 0, heightPixels: 1 },
      { diagonal: true, width: false, height: true },
    ],
    [
      { diagonalInches: 1, widthPixels: 1, heightPixels: 0 },
      { diagonal: true, width: false, height: true },
    ],
    [
      { diagonalInches: 0, widthPixels: 0, heightPixels: 0 },
      { diagonal: true, width: true, height: false },
    ],
    [
      { diagonalInches: 0, widthPixels: 0, heightPixels: 1 },
      { diagonal: true, width: true, height: false },
    ],
    [
      { diagonalInches: 0, widthPixels: 1, heightPixels: 0 },
      { diagonal: true, width: true, height: false },
    ],
    [
      { diagonalInches: 0, widthPixels: 1, heightPixels: 1 },
      { diagonal: true, width: true, height: false },
    ],
    [
      { diagonalInches: 1, widthPixels: 0, heightPixels: 0 },
      { diagonal: true, width: true, height: false },
    ],
    [
      { diagonalInches: 1, widthPixels: 0, heightPixels: 1 },
      { diagonal: true, width: true, height: false },
    ],
    [
      { diagonalInches: 1, widthPixels: 1, heightPixels: 0 },
      { diagonal: true, width: true, height: false },
    ],
    [
      { diagonalInches: 0, widthPixels: 0, heightPixels: 0 },
      { diagonal: true, width: true, height: true },
    ],
    [
      { diagonalInches: 0, widthPixels: 0, heightPixels: 1 },
      { diagonal: true, width: true, height: true },
    ],
    [
      { diagonalInches: 0, widthPixels: 1, heightPixels: 0 },
      { diagonal: true, width: true, height: true },
    ],
    [
      { diagonalInches: 0, widthPixels: 1, heightPixels: 1 },
      { diagonal: true, width: true, height: true },
    ],
    [
      { diagonalInches: 1, widthPixels: 0, heightPixels: 0 },
      { diagonal: true, width: true, height: true },
    ],
    [
      { diagonalInches: 1, widthPixels: 0, heightPixels: 1 },
      { diagonal: true, width: true, height: true },
    ],
    [
      { diagonalInches: 1, widthPixels: 1, heightPixels: 0 },
      { diagonal: true, width: true, height: true },
    ],
  ])(
    "disables submit button when one or more state 'errors' fields are true or one or more 'monitor' fields are empty",
    (monitor, errors) => {
      const state = {
        ...initialState,
        detailsDialog: {
          ...initialState.detailsDialog,
          isOpen: true,
          type: DialogType.Add,
          monitor,
          errors,
        },
      };
      const { queryByText } = render(<MonitorDetailsDialog />, {
        initialState: state,
      });

      const button = queryByText("Add").parentElement;

      expect(button).toHaveClass("Mui-disabled");
    }
  );
});
