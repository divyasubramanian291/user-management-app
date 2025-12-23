import React from "react";
import { render, screen, fireEvent } from "../../test-utils";
import "@testing-library/jest-dom";
import UserToolbar from "../../components/UserToolbar";

test("renders Users heading, search and create button", () => {
  const onSearch = jest.fn();
  const onAdd = jest.fn();

  render(<UserToolbar onSearch={onSearch} onAdd={onAdd} />);

  expect(screen.getByText(/users/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/input search text/i)).toBeInTheDocument();
  const btn = screen.getByRole("button", { name: /create user/i });
  expect(btn).toBeInTheDocument();

  fireEvent.click(btn);
  expect(onAdd).toHaveBeenCalled();
});