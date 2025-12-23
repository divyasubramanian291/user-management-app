import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "../../test-utils";
import UserListPage from "../../pages/UserListPage";

jest.mock("../../redux/usersActions", () => ({
  fetchUsers: () => () => Promise.resolve(),
}));

test("renders users page with toolbar and table", () => {
  const preloaded = {
    auth: { token: "t", userName: "Divya", loading: false, error: null },
    users: {
      users: [
        { id: 1, first_name: "Ethan", last_name: "Brown", email: "ethan.brown@mail.com", avatar: "" },
      ],
      loading: false,
      error: null,
    },
  };

  render(<UserListPage />, { preloadedState: preloaded });

  expect(screen.getByText(/users/i)).toBeInTheDocument();
  expect(screen.getByText("ethan.brown@mail.com")).toBeInTheDocument();
});
