import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Combobox,
  ComboboxInput,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
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

    it("should render addon when showClear is true", () => {
      const { container } = render(
        <Combobox>
          <ComboboxInput showClear showTrigger={false} />
        </Combobox>,
      );
      const addon = container.querySelector("[data-slot='input-group-addon']");
      expect(addon).toBeInTheDocument();
    });
  });
});

describe("ComboboxChip", () => {
  describe("showRemove", () => {
    it("should show remove button by default", () => {
      render(
        <Combobox>
          <ComboboxChips>
            <ComboboxChip>Apple</ComboboxChip>
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
            <ComboboxChip showRemove={false}>Apple</ComboboxChip>
          </ComboboxChips>
        </Combobox>,
      );
      const remove = document.querySelector("[data-slot='combobox-chip-remove']");
      expect(remove).not.toBeInTheDocument();
    });
  });
});

describe("ComboboxChipsInput", () => {
  it("should render", () => {
    render(
      <Combobox>
        <ComboboxChips>
          <ComboboxChipsInput />
        </ComboboxChips>
      </Combobox>,
    );
    expect(document.querySelector("[data-slot='combobox-chip-input']")).toBeInTheDocument();
  });
});

describe("ComboboxValue", () => {
  it("should render inside trigger", () => {
    render(
      <Combobox>
        <ComboboxTrigger>
          <ComboboxValue />
        </ComboboxTrigger>
      </Combobox>,
    );
    expect(document.querySelector("[data-slot='combobox-trigger']")).toBeInTheDocument();
  });
});

describe("ComboboxContent", () => {
  it("should render with sub-components when open", () => {
    render(
      <Combobox open>
        <ComboboxInput />
        <ComboboxContent>
          <ComboboxList>
            <ComboboxGroup>
              <ComboboxLabel>Fruits</ComboboxLabel>
              <ComboboxItem value="apple">Apple</ComboboxItem>
              <ComboboxSeparator />
              <ComboboxItem value="banana">Banana</ComboboxItem>
            </ComboboxGroup>
            <ComboboxEmpty>No results</ComboboxEmpty>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>,
    );
    expect(document.body.querySelector("[data-slot='combobox-content']")).toBeInTheDocument();
    expect(document.body.querySelector("[data-slot='combobox-label']")).toBeInTheDocument();
    expect(document.body.querySelector("[data-slot='combobox-separator']")).toBeInTheDocument();
  });
});

describe("useComboboxAnchor", () => {
  it("should return a ref object", () => {
    const refs: React.RefObject<HTMLDivElement | null>[] = [];
    function TestComponent() {
      refs.push(useComboboxAnchor());
      return null;
    }
    render(<TestComponent />);
    expect(refs[0]).toHaveProperty("current", null);
  });
});
