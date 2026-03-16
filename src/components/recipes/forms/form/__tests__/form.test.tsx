import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("@/components/ingredients/button", () => ({
  Button: ({ children, onClick, type, disabled, isLoading, className, ...props }: Record<string, unknown>) => (
    <button
      type={type as string}
      onClick={onClick as React.MouseEventHandler}
      disabled={(disabled || isLoading) as boolean}
      aria-busy={isLoading ? "true" : undefined}
      className={className as string}
      {...props}
    >
      {children as React.ReactNode}
    </button>
  ),
}));

import { Form } from "../index";

describe("Form", () => {
  const defaultProps = {
    name: "test-form",
    onSubmit: vi.fn(),
    labels: { submit: "Save" },
  };

  it("renders a form with aria-label", () => {
    render(<Form {...defaultProps}><input /></Form>);
    expect(screen.getByRole("form")).toHaveAttribute("aria-label", "test-form");
  });

  it("sets noValidate on the form", () => {
    render(<Form {...defaultProps}><input /></Form>);
    expect(screen.getByRole("form")).toHaveAttribute("novalidate");
  });

  it("renders submit button with label", () => {
    render(<Form {...defaultProps}><input /></Form>);
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("calls onSubmit and prevents default on submit", () => {
    const onSubmit = vi.fn();
    render(<Form {...defaultProps} onSubmit={onSubmit}><input /></Form>);
    fireEvent.submit(screen.getByRole("form"));
    expect(onSubmit).toHaveBeenCalledOnce();
  });

  it("renders cancel button when onCancel is provided", () => {
    const onCancel = vi.fn();
    render(
      <Form {...defaultProps} onCancel={onCancel} labels={{ submit: "Save", cancel: "Cancel" }}>
        <input />
      </Form>,
    );
    const cancelBtn = screen.getByText("Cancel");
    expect(cancelBtn).toBeInTheDocument();
    fireEvent.click(cancelBtn);
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it("does not render cancel button when onCancel is not provided", () => {
    render(<Form {...defaultProps}><input /></Form>);
    expect(screen.queryByText("Cancel")).not.toBeInTheDocument();
  });

  it("renders reset button when onReset is provided", () => {
    const onReset = vi.fn();
    render(
      <Form {...defaultProps} onReset={onReset} labels={{ submit: "Save", reset: "Reset" }}>
        <input />
      </Form>,
    );
    const resetBtn = screen.getByText("Reset");
    expect(resetBtn).toBeInTheDocument();
    fireEvent.click(resetBtn);
    expect(onReset).toHaveBeenCalledOnce();
  });

  it("does not render reset button when onReset is not provided", () => {
    render(<Form {...defaultProps}><input /></Form>);
    expect(screen.queryByText("Reset")).not.toBeInTheDocument();
  });

  it("renders error alert when error is provided", () => {
    render(<Form {...defaultProps} error="Something went wrong"><input /></Form>);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Something went wrong");
    expect(alert).toHaveAttribute("aria-live", "assertive");
  });

  it("does not render error alert when error is not provided", () => {
    render(<Form {...defaultProps}><input /></Form>);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("forwards className to form element", () => {
    render(<Form {...defaultProps} className="custom"><input /></Form>);
    expect(screen.getByRole("form")).toHaveClass("custom");
  });

  it("renders children", () => {
    render(
      <Form {...defaultProps}>
        <input aria-label="name" />
      </Form>,
    );
    expect(screen.getByRole("textbox", { name: "name" })).toBeInTheDocument();
  });

  it("uses fallback label when labels.cancel is undefined", () => {
    render(
      <Form {...defaultProps} onCancel={vi.fn()} labels={{ submit: "Save" }}>
        <input />
      </Form>,
    );
    expect(screen.getByText("labels.cancel")).toBeInTheDocument();
  });
});
