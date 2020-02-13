import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import { getData as mockGetData } from "../api";
import StarWarsCharacters from "./StarWarsCharacters";

jest.mock("../api");

test("renders the chracters data, next button and previous button", async () => {
  mockGetData.mockResolvedValueOnce({
    results: [
      {
        name: "Luke Skywalker",
        height: "172",
        mass: "77",
        hair_color: "blond",
        skin_color: "fair"
      }
    ],
    next: "abcde",
    previous: "abcd"
  });

  const { getByText } = render(<StarWarsCharacters />);

  const nextButton = getByText(/next/i);
  const prevButton = getByText(/previous/i);

  fireEvent.click(nextButton);
  fireEvent.click(prevButton);

  expect(mockGetData).toHaveBeenCalledTimes(1);

  await wait(() => expect(getByText(/luke/i)));
});
