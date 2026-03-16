import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Combobox,
  ComboboxInput,
  ComboboxChips,
  ComboboxChip,
} from "../index";

describe("ComboboxInput", () => {
  describe("showTrigger", () => {
    it("should render trigger wrapper by default", () => {
      const { container } = render(
        <Combobox>
          <ComboboxInput />
        </Combobox>,
      );
      const buttons = container.querySelectorAll("[data-slot='input-group-button']");
      expect(buttons.length).toBeGreaterThan(0);
    });

    it("should not render trigger wrapper when showTrigger is false", () => {
      const { container } = render(
        <Combobox>
          <ComboboxInput showTrigger={false} />
        </Combobox>,
      );
      const buttons = container.querySelectorAll("[data-slot='input-group-button']");
      expect(buttons.length).toBe(0);
    });
  });

  describe("showClear", () => {
    it("should not render clear button by default", () => {
      const { container } = render(
        <Combobox>
          <ComboboxInput />
        </Combobox>,
      );
      const addon = container.querySelector("[data-slot='input-group-addon']");
      const clearButtons = addon?.querySelectorAll("[data-slot='combobox-clear']") ?? [];
      expect(clearButtons.length).toBe(0);
    });
  });
});

describe("ComboboxChip", () => {
  describe("showRemove", () => {
    it("should show remove button by default", () => {
      render(
        <Combobox>
          <ComboboxChips>
            <ComboboxChip value="a">Apple</ComboboxChip>
          </ComboboxChips>
        </Combobox>,
      );
      const remove = document.querySelector("[data-slot='combobox-chip-remove']");
      expect(remove).toBeInTheDocument();
    });

    it("should hide remove button when showRemove is false", () => {
      render(
        <Combobox>
          <ComboboxChips>
            <ComboboxChip value="a" showRemove={false}>Apple</ComboboxChip>
          </ComboboxChips>
        </Combobox>,
      );
      const remove = document.querySelector("[data-slot='combobox-chip-remove']");
      expect(remove).not.toBeInTheDocument();
    });
  });
});
