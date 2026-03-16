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


import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "../index";

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

describe("Command", () => {
  it("should render with sub-components", () => {
    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandGroup heading="Actions">
            <CommandItem>
              Copy <CommandShortcut>Ctrl+C</CommandShortcut>
            </CommandItem>
            <CommandSeparator />
            <CommandItem>Paste</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>,
    );
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    expect(screen.getByText("Ctrl+C")).toBeInTheDocument();
  });

  it("should render CommandEmpty", () => {
    render(
      <Command>
        <CommandList>
          <CommandEmpty>No results</CommandEmpty>
        </CommandList>
      </Command>,
    );
    expect(screen.getByText("No results")).toBeInTheDocument();
  });
});
