import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { RootState } from "../../state";

interface Monitor {
  widthPixels: number;
  heightPixels: number;
  diagonalInches: number;
}

interface MonitorsState {
  selectedId: string;
  ids: string[];
  byId: { [id: string]: Monitor };
  isEmpty: boolean;
}

const initialState: MonitorsState = {
  selectedId: null,
  ids: [],
  byId: {},
  isEmpty: true,
};

const monitorsSlice = createSlice({
  name: "monitors",
  initialState,
  reducers: {
    addMonitor(state: MonitorsState) {
      const id = nanoid();

      state.ids.push(id);
      state.byId[id] = {
        widthPixels: 0,
        heightPixels: 0,
        diagonalInches: 0,
      };
      state.selectedId = id;
      state.isEmpty = false;
    },
    removeMonitor(state: MonitorsState, action: PayloadAction<string>) {
      const index = state.ids.indexOf(action.payload);

      if (action.payload === state.selectedId) {
        if (index === 0) {
          state.selectedId = null;
          state.isEmpty = true;
        } else if (index === state.ids.length - 1) {
          state.selectedId = state.ids[index - 1];
        } else {
          state.selectedId = state.ids[index + 1];
        }
      }

      state.ids.splice(index, 1);
      delete state.byId[action.payload];
    },
    setMonitorHeight(
      state: MonitorsState,
      action: PayloadAction<{ id: string; heightPixels: number }>
    ) {
      const monitor = action.payload;
      state.byId[monitor.id].heightPixels = monitor.heightPixels;
    },
    setMonitorWidth(
      state: MonitorsState,
      action: PayloadAction<{ id: string; widthPixels: number }>
    ) {
      const monitor = action.payload;
      state.byId[monitor.id].widthPixels = monitor.widthPixels;
    },
    setMonitorDiagonal(
      state: MonitorsState,
      action: PayloadAction<{ id: string; diagonalInches: number }>
    ) {
      const monitor = action.payload;
      state.byId[monitor.id].diagonalInches = monitor.diagonalInches;
    },
  },
});

export function selectMonitor(id: string): (state: RootState) => Monitor {
  return (state: RootState) => state.monitors.byId[id];
}

export const {
  addMonitor,
  removeMonitor,
  setMonitorDiagonal,
  setMonitorHeight,
  setMonitorWidth,
} = monitorsSlice.actions;

export default monitorsSlice.reducer;
