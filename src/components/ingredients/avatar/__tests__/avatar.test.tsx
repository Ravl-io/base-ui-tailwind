import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Avatar } from "../index";

describe("Avatar", () => {
  describe("size", () => {
    it("should default size to default", () => {
      render(<Avatar data-testid="avatar" />);
      expect(screen.getByTestId("avatar")).toHaveAttribute("data-size", "default");
    });

    it("should set size to sm", () => {
      render(<Avatar data-testid="avatar" size="sm" />);
      expect(screen.getByTestId("avatar")).toHaveAttribute("data-size", "sm");
    });

    it("should set size to lg", () => {
      render(<Avatar data-testid="avatar" size="lg" />);
      expect(screen.getByTestId("avatar")).toHaveAttribute("data-size", "lg");
    });
  });
});
