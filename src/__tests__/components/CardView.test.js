import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, within } from "../../test-utils";
import UserCards from "../../components/CardView";

const users = [
  { id: 1, first_name: "Ethan", last_name: "Brown", email: "ethan.brown@mail.com", avatar: "" },
  { id: 2, first_name: "Charlie", last_name: "Leeee", email: "charlie.lee@mail.com", avatar: "" },
];

test("renders cards with user data", () => {
  const onEdit = jest.fn();
  const onDelete = jest.fn();

  render(<UserCards users={users} onEdit={onEdit} onDelete={onDelete} />);

  expect(screen.getByText(/ethan brown/i)).toBeInTheDocument();
  expect(screen.getByText(/charlie leeee/i)).toBeInTheDocument();
  expect(screen.getByText("ethan.brown@mail.com")).toBeInTheDocument();
  expect(screen.getByText("charlie.lee@mail.com")).toBeInTheDocument();
});

test("card edit and delete buttons trigger callbacks", () => {
  const onEdit = jest.fn();
  const onDelete = jest.fn();

  render(<UserCards users={users} onEdit={onEdit} onDelete={onDelete} />);

  // Find all icon buttons (Edit and Delete are icon buttons)
  const editIcons = screen.getAllByTestId("EditIcon");
  const deleteIcons = screen.getAllByTestId("DeleteIcon");

  expect(editIcons.length).toBeGreaterThanOrEqual(1);
  expect(deleteIcons.length).toBeGreaterThanOrEqual(1);

  // Click first edit button (should trigger onEdit for first user)
  const firstEditButton = editIcons[0].closest("button");
  fireEvent.click(firstEditButton);
  expect(onEdit).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));

  // Click first delete button (should trigger onDelete for first user)
  const firstDeleteButton = deleteIcons[0].closest("button");
  fireEvent.click(firstDeleteButton);
  expect(onDelete).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
});