import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "../../test-utils";
import ViewToggle from "../../components/ViewToggle";

test("renders both buttons and toggles view", () => {
  const setter = jest.fn();
  render(<ViewToggle view="table" setView={setter} />);

  const tableBtn = screen.getByRole("button", { name: /table/i });
  const cardBtn = screen.getByRole("button", { name: /card/i });

  expect(tableBtn).toBeInTheDocument();
  expect(cardBtn).toBeInTheDocument();

  fireEvent.click(cardBtn);
  expect(setter).toHaveBeenCalledWith("card");

  fireEvent.click(tableBtn);
  expect(setter).toHaveBeenCalledWith("table");
});