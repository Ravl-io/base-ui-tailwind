import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("@/components/ingredients/field", () => ({
  Field: ({ children, ...props }: Record<string, unknown>) => (
    <div role="group" {...props}>{children as React.ReactNode}</div>
  ),
  FieldLabel: ({ children, ...props }: Record<string, unknown>) => (
    <label {...props}>{children as React.ReactNode}</label>
  ),
  FieldDescription: ({ children, ...props }: Record<string, unknown>) => (
    <p {...props}>{children as React.ReactNode}</p>
  ),
  FieldError: ({ children, errors, ...props }: Record<string, unknown>) => {
    const msg = children || (errors as Array<{ message: string }> | undefined)?.[0]?.message;
    return msg ? <div role="alert" {...props}>{msg as React.ReactNode}</div> : null;
  },
}));

vi.mock("@/components/ingredients/checkbox", () => ({
  Checkbox: (props: Record<string, unknown>) => <input type="checkbox" role="checkbox" {...props} />,
}));

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
