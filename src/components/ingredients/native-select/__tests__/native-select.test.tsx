import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { NativeSelect, NativeSelectOption, NativeSelectOptGroup } from "../index";

describe("NativeSelect", () => {
  it("should render without crashing", () => {
    render(
      <NativeSelect aria-label="Fruit">
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
      </NativeSelect>,
    );

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  describe("size prop", () => {
    it("should set data-size to sm when size prop is sm", () => {
      render(
        <NativeSelect size="sm" aria-label="Fruit">
          <NativeSelectOption value="a">A</NativeSelectOption>
        </NativeSelect>,
      );

      expect(document.querySelector('[data-slot="native-select-wrapper"]')).toHaveAttribute("data-size", "sm");
      expect(document.querySelector('[data-slot="native-select"]')).toHaveAttribute("data-size", "sm");
    });

    it("should default data-size to default", () => {
      render(
        <NativeSelect aria-label="Fruit">
          <NativeSelectOption value="a">A</NativeSelectOption>
        </NativeSelect>,
      );

      expect(document.querySelector('[data-slot="native-select"]')).toHaveAttribute("data-size", "default");
    });
  });

  describe("chevron icon", () => {
    it("should render the chevron icon with aria-hidden", () => {
      render(
        <NativeSelect aria-label="Fruit">
          <NativeSelectOption value="a">A</NativeSelectOption>
        </NativeSelect>,
      );

      expect(document.querySelector('[data-slot="native-select-icon"]')).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("event handling", () => {
    it("should fire onChange when value changes", () => {
      const onChange = vi.fn();
      render(
        <NativeSelect aria-label="Fruit" onChange={onChange}>
          <NativeSelectOption value="apple">Apple</NativeSelectOption>
          <NativeSelectOption value="banana">Banana</NativeSelectOption>
        </NativeSelect>,
      );

      fireEvent.change(screen.getByRole("combobox"), { target: { value: "banana" } });
      expect(onChange).toHaveBeenCalledOnce();
    });
  });

  describe("NativeSelectOptGroup", () => {
    it("should render without crashing", () => {
      render(
        <NativeSelect aria-label="Food">
          <NativeSelectOptGroup label="Fruits">
            <NativeSelectOption value="a">Apple</NativeSelectOption>
          </NativeSelectOptGroup>
        </NativeSelect>,
      );

      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });
  });
});
