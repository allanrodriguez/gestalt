import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render as rtlRender, RenderResult } from "@testing-library/react";
import { initialState as reducerInitialState, reducer } from "../state";

function render(
  ui: React.ReactElement,
  {
    initialState = reducerInitialState,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {}
): RenderResult {
  const Wrapper: React.FC = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";

export { render };
