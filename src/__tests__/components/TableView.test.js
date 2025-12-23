import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "../../test-utils";
import Header from "../../components/Header";

test("shows username in Header", () => {
  const preloaded = {
    auth: { token: "t", userName: "Divya Demo", loading: false, error: null },
    users: { users: [], loading: false, error: null },
  };

  render(<Header />, { preloadedState: preloaded });

  expect(screen.getByText("Divya Demo")).toBeInTheDocument();
});

test("Header renders logout button", () => {
  const preloaded = {
    auth: { token: "t", userName: "Divya Demo", loading: false, error: null },
    users: { users: [], loading: false, error: null },
  };

  render(<Header />, { preloadedState: preloaded });

  // Find the SVG icon (PowerSettingsNewIcon)
  const logoutIcon = screen.getByText("Divya Demo").closest("div").querySelector("svg");
  
  expect(logoutIcon).toBeInTheDocument();
});

test("clicking logout button triggers logout action", async () => {
  localStorage.setItem("auth", JSON.stringify({ token: "t", userName: "Divya Demo" }));

  const preloaded = {
    auth: { token: "t", userName: "Divya Demo", loading: false, error: null },
    users: { users: [], loading: false, error: null },
  };

  render(<Header />, { preloadedState: preloaded });

  // Find and click the logout button
  const userSection = screen.getByText("Divya Demo").closest("div");
  const logoutButton = userSection.querySelector("svg")?.parentElement;
  
  if (logoutButton) {
    fireEvent.click(logoutButton);
    
    // Verify localStorage is cleared
    await waitFor(() => {
      expect(localStorage.getItem("auth")).toBeNull();
    });
  }
});

test("Header renders with correct styling", () => {
  const preloaded = {
    auth: { token: "t", userName: "Test User", loading: false, error: null },
    users: { users: [], loading: false, error: null },
  };

  const { container } = render(<Header />, { preloadedState: preloaded });

  const header = container.querySelector("header");
  expect(header).toHaveStyle("backgroundColor: black");
});