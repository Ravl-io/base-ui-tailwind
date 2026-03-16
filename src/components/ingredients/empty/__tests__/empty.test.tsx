import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from "../index";

describe("Empty", () => {
  it("should render with all sub-components", () => {
    render(
      <Empty>
        <EmptyHeader>
          <EmptyMedia>Icon</EmptyMedia>
          <EmptyTitle>No data</EmptyTitle>
          <EmptyDescription>Try again later</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>Action</EmptyContent>
      </Empty>,
    );
    expect(screen.getByText("No data")).toBeInTheDocument();
    expect(screen.getByText("Try again later")).toBeInTheDocument();
  });
});

describe("EmptyMedia", () => {
  describe("variant", () => {
    it("should default variant to default", () => {
      render(<EmptyMedia data-testid="media">Icon</EmptyMedia>);
      expect(screen.getByTestId("media")).toHaveAttribute("data-variant", "default");
    });

    it("should set variant to icon when provided", () => {
      render(<EmptyMedia data-testid="media" variant="icon">Icon</EmptyMedia>);
      expect(screen.getByTestId("media")).toHaveAttribute("data-variant", "icon");
    });
  });
});
