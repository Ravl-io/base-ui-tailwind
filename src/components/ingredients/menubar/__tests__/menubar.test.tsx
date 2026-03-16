import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarSeparator,
  MenubarShortcut,
  MenubarGroup,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from "../index";

function renderOpenMenubar(children: React.ReactNode) {
  return render(
    <Menubar>
      <MenubarMenu open>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          {children}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>,
  );
}

describe("Menubar", () => {
  it("should render trigger", () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
        </MenubarMenu>
      </Menubar>,
    );
    expect(screen.getByText("File")).toBeInTheDocument();
  });
});

describe("MenubarItem", () => {
  describe("variant", () => {
    it("should default variant to default", () => {
      renderOpenMenubar(<MenubarItem>Item</MenubarItem>);
      const item = document.querySelector("[data-slot='menubar-item']");
      expect(item).toHaveAttribute("data-variant", "default");
    });

    it("should set variant to destructive", () => {
      renderOpenMenubar(<MenubarItem variant="destructive">Delete</MenubarItem>);
      const item = document.querySelector("[data-slot='menubar-item']");
      expect(item).toHaveAttribute("data-variant", "destructive");
    });
  });

  describe("inset", () => {
    it("should set data-inset when inset is true", () => {
      renderOpenMenubar(<MenubarItem inset>Item</MenubarItem>);
      const item = document.querySelector("[data-slot='menubar-item']");
      expect(item).toHaveAttribute("data-inset", "true");
    });
  });
});

describe("MenubarLabel", () => {
  describe("inset", () => {
    it("should set data-inset when inset is true", () => {
      renderOpenMenubar(
        <MenubarGroup>
          <MenubarLabel inset>Label</MenubarLabel>
        </MenubarGroup>,
      );
      const label = document.querySelector("[data-slot='menubar-label']");
      expect(label).toHaveAttribute("data-inset", "true");
    });
  });
});

describe("MenubarSeparator", () => {
  it("should render", () => {
    renderOpenMenubar(<MenubarSeparator />);
    expect(document.querySelector("[data-slot='menubar-separator']")).toBeInTheDocument();
  });
});

describe("MenubarShortcut", () => {
  it("should render", () => {
    renderOpenMenubar(
      <MenubarItem>
        Save <MenubarShortcut>Ctrl+S</MenubarShortcut>
      </MenubarItem>,
    );
    expect(document.querySelector("[data-slot='menubar-shortcut']")).toHaveTextContent("Ctrl+S");
  });
});

describe("MenubarCheckboxItem", () => {
  describe("inset", () => {
    it("should set data-inset when inset is true", () => {
      renderOpenMenubar(<MenubarCheckboxItem inset>Check</MenubarCheckboxItem>);
      const item = document.querySelector("[data-slot='menubar-checkbox-item']");
      expect(item).toHaveAttribute("data-inset", "true");
    });
  });
});

describe("MenubarRadioItem", () => {
  describe("inset", () => {
    it("should set data-inset when inset is true", () => {
      renderOpenMenubar(
        <MenubarRadioGroup value="a">
          <MenubarRadioItem value="a" inset>Radio</MenubarRadioItem>
        </MenubarRadioGroup>,
      );
      const item = document.querySelector("[data-slot='menubar-radio-item']");
      expect(item).toHaveAttribute("data-inset", "true");
    });
  });
});

describe("MenubarSubTrigger", () => {
  describe("inset", () => {
    it("should set data-inset when inset is true", () => {
      renderOpenMenubar(
        <MenubarSub>
          <MenubarSubTrigger inset>More</MenubarSubTrigger>
          <MenubarSubContent>
            <MenubarItem>Sub item</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>,
      );
      const trigger = document.querySelector("[data-slot='menubar-sub-trigger']");
      expect(trigger).toHaveAttribute("data-inset", "true");
    });
  });
});
