import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("@base-ui/react/tabs", () => {
  const React = require("react");
  const Root = React.forwardRef(({ children, className, ...props }: Record<string, unknown>, ref: React.Ref<HTMLDivElement>) => (
    <div ref={ref} className={className as string} {...props}>{children as React.ReactNode}</div>
  ));
  const List = React.forwardRef(({ children, className, ...props }: Record<string, unknown>, ref: React.Ref<HTMLDivElement>) => (
    <div ref={ref} role="tablist" className={className as string} {...props}>{children as React.ReactNode}</div>
  ));
  const Tab = React.forwardRef(({ children, className, ...props }: Record<string, unknown>, ref: React.Ref<HTMLButtonElement>) => (
    <button ref={ref} role="tab" className={className as string} {...props}>{children as React.ReactNode}</button>
  ));
  const Panel = React.forwardRef(({ children, className, ...props }: Record<string, unknown>, ref: React.Ref<HTMLDivElement>) => (
    <div ref={ref} role="tabpanel" className={className as string} {...props}>{children as React.ReactNode}</div>
  ));
  return { Tabs: { Root, List, Tab, Panel } };
});

import { Tabs, TabsList } from "../index";

describe("Tabs", () => {
  describe("orientation", () => {
    it("should default orientation to horizontal", () => {
      render(<Tabs data-testid="tabs"><div /></Tabs>);
      expect(screen.getByTestId("tabs")).toHaveAttribute("data-orientation", "horizontal");
    });

    it("should set orientation to vertical when provided", () => {
      render(<Tabs data-testid="tabs" orientation="vertical"><div /></Tabs>);
      expect(screen.getByTestId("tabs")).toHaveAttribute("data-orientation", "vertical");
    });
  });
});

describe("TabsList", () => {
  describe("variant", () => {
    it("should default variant to default", () => {
      render(<Tabs><TabsList /></Tabs>);
      expect(screen.getByRole("tablist")).toHaveAttribute("data-variant", "default");
    });

    it("should set variant to line when provided", () => {
      render(<Tabs><TabsList variant="line" /></Tabs>);
      expect(screen.getByRole("tablist")).toHaveAttribute("data-variant", "line");
    });
  });
});
