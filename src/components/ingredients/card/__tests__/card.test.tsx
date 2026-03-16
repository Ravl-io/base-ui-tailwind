import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Card } from "../index";

describe("Card", () => {
  describe("size", () => {
    it("should default size to default", () => {
      render(<Card data-testid="card">Content</Card>);
      expect(screen.getByTestId("card")).toHaveAttribute("data-size", "default");
    });

    it("should set size to sm when provided", () => {
      render(<Card data-testid="card" size="sm">Content</Card>);
      expect(screen.getByTestId("card")).toHaveAttribute("data-size", "sm");
    });
  });
});
