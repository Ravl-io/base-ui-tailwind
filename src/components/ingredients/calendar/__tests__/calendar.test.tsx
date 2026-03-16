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

  describe("captionLayout", () => {
    it("should render dropdown layout when captionLayout is dropdown", () => {
      const { container } = render(
        <Calendar captionLayout="dropdown" fromYear={2020} toYear={2030} />,
      );
      expect(container.querySelector(".rdp-dropdowns")).toBeInTheDocument();
    });
  });

  describe("CalendarDayButton", () => {
    it("should render day buttons with data-day attribute", () => {
      const { container } = render(<Calendar defaultMonth={new Date(2025, 0)} />);
      const dayButtons = container.querySelectorAll("[data-day]");
      expect(dayButtons.length).toBeGreaterThan(0);
    });

    it("should render selected day with data-selected-single", () => {
      const { container } = render(
        <Calendar
          mode="single"
          selected={new Date(2025, 0, 15)}
          defaultMonth={new Date(2025, 0)}
        />,
      );
      const selected = container.querySelector("[data-selected-single='true']");
      expect(selected).toBeInTheDocument();
    });
  });
});
