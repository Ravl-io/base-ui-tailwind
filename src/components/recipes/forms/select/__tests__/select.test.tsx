import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Select } from "../index";

const options = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
  { value: "c", label: "Option C", disabled: true },
];

describe("Select recipe", () => {
  describe("label and helper text", () => {
    it("should render label", () => {
      render(<Select id="color" label="Color" options={options} />);
      expect(screen.getByText("Color")).toBeInTheDocument();
    });

    it("should render helper text with correct id", () => {
      render(<Select id="color" label="Color" options={options} helperText="Pick a color" />);
      expect(screen.getByText("Pick a color")).toHaveAttribute("id", "color-helper");
    });

    it("should render placeholder", () => {
      render(<Select id="color" label="Color" options={options} placeholder="Choose..." />);
      expect(screen.getByText("Choose...")).toBeInTheDocument();
    });
  });

  describe("error handling", () => {
    it("should render error with correct id", () => {
      render(<Select id="color" label="Color" options={options} error="Required" />);
      expect(screen.getByText("Required")).toBeInTheDocument();
      const errorEl = screen.getByText("Required").closest("[id='color-error']");
      expect(errorEl).toBeInTheDocument();
    });

    it("should set data-invalid on field when error exists", () => {
      render(<Select id="color" label="Color" options={options} error="Required" />);
      const field = document.querySelector("[data-slot='field']");
      expect(field).toHaveAttribute("data-invalid", "true");
    });

    it("should not render error when not provided", () => {
      render(<Select id="color" label="Color" options={options} />);
      const errorEl = document.querySelector("[id='color-error']");
      expect(errorEl).not.toBeInTheDocument();
    });
  });

  describe("aria-describedby", () => {
    it("should set aria-describedby on trigger with helper and error ids", () => {
      render(<Select id="color" label="Color" options={options} helperText="Help" error="Err" />);
      const trigger = document.querySelector("[data-slot='select-trigger']");
      const describedBy = trigger?.getAttribute("aria-describedby");
      expect(describedBy).toContain("color-helper");
      expect(describedBy).toContain("color-error");
    });
  });
});
