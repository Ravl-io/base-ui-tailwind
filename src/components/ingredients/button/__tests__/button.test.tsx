import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "../index";

describe("Button", () => {
  describe("loading state", () => {
    it("should prevent click when loading", () => {
      const onClick = vi.fn();
      render(<Button isLoading onClick={onClick}>Save</Button>);

      fireEvent.click(screen.getByRole("button"));
      expect(onClick).not.toHaveBeenCalled();
    });

    it("should set aria-disabled and aria-busy when loading", () => {
      render(<Button isLoading>Save</Button>);
      const button = screen.getByRole("button");

      expect(button).toHaveAttribute("aria-disabled", "true");
      expect(button).toHaveAttribute("aria-busy", "true");
    });

    it("should render sr-only loading label with default fallback", () => {
      render(<Button isLoading>Save</Button>);

      expect(screen.getByText("label.loading")).toBeInTheDocument();
    });

    it("should render sr-only loading label with custom text", () => {
      render(<Button isLoading label={{ loading: "Saving…" }}>Save</Button>);

      expect(screen.getByText("Saving…")).toBeInTheDocument();
    });

    it("should not render sr-only loading label when not loading", () => {
      render(<Button label={{ loading: "Saving…" }}>Save</Button>);

      expect(screen.queryByText("Saving…")).not.toBeInTheDocument();
    });
  });

  describe("disabled state", () => {
    it("should set aria-disabled when disabled", () => {
      render(<Button disabled>Save</Button>);

      expect(screen.getByRole("button")).toHaveAttribute("aria-disabled", "true");
    });
  });

  describe("click handling", () => {
    it("should call onClick when not loading or disabled", () => {
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Save</Button>);

      fireEvent.click(screen.getByRole("button"));
      expect(onClick).toHaveBeenCalledOnce();
    });
  });
});
