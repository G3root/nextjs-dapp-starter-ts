/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "@/pages";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /Solidity Full-Stack Dapp Starter/,
    });

    expect(heading).toBeInTheDocument();
  });
  it("renders a input", () => {
    render(<Home />);

    const input = screen.getByRole("textbox", {
      name: /Input text/,
    });

    expect(input).toBeInTheDocument();
  });
  it("renders a button", () => {
    render(<Home />);

    const button = screen.getByRole("button", {
      name: /Set new value to store/,
    });

    expect(button).toBeInTheDocument();
  });
});
