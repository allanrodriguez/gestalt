import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import drawerReducer from "./components/monitor-drawer/monitor-drawer-slice";
import headerReducer from "./components/header/header-slice";

export const reducer = combineReducers({
  drawer: drawerReducer,
  header: headerReducer,
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
