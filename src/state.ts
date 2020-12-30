import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import layoutReducer from "./components/layout/layout-slice";
import detailsDialogReducer from "./components/monitor-details-dialog/monitor-details-dialog-slice";
import monitorsReducer from "./components/monitors/monitors-slice";

export const reducer = combineReducers({
  detailsDialog: detailsDialogReducer,
  layout: layoutReducer,
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
