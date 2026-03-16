import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ButtonGroup, ButtonGroupText, ButtonGroupSeparator } from "../index";

describe("ButtonGroup", () => {
  describe("orientation", () => {
    it("should render with role group", () => {
      render(<ButtonGroup>content</ButtonGroup>);
      expect(screen.getByRole("group")).toBeInTheDocument();
    });

    it("should set orientation to vertical when provided", () => {
      render(<ButtonGroup data-testid="group" orientation="vertical">content</ButtonGroup>);
      expect(screen.getByTestId("group")).toHaveAttribute("data-orientation", "vertical");
    });
  });
});

describe("ButtonGroupText", () => {
  it("should render", () => {
    render(<ButtonGroupText>Label</ButtonGroupText>);
    expect(screen.getByText("Label")).toBeInTheDocument();
  });
});

describe("ButtonGroupSeparator", () => {
  it("should render", () => {
    render(<ButtonGroupSeparator data-testid="sep" />);
    expect(screen.getByTestId("sep")).toBeInTheDocument();
  });
});
