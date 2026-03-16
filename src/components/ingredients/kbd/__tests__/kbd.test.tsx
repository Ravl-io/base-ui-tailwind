import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Kbd, KbdGroup } from "../index";

describe("Kbd", () => {
  it("should render", () => {
    render(<Kbd>Ctrl</Kbd>);
    expect(screen.getByText("Ctrl")).toBeInTheDocument();
  });
});

describe("KbdGroup", () => {
  it("should render", () => {
    render(<KbdGroup>Group</KbdGroup>);
    expect(screen.getByText("Group")).toBeInTheDocument();
  });
});
