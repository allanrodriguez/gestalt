import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render as rtlRender } from "@testing-library/react";
import { initialState as reducerInitialState, reducer } from "../state";

interface WrapperProps {
  children: React.ReactNode;
}

function render(
  ui: React.ReactElement,
  {
    initialState = reducerInitialState,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }: WrapperProps) {
    return <Provider store={store}>{children}</Provider>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";

export { render };
