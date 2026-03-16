import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "../index";

function renderOpenMenu(children: React.ReactNode) {
  return render(
    <ContextMenu open>
      <ContextMenuTrigger>Right click</ContextMenuTrigger>
      <ContextMenuContent>
        {children}
      </ContextMenuContent>
    </ContextMenu>,
  );
}

describe("ContextMenu", () => {
  it("should render trigger", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click</ContextMenuTrigger>
      </ContextMenu>,
    );
    expect(screen.getByText("Right click")).toBeInTheDocument();
  });
});

describe("ContextMenuItem", () => {
  describe("variant", () => {
    it("should default variant to default", () => {
      renderOpenMenu(<ContextMenuItem>Item</ContextMenuItem>);
      const item = document.querySelector("[data-slot='context-menu-item']");
      expect(item).toHaveAttribute("data-variant", "default");
    });

    it("should set variant to destructive", () => {
      renderOpenMenu(<ContextMenuItem variant="destructive">Delete</ContextMenuItem>);
      const item = document.querySelector("[data-slot='context-menu-item']");
      expect(item).toHaveAttribute("data-variant", "destructive");
    });
  });

  describe("inset", () => {
    it("should set data-inset when inset is true", () => {
      renderOpenMenu(<ContextMenuItem inset>Item</ContextMenuItem>);
      const item = document.querySelector("[data-slot='context-menu-item']");
      expect(item).toHaveAttribute("data-inset", "true");
    });
  });
});

describe("ContextMenuLabel", () => {
  describe("inset", () => {
    it("should set data-inset when inset is true", () => {
      renderOpenMenu(
        <ContextMenuGroup>
          <ContextMenuLabel inset>Label</ContextMenuLabel>
        </ContextMenuGroup>,
      );
      const label = document.querySelector("[data-slot='context-menu-label']");
      expect(label).toHaveAttribute("data-inset", "true");
    });
  });
});

describe("ContextMenuSeparator", () => {
  it("should render", () => {
    renderOpenMenu(<ContextMenuSeparator data-testid="sep" />);
    expect(document.querySelector("[data-slot='context-menu-separator']")).toBeInTheDocument();
  });
});

describe("ContextMenuShortcut", () => {
  it("should render", () => {
    renderOpenMenu(
      <ContextMenuItem>
        Copy <ContextMenuShortcut>Ctrl+C</ContextMenuShortcut>
      </ContextMenuItem>,
    );
    expect(document.querySelector("[data-slot='context-menu-shortcut']")).toHaveTextContent("Ctrl+C");
  });
});

describe("ContextMenuCheckboxItem", () => {
  describe("inset", () => {
    it("should set data-inset when inset is true", () => {
      renderOpenMenu(<ContextMenuCheckboxItem inset>Check</ContextMenuCheckboxItem>);
      const item = document.querySelector("[data-slot='context-menu-checkbox-item']");
      expect(item).toHaveAttribute("data-inset", "true");
    });
  });
});

describe("ContextMenuRadioItem", () => {
  describe("inset", () => {
    it("should set data-inset when inset is true", () => {
      renderOpenMenu(
        <ContextMenuRadioGroup value="a">
          <ContextMenuRadioItem value="a" inset>Radio</ContextMenuRadioItem>
        </ContextMenuRadioGroup>,
      );
      const item = document.querySelector("[data-slot='context-menu-radio-item']");
      expect(item).toHaveAttribute("data-inset", "true");
    });
  });
});

describe("ContextMenuSubTrigger", () => {
  describe("inset", () => {
    it("should set data-inset when inset is true", () => {
      renderOpenMenu(
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>More</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Sub item</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>,
      );
      const trigger = document.querySelector("[data-slot='context-menu-sub-trigger']");
      expect(trigger).toHaveAttribute("data-inset", "true");
    });
  });
});
