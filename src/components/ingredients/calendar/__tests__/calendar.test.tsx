import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Calendar } from "../index";

describe("Calendar", () => {
  describe("defaults", () => {
    it("should show outside days by default", () => {
      const { container } = render(<Calendar />);
      const outsideDays = container.querySelectorAll("[data-outside]");
      expect(outsideDays.length).toBeGreaterThan(0);
    });
  });

  describe("navigation", () => {
    it("should render prev and next navigation buttons", () => {
      const { container } = render(<Calendar />);
      const prevButton = container.querySelector(".rdp-button_previous");
      const nextButton = container.querySelector(".rdp-button_next");
      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    });
  });
});
