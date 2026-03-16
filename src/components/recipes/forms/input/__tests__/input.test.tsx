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

vi.mock("@/components/ingredients/input", () => ({
  Input: (props: Record<string, unknown>) => <input {...props} />,
}));

import { Input } from "../index";

describe("Input recipe", () => {
  it("renders label and input", () => {
    render(<Input id="email" label="Email" />);
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("sets input id from prop", () => {
    render(<Input id="email" label="Email" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("id", "email");
  });

  it("renders helper text with correct id", () => {
    render(<Input id="email" label="Email" helperText="We won't share your email" />);
    expect(screen.getByText("We won't share your email")).toHaveAttribute("id", "email-helper");
  });

  it("sets aria-describedby when helperText is provided", () => {
    render(<Input id="email" label="Email" helperText="Help text" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-describedby", expect.stringContaining("email-helper"));
  });

  it("renders error message with correct id", () => {
    render(<Input id="email" label="Email" error="Required" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
    expect(screen.getByRole("alert")).toHaveAttribute("id", "email-error");
  });

  it("sets aria-invalid when error is present", () => {
    render(<Input id="email" label="Email" error="Required" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("does not set aria-invalid when no error", () => {
    render(<Input id="email" label="Email" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "false");
  });

  it("does not render helper text when not provided", () => {
    render(<Input id="email" label="Email" />);
    expect(screen.queryByText("email-helper")).not.toBeInTheDocument();
  });

  it("does not render error when not provided", () => {
    render(<Input id="email" label="Email" />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("sets data-invalid on field when error exists", () => {
    render(<Input id="email" label="Email" error="Required" />);
    expect(screen.getByRole("group")).toHaveAttribute("data-invalid", "true");
  });

  it("sets aria-describedby with both helper and error ids", () => {
    render(<Input id="email" label="Email" helperText="Help" error="Error" />);
    const describedBy = screen.getByRole("textbox").getAttribute("aria-describedby");
    expect(describedBy).toContain("email-helper");
    expect(describedBy).toContain("email-error");
  });
});
