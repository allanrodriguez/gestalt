import { nanoid } from "@reduxjs/toolkit";
import { Monitor } from "../../common/models";
import { RootState } from "../../state";
import reducer, {
  addMonitor,
  removeMonitor,
  selectMonitor,
  selectMonitorIds,
  selectSelectedId,
  setMonitorDiagonal,
  setMonitorHeight,
  setMonitorWidth,
  setSelectedId,
} from "./monitors-slice";

test("addMonitor adds a new monitor and sets it as the selected monitor", () => {
  const monitor: Monitor = {
    widthPixels: 1,
    heightPixels: 1,
    diagonalInches: 1,
  };
  const action = addMonitor(monitor);

  const state = reducer(
    {
      selectedId: null,
      ids: [],
      byId: {},
      isEmpty: true,
    },
    action
  );

  expect(state.selectedId).not.toBeNull();
  expect(state.ids).toHaveLength(1);
  expect(state.byId[state.ids[0]]).toEqual(monitor);
  expect(state.isEmpty).toEqual(false);
});

test("removeMonitor removes an unselected monitor", () => {
  const id = nanoid();
  const idToRemove = nanoid();
  const action = removeMonitor(idToRemove);

  const state = reducer(
    {
      selectedId: id,
      ids: [id, idToRemove],
      byId: {
        [id]: {
          widthPixels: 0,
          heightPixels: 0,
          diagonalInches: 0,
        },
        [idToRemove]: {
          widthPixels: 0,
          heightPixels: 0,
          diagonalInches: 0,
        },
      },
      isEmpty: false,
    },
    action
  );

  expect(state).toEqual({
    selectedId: id,
    ids: [id],
    byId: {
      [id]: {
        widthPixels: 0,
        heightPixels: 0,
        diagonalInches: 0,
      },
    },
    isEmpty: false,
  });
});

test("setMonitorHeight sets a monitor's height", () => {
  const id = nanoid();
  const action = setMonitorHeight({
    id,
    heightPixels: 1,
  });

  const state = reducer(
    {
      selectedId: id,
      ids: [id],
      byId: {
        [id]: {
          widthPixels: 0,
          heightPixels: 0,
          diagonalInches: 0,
        },
      },
      isEmpty: false,
    },
    action
  );

  expect(state).toEqual({
    selectedId: id,
    ids: [id],
    byId: {
      [id]: {
        widthPixels: 0,
        heightPixels: 1,
        diagonalInches: 0,
      },
    },
    isEmpty: false,
  });
});

test("setMonitorWidth sets a monitor's width", () => {
  const id = nanoid();
  const action = setMonitorWidth({
    id,
    widthPixels: 1,
  });

  const state = reducer(
    {
      selectedId: id,
      ids: [id],
      byId: {
        [id]: {
          widthPixels: 0,
          heightPixels: 0,
          diagonalInches: 0,
        },
      },
      isEmpty: false,
    },
    action
  );

  expect(state).toEqual({
    selectedId: id,
    ids: [id],
    byId: {
      [id]: {
        widthPixels: 1,
        heightPixels: 0,
        diagonalInches: 0,
      },
    },
    isEmpty: false,
  });
});

test("setMonitorDiagonal sets a monitor's diagonal width", () => {
  const id = nanoid();
  const action = setMonitorDiagonal({
    id,
    diagonalInches: 1,
  });

  const state = reducer(
    {
      selectedId: id,
      ids: [id],
      byId: {
        [id]: {
          widthPixels: 0,
          heightPixels: 0,
          diagonalInches: 0,
        },
      },
      isEmpty: false,
    },
    action
  );

  expect(state).toEqual({
    selectedId: id,
    ids: [id],
    byId: {
      [id]: {
        widthPixels: 0,
        heightPixels: 0,
        diagonalInches: 1,
      },
    },
    isEmpty: false,
  });
});

test("setSelectedId sets the selected monitor", () => {
  const expectedSelectedId = nanoid();
  const id = nanoid();
  const action = setSelectedId(expectedSelectedId);

  const state = reducer(
    {
      selectedId: id,
      ids: [id, expectedSelectedId],
      byId: {
        [id]: {
          widthPixels: 0,
          heightPixels: 0,
          diagonalInches: 0,
        },
        [expectedSelectedId]: {
          widthPixels: 0,
          heightPixels: 0,
          diagonalInches: 0,
        },
      },
      isEmpty: false,
    },
    action
  );

  expect(state).toEqual({
    selectedId: expectedSelectedId,
    ids: [id, expectedSelectedId],
    byId: {
      [id]: {
        widthPixels: 0,
        heightPixels: 0,
        diagonalInches: 0,
      },
      [expectedSelectedId]: {
        widthPixels: 0,
        heightPixels: 0,
        diagonalInches: 0,
      },
    },
    isEmpty: false,
  });
});

test("selectMonitor returns a function to get the monitor with the specified ID", () => {
  const id = nanoid();
  const expectedMonitor: Monitor = {
    widthPixels: 0,
    heightPixels: 0,
    diagonalInches: 0,
  };
  const state: RootState = {
    monitors: {
      selectedId: id,
      ids: [id],
      byId: {
        [id]: expectedMonitor,
      },
      isEmpty: false,
    },
    detailsDialog: undefined,
    imageEditor: undefined,
    layout: undefined,
  };

  const actualMonitor: Monitor = selectMonitor(id)(state);

  expect(actualMonitor).toEqual(expectedMonitor);
});

test("selectMonitorIds returns the list of monitor IDs", () => {
  const id = nanoid();
  const expectedMonitorIds = [id];
  const state: RootState = {
    monitors: {
      selectedId: id,
      ids: expectedMonitorIds,
      byId: {
        [id]: {
          widthPixels: 0,
          heightPixels: 0,
          diagonalInches: 0,
        },
      },
      isEmpty: false,
    },
    detailsDialog: undefined,
    imageEditor: undefined,
    layout: undefined,
  };

  const actualMonitorIds = selectMonitorIds(state);

  expect(actualMonitorIds).toEqual(expectedMonitorIds);
});

test("selectSelectedId returns the selected monitor ID", () => {
  const expectedSelectedId = nanoid();
  const state: RootState = {
    monitors: {
      selectedId: expectedSelectedId,
      ids: [expectedSelectedId],
      byId: {
        [expectedSelectedId]: {
          widthPixels: 0,
          heightPixels: 0,
          diagonalInches: 0,
        },
      },
      isEmpty: false,
    },
    detailsDialog: undefined,
    imageEditor: undefined,
    layout: undefined,
  };

  const actualSelectedId = selectSelectedId(state);

  expect(actualSelectedId).toEqual(expectedSelectedId);
});
