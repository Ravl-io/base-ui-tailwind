import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../index";

describe("InputGroup", () => {
  it("should render without crashing", () => {
    render(<InputGroup data-testid="ig">content</InputGroup>);
    expect(screen.getByTestId("ig")).toBeInTheDocument();
  });

  it("should set data-slot attribute", () => {
    render(<InputGroup data-testid="ig">content</InputGroup>);
    expect(screen.getByTestId("ig")).toHaveAttribute("data-slot", "input-group");
  });

  it("should have role=group", () => {
    render(<InputGroup>content</InputGroup>);
    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  it("should forward className", () => {
    render(<InputGroup data-testid="ig" className="custom-class">content</InputGroup>);
    expect(screen.getByTestId("ig")).toHaveClass("custom-class");
  });
});

describe("InputGroupAddon", () => {
  it("should render without crashing", () => {
    render(
      <InputGroup>
        <InputGroupAddon data-testid="addon">$</InputGroupAddon>
      </InputGroup>,
    );
    expect(screen.getByTestId("addon")).toBeInTheDocument();
  });

  it("should set data-slot attribute", () => {
    render(
      <InputGroup>
        <InputGroupAddon data-testid="addon">$</InputGroupAddon>
      </InputGroup>,
    );
    expect(screen.getByTestId("addon")).toHaveAttribute("data-slot", "input-group-addon");
  });

  it("should default align to inline-start", () => {
    render(
      <InputGroup>
        <InputGroupAddon data-testid="addon">$</InputGroupAddon>
      </InputGroup>,
    );
    expect(screen.getByTestId("addon")).toHaveAttribute("data-align", "inline-start");
  });

  it("should set data-align for inline-end", () => {
    render(
      <InputGroup>
        <InputGroupAddon data-testid="addon" align="inline-end">%</InputGroupAddon>
      </InputGroup>,
    );
    expect(screen.getByTestId("addon")).toHaveAttribute("data-align", "inline-end");
  });

  it("should focus sibling input on click when not clicking a button", () => {
    render(
      <InputGroup>
        <InputGroupAddon data-testid="addon">$</InputGroupAddon>
        <InputGroupInput data-testid="input" />
      </InputGroup>,
    );
    fireEvent.click(screen.getByTestId("addon"));
    expect(screen.getByTestId("input")).toHaveFocus();
  });

  it("should not focus sibling input when clicking a button inside addon", () => {
    render(
      <InputGroup>
        <InputGroupAddon data-testid="addon">
          <button data-testid="btn">Click</button>
        </InputGroupAddon>
        <InputGroupInput data-testid="input" />
      </InputGroup>,
    );
    fireEvent.click(screen.getByTestId("btn"));
    expect(screen.getByTestId("input")).not.toHaveFocus();
  });
});

describe("InputGroupInput", () => {
  it("should render without crashing", () => {
    render(
      <InputGroup>
        <InputGroupInput data-testid="input" />
      </InputGroup>,
    );
    expect(screen.getByTestId("input")).toBeInTheDocument();
  });

  it("should set data-slot to input-group-control", () => {
    render(
      <InputGroup>
        <InputGroupInput data-testid="input" />
      </InputGroup>,
    );
    expect(screen.getByTestId("input")).toHaveAttribute("data-slot", "input-group-control");
  });

  it("should forward className", () => {
    render(
      <InputGroup>
        <InputGroupInput data-testid="input" className="custom-class" />
      </InputGroup>,
    );
    expect(screen.getByTestId("input")).toHaveClass("custom-class");
  });
});

describe("InputGroupText", () => {
  it("should render without crashing", () => {
    render(<InputGroupText>text</InputGroupText>);
    expect(screen.getByText("text")).toBeInTheDocument();
  });

  it("should render as a span element", () => {
    render(<InputGroupText>text</InputGroupText>);
    expect(screen.getByText("text").tagName).toBe("SPAN");
  });

  it("should forward className", () => {
    render(<InputGroupText className="custom-class">text</InputGroupText>);
    expect(screen.getByText("text")).toHaveClass("custom-class");
  });
});
