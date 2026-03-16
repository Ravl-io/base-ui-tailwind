import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Switch } from "../index";

describe("Switch", () => {
  describe("size prop", () => {
    it("should default data-size to 'default'", () => {
      render(<Switch />);
      expect(screen.getByRole("switch")).toHaveAttribute("data-size", "default");
    });

    it("should set data-size='sm' when size='sm'", () => {
      render(<Switch size="sm" />);
      expect(screen.getByRole("switch")).toHaveAttribute("data-size", "sm");
    });
  });
});
