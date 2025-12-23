import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "../test-utils";
import App from "../App";

describe("App Component", () => {
  test("renders app without crashing and shows login button when token is missing", () => {
    render(<App />); // uses default preloadedState from test-utils

    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });
});
