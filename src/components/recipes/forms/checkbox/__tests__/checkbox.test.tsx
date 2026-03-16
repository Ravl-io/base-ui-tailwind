import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Checkbox } from "../index";

describe("Checkbox recipe", () => {
  it("renders label text", () => {
    render(<Checkbox id="terms" label="Accept terms" />);
    expect(screen.getByText("Accept terms")).toBeInTheDocument();
  });

  it("renders the checkbox with aria-labelledby linking to label id", () => {
    render(<Checkbox id="terms" label="Accept terms" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("aria-labelledby", "terms-label");
  });

  it("renders helper text with correct id", () => {
    render(<Checkbox id="terms" label="Accept" helperText="You must agree" />);
    expect(screen.getByText("You must agree")).toHaveAttribute("id", "terms-helper");
  });

  it("renders error message with correct id", () => {
    render(<Checkbox id="terms" label="Accept" error="Required" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
    expect(screen.getByRole("alert")).toHaveAttribute("id", "terms-error");
  });

  it("sets aria-invalid when error is present", () => {
    render(<Checkbox id="terms" label="Accept" error="Required" />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("does not set aria-invalid when no error", () => {
    render(<Checkbox id="terms" label="Accept" />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-invalid", "false");
  });

  it("sets aria-describedby with helper and error ids", () => {
    render(<Checkbox id="terms" label="Accept" helperText="Help" error="Err" />);
    const describedBy = screen.getByRole("checkbox").getAttribute("aria-describedby");
    expect(describedBy).toContain("terms-helper");
    expect(describedBy).toContain("terms-error");
  });

  it("does not render helper text when not provided", () => {
    render(<Checkbox id="terms" label="Accept" />);
    expect(screen.queryByText("terms-helper")).not.toBeInTheDocument();
  });

  it("does not render error when not provided", () => {
    render(<Checkbox id="terms" label="Accept" />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("sets data-invalid on field when error exists", () => {
    render(<Checkbox id="terms" label="Accept" error="Required" />);
    expect(screen.getByRole("group")).toHaveAttribute("data-invalid", "true");
  });
});
