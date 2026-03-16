import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AspectRatio } from "../index";

describe("AspectRatio", () => {
  describe("CSS variable", () => {
    it("should set --ratio CSS variable from ratio prop", () => {
      render(<AspectRatio ratio={16 / 9} data-testid="ar" />);
      const el = screen.getByTestId("ar");
      expect(el.style.getPropertyValue("--ratio")).toBe(String(16 / 9));
    });

    it("should update --ratio for different values", () => {
      render(<AspectRatio ratio={4 / 3} data-testid="ar" />);
      const el = screen.getByTestId("ar");
      expect(el.style.getPropertyValue("--ratio")).toBe(String(4 / 3));
    });
  });
});
