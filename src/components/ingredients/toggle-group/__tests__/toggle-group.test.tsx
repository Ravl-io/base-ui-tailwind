import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("@base-ui/react/toggle", () => ({
  Toggle: ({ children, className, ...props }: Record<string, unknown>) => (
    <button role="button" className={className as string} {...props}>{children as React.ReactNode}</button>
  ),
}));

vi.mock("@base-ui/react/toggle-group", () => ({
  ToggleGroup: ({ children, className, ...props }: Record<string, unknown>) => (
    <div role="group" className={className as string} {...props}>{children as React.ReactNode}</div>
  ),
}));

import { ToggleGroup, ToggleGroupItem } from "../index";

describe("ToggleGroup", () => {
  describe("context-driven props", () => {
    it("should set data-variant and data-size on group", () => {
      render(
        <ToggleGroup variant="outline" size="sm">
          <ToggleGroupItem value="a">A</ToggleGroupItem>
        </ToggleGroup>,
      );
      const group = screen.getByRole("group");
      expect(group).toHaveAttribute("data-variant", "outline");
      expect(group).toHaveAttribute("data-size", "sm");
    });

    it("should set data-orientation", () => {
      render(
        <ToggleGroup orientation="vertical">
          <ToggleGroupItem value="a">A</ToggleGroupItem>
        </ToggleGroup>,
      );
      expect(screen.getByRole("group")).toHaveAttribute("data-orientation", "vertical");
    });

    it("should set data-spacing", () => {
      render(
        <ToggleGroup spacing={2}>
          <ToggleGroupItem value="a">A</ToggleGroupItem>
        </ToggleGroup>,
      );
      expect(screen.getByRole("group")).toHaveAttribute("data-spacing", "2");
    });

    it("should pass variant from context to items", () => {
      render(
        <ToggleGroup variant="outline">
          <ToggleGroupItem value="a">A</ToggleGroupItem>
        </ToggleGroup>,
      );
      expect(screen.getByRole("button")).toHaveAttribute("data-variant", "outline");
    });

    it("should pass size from context to items", () => {
      render(
        <ToggleGroup size="lg">
          <ToggleGroupItem value="a">A</ToggleGroupItem>
        </ToggleGroup>,
      );
      expect(screen.getByRole("button")).toHaveAttribute("data-size", "lg");
    });
  });
});

describe("ToggleGroupItem", () => {
  it("should render without crashing", () => {
    render(
      <ToggleGroup>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
