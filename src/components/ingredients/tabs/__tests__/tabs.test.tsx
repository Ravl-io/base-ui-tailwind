import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../index";

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

describe("TabsTrigger", () => {
  it("should render", () => {
    render(
      <Tabs>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
      </Tabs>,
    );
    expect(screen.getByRole("tab")).toHaveTextContent("Tab 1");
  });
});

describe("TabsContent", () => {
  it("should render", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
      </Tabs>,
    );
    expect(screen.getByText("Content 1")).toBeInTheDocument();
  });
});
