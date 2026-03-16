import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RadioGroup } from "../index";

const options = [
  { value: "red", label: "Red" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green", disabled: true },
];

describe("RadioGroup recipe", () => {
  describe("rendering", () => {
    it("should render the legend", () => {
      render(<RadioGroup id="color" label="Favorite color" options={options} />);
      expect(screen.getByText("Favorite color")).toBeInTheDocument();
    });

    it("should render all radio options", () => {
      render(<RadioGroup id="color" label="Favorite color" options={options} />);
      const radios = screen.getAllByRole("radio");
      expect(radios).toHaveLength(3);
    });

    it("should render labels for each option", () => {
      render(<RadioGroup id="color" label="Favorite color" options={options} />);
      expect(screen.getByText("Red")).toBeInTheDocument();
      expect(screen.getByText("Blue")).toBeInTheDocument();
      expect(screen.getByText("Green")).toBeInTheDocument();
    });
  });

  describe("ID generation", () => {
    it("should set aria-labelledby on each radio to its label id", () => {
      render(<RadioGroup id="color" label="Favorite color" options={options} />);
      const radios = screen.getAllByRole("radio");
      expect(radios[0]).toHaveAttribute("aria-labelledby", "color-red-label");
      expect(radios[1]).toHaveAttribute("aria-labelledby", "color-blue-label");
    });

    it("should generate label ids matching option values", () => {
      render(<RadioGroup id="color" label="Favorite color" options={options} />);
      expect(screen.getByText("Red")).toHaveAttribute("id", "color-red-label");
      expect(screen.getByText("Blue")).toHaveAttribute("id", "color-blue-label");
    });
  });

  describe("disabled options", () => {
    it("should disable individual options", () => {
      render(<RadioGroup id="color" label="Favorite color" options={options} />);
      const radios = screen.getAllByRole("radio");
      expect(radios[2]).toHaveAttribute("aria-disabled", "true");
    });
  });

  describe("helper text and error", () => {
    it("should render helper text with correct id", () => {
      render(<RadioGroup id="color" label="Color" options={options} helperText="Choose one" />);
      expect(screen.getByText("Choose one")).toHaveAttribute("id", "color-helper");
    });

    it("should render error message with correct id", () => {
      render(<RadioGroup id="color" label="Color" options={options} error="Required" />);
      expect(screen.getByText("Required")).toBeInTheDocument();
      const errorEl = screen.getByText("Required").closest("[id='color-error']");
      expect(errorEl).toBeInTheDocument();
    });

    it("should set aria-invalid on fieldset when error exists", () => {
      render(<RadioGroup id="color" label="Color" options={options} error="Required" />);
      const fieldset = screen.getByRole("group");
      expect(fieldset).toHaveAttribute("aria-invalid", "true");
    });

    it("should set aria-describedby on fieldset with helper and error ids", () => {
      render(<RadioGroup id="color" label="Color" options={options} helperText="Help" error="Err" />);
      const fieldset = screen.getByRole("group");
      const describedBy = fieldset.getAttribute("aria-describedby");
      expect(describedBy).toContain("color-helper");
      expect(describedBy).toContain("color-error");
    });

    it("should not render error when not provided", () => {
      const { container } = render(<RadioGroup id="color" label="Color" options={options} />);
      expect(container.querySelector("[id='color-error']")).not.toBeInTheDocument();
    });

    it("should not render helper text when not provided", () => {
      const { container } = render(<RadioGroup id="color" label="Color" options={options} />);
      expect(container.querySelector("#color-helper")).not.toBeInTheDocument();
    });
  });
});
