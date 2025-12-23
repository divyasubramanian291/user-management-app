import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "../../test-utils";
import Header from "../../components/Header";

test("shows username in header", () => {
  const preloaded = {
    auth: { token: "t", userName: "Divya Demo", loading: false, error: null },
    users: { users: [], loading: false, error: null },
  };

  render(<Header />, { preloadedState: preloaded });

  expect(screen.getByText("Divya Demo")).toBeInTheDocument();
});

test("header renders without crashing", () => {
  const preloaded = {
    auth: { token: "t", userName: "Divya Demo", loading: false, error: null },
    users: { users: [], loading: false, error: null },
  };

  render(<Header />, { preloadedState: preloaded });

  expect(screen.getByText("Divya Demo")).toBeInTheDocument();
});