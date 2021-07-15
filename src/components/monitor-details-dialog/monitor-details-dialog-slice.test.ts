import reducer, {
  DialogType,
  closeDialog,
  openDialog,
  setDiagonalInches,
  setHeightPixels,
  setWidthPixels,
  setDiagonalError,
  setHeightError,
  setWidthError,
} from "./monitor-details-dialog-slice";

test("closeDialog sets isOpen to false", () => {
  const action = closeDialog();

  const state = reducer(
    {
      errors: {
        diagonal: false,
        height: false,
        width: false,
      },
      isOpen: true,
      monitor: {
        diagonalInches: 0,
        heightPixels: 0,
        widthPixels: 0,
      },
      type: DialogType.Add,
    },
    action
  );

  expect(state).toEqual({
    errors: {
      diagonal: false,
      height: false,
      width: false,
    },
    isOpen: false,
    monitor: {
      diagonalInches: 0,
      heightPixels: 0,
      widthPixels: 0,
    },
    type: DialogType.Add,
  });
});

test.each([
  { expectedDialogType: DialogType.Add },
  { expectedDialogType: DialogType.Update },
])(
  "openDialog($expectedDialogType) sets isOpen to true, clears errors and monitors, and sets type to $expectedDialogType",
  ({ expectedDialogType }) => {
    const action = openDialog(expectedDialogType);

    const state = reducer(
      {
        errors: {
          diagonal: false,
          height: false,
          width: false,
        },
        isOpen: false,
        monitor: {
          diagonalInches: 0,
          heightPixels: 0,
          widthPixels: 0,
        },
        type: DialogType.Add,
      },
      action
    );

    expect(state).toEqual({
      errors: {
        diagonal: false,
        height: false,
        width: false,
      },
      isOpen: true,
      monitor: {
        diagonalInches: 0,
        heightPixels: 0,
        widthPixels: 0,
      },
      type: expectedDialogType,
    });
  }
);

test("setDiagonalInches sets the monitor diagonal width", () => {
  const action = setDiagonalInches(1);

  const state = reducer(
    {
      errors: {
        diagonal: false,
        height: false,
        width: false,
      },
      isOpen: false,
      monitor: {
        diagonalInches: 0,
        heightPixels: 0,
        widthPixels: 0,
      },
      type: DialogType.Add,
    },
    action
  );

  expect(state).toEqual({
    errors: {
      diagonal: false,
      height: false,
      width: false,
    },
    isOpen: false,
    monitor: {
      diagonalInches: 1,
      heightPixels: 0,
      widthPixels: 0,
    },
    type: DialogType.Add,
  });
});

test("setHeightPixels sets the monitor height", () => {
  const action = setHeightPixels(1);

  const state = reducer(
    {
      errors: {
        diagonal: false,
        height: false,
        width: false,
      },
      isOpen: false,
      monitor: {
        diagonalInches: 0,
        heightPixels: 0,
        widthPixels: 0,
      },
      type: DialogType.Add,
    },
    action
  );

  expect(state).toEqual({
    errors: {
      diagonal: false,
      height: false,
      width: false,
    },
    isOpen: false,
    monitor: {
      diagonalInches: 0,
      heightPixels: 1,
      widthPixels: 0,
    },
    type: DialogType.Add,
  });
});

test("setWidthPixels sets the monitor width", () => {
  const action = setWidthPixels(1);

  const state = reducer(
    {
      errors: {
        diagonal: false,
        height: false,
        width: false,
      },
      isOpen: false,
      monitor: {
        diagonalInches: 0,
        heightPixels: 0,
        widthPixels: 0,
      },
      type: DialogType.Add,
    },
    action
  );

  expect(state).toEqual({
    errors: {
      diagonal: false,
      height: false,
      width: false,
    },
    isOpen: false,
    monitor: {
      diagonalInches: 0,
      heightPixels: 0,
      widthPixels: 1,
    },
    type: DialogType.Add,
  });
});

test("setDiagonalError sets the diagonal error flag", () => {
  const action = setDiagonalError(true);

  const state = reducer(
    {
      errors: {
        diagonal: false,
        height: false,
        width: false,
      },
      isOpen: false,
      monitor: {
        diagonalInches: 0,
        heightPixels: 0,
        widthPixels: 0,
      },
      type: DialogType.Add,
    },
    action
  );

  expect(state).toEqual({
    errors: {
      diagonal: true,
      height: false,
      width: false,
    },
    isOpen: false,
    monitor: {
      diagonalInches: 0,
      heightPixels: 0,
      widthPixels: 0,
    },
    type: DialogType.Add,
  });
});

test("setHeightError sets the height error flag", () => {
  const action = setHeightError(true);

  const state = reducer(
    {
      errors: {
        diagonal: false,
        height: false,
        width: false,
      },
      isOpen: false,
      monitor: {
        diagonalInches: 0,
        heightPixels: 0,
        widthPixels: 0,
      },
      type: DialogType.Add,
    },
    action
  );

  expect(state).toEqual({
    errors: {
      diagonal: false,
      height: true,
      width: false,
    },
    isOpen: false,
    monitor: {
      diagonalInches: 0,
      heightPixels: 0,
      widthPixels: 0,
    },
    type: DialogType.Add,
  });
});

test("setWidthError sets the width error flag", () => {
  const action = setWidthError(true);

  const state = reducer(
    {
      errors: {
        diagonal: false,
        height: false,
        width: false,
      },
      isOpen: false,
      monitor: {
        diagonalInches: 0,
        heightPixels: 0,
        widthPixels: 0,
      },
      type: DialogType.Add,
    },
    action
  );

  expect(state).toEqual({
    errors: {
      diagonal: false,
      height: false,
      width: true,
    },
    isOpen: false,
    monitor: {
      diagonalInches: 0,
      heightPixels: 0,
      widthPixels: 0,
    },
    type: DialogType.Add,
  });
});
