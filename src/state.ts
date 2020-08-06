import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import headerReducer from "./components/header/header-slice"

export const store = configureStore({
  reducer: {
    header: headerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
