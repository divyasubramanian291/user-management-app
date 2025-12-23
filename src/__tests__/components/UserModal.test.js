import React from "react";
import { render, screen, fireEvent } from "../../test-utils";
import UserModal from "../../components/UserModal";

test("create modal validation and submit", () => {
  const onSave = jest.fn();
  const onClose = jest.fn();

  render(<UserModal open={true} onClose={onClose} onSave={onSave} user={null} />);

  // Submit with empty fields should not call onSave (validation)
  const submitBtn = screen.getByRole("button", { name: /submit/i });
  fireEvent.click(submitBtn);
  expect(onSave).not.toHaveBeenCalled();

  // Fill required fields
  fireEvent.change(screen.getByPlaceholderText(/enter first name/i) || screen.getByLabelText(/first name/i), {
    target: { value: "Test" },
  });
  fireEvent.change(screen.getByPlaceholderText(/enter last name/i) || screen.getByLabelText(/last name/i), {
    target: { value: "User" },
  });
  fireEvent.change(screen.getByPlaceholderText(/enter email address/i) || screen.getByLabelText(/email/i), {
    target: { value: "test@x.com" },
  });
  fireEvent.change(screen.getByPlaceholderText(/enter profile image link/i) || screen.getByLabelText(/profile image link/i), {
    target: { value: "http://img" },
  });

  fireEvent.click(submitBtn);
  expect(onSave).toHaveBeenCalled();
  expect(onClose).toHaveBeenCalled();
});