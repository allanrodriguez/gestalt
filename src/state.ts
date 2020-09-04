import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import detailsDialogReducer from "./components/monitor-details-dialog/monitor-details-dialog-slice";
import drawerReducer from "./components/monitor-drawer/monitor-drawer-slice";
import headerReducer from "./components/header/header-slice";
import monitorsReducer from "./components/monitors/monitors-slice";

export const reducer = combineReducers({
  detailsDialog: detailsDialogReducer,
  drawer: drawerReducer,
  header: headerReducer,
  monitors: monitorsReducer,
});

export const store = configureStore({ reducer });

export const initialState = store.getState();

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
