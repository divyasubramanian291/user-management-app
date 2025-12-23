import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "../../test-utils";
import LoginPage from "../../pages/LoginPage";

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});

afterEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});

test("renders login form with email and password fields", () => {
  render(<LoginPage />);

  expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
});

test("renders remember me checkbox", () => {
  render(<LoginPage />);

  const checkbox = screen.getByRole("checkbox", { name: /remember me/i });
  expect(checkbox).toBeInTheDocument();
});

test("pre-fills email from localStorage if available", () => {
  const storedAuth = { token: "test-token", userName: "charlie.lee@mail.com" };
  localStorage.setItem("auth", JSON.stringify(storedAuth));

  render(<LoginPage />);

  const emailInput = screen.getByPlaceholderText(/email/i);
  expect(emailInput.value).toBe("charlie.lee@mail.com");
});

test("password field is empty initially", () => {
  render(<LoginPage />);

  const passwordInput = screen.getByPlaceholderText(/password/i);
  expect(passwordInput.value).toBe("");
});

test("allows user to change email and password", () => {
  render(<LoginPage />);

  const emailInput = screen.getByPlaceholderText(/email/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "testpassword" } });

  expect(emailInput.value).toBe("test@example.com");
  expect(passwordInput.value).toBe("testpassword");
});

test("allows toggling remember me checkbox", () => {
  render(<LoginPage />);

  const checkbox = screen.getByRole("checkbox", { name: /remember me/i });
  expect(checkbox.checked).toBe(false);

  fireEvent.click(checkbox);
  expect(checkbox.checked).toBe(true);

  fireEvent.click(checkbox);
  expect(checkbox.checked).toBe(false);
});

test("remember me checkbox is checked if auth in localStorage", () => {
  const storedAuth = { token: "test-token", userName: "test@example.com" };
  localStorage.setItem("auth", JSON.stringify(storedAuth));

  render(<LoginPage />);

  const checkbox = screen.getByRole("checkbox", { name: /remember me/i });
  expect(checkbox.checked).toBe(true);
});