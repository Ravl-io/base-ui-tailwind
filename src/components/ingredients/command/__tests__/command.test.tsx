import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeAll } from "vitest";

beforeAll(() => {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  Element.prototype.scrollIntoView = vi.fn();
});

vi.mock("@/components/ingredients/dialog", () => ({
  Dialog: ({ children }: Record<string, unknown>) => <div>{children as React.ReactNode}</div>,
  DialogContent: ({ children }: Record<string, unknown>) => <div>{children as React.ReactNode}</div>,
  DialogDescription: ({ children }: Record<string, unknown>) => <p>{children as React.ReactNode}</p>,
  DialogHeader: ({ children }: Record<string, unknown>) => <div>{children as React.ReactNode}</div>,
  DialogTitle: ({ children }: Record<string, unknown>) => <h2>{children as React.ReactNode}</h2>,
}));

vi.mock("@/components/ingredients/input-group", () => ({
  InputGroup: ({ children, className, ...props }: Record<string, unknown>) => <div className={className as string} {...props}>{children as React.ReactNode}</div>,
  InputGroupAddon: ({ children }: Record<string, unknown>) => <div>{children as React.ReactNode}</div>,
}));

import { Command, CommandDialog } from "../index";

describe("CommandDialog", () => {
  describe("default props", () => {
    it("should render with default title and description", () => {
      render(
        <CommandDialog open>
          <Command>dialog content</Command>
        </CommandDialog>,
      );
      expect(screen.getByText("Command Palette")).toBeInTheDocument();
      expect(screen.getByText("Search for a command to run...")).toBeInTheDocument();
    });

    it("should render with custom title and description", () => {
      render(
        <CommandDialog open title="Custom Title" description="Custom description">
          <Command>dialog content</Command>
        </CommandDialog>,
      );
      expect(screen.getByText("Custom Title")).toBeInTheDocument();
      expect(screen.getByText("Custom description")).toBeInTheDocument();
    });
  });
});
