import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import authReducer from "./redux/authReducer";
import usersReducer from "./redux/usersReducer";

// Mock useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
});

const defaultPreloadedState = {
  auth: { token: null, userName: "", loading: false, error: null },
  users: { users: [], loading: false, error: null },
};

const renderWithProviders = (
  ui,
  {
    preloadedState = defaultPreloadedState,
    store = createStore(rootReducer, preloadedState, applyMiddleware(thunk)),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      {children}
    </Provider>
  );

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export * from "@testing-library/react";
export { renderWithProviders as render };
