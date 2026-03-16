import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "../index";

function renderOpenMenu(children: React.ReactNode) {
  return render(
    <DropdownMenu open>
      <DropdownMenuTrigger>Open</DropdownMenuTrigger>
      <DropdownMenuContent>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>,
  );
}

describe("DropdownMenu", () => {
  it("should render trigger", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
      </DropdownMenu>,
    );
    expect(screen.getByText("Open")).toBeInTheDocument();
  });
});

describe("DropdownMenuItem", () => {
  describe("variant", () => {
    it("should default variant to default", () => {
      renderOpenMenu(<DropdownMenuItem>Item</DropdownMenuItem>);
      const item = document.querySelector("[data-slot='dropdown-menu-item']");
      expect(item).toHaveAttribute("data-variant", "default");
    });

    it("should set variant to destructive", () => {
      renderOpenMenu(<DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>);
      const item = document.querySelector("[data-slot='dropdown-menu-item']");
      expect(item).toHaveAttribute("data-variant", "destructive");
    });
  });

  describe("inset", () => {
    it("should set data-inset when inset is true", () => {
      renderOpenMenu(<DropdownMenuItem inset>Item</DropdownMenuItem>);
      const item = document.querySelector("[data-slot='dropdown-menu-item']");
      expect(item).toHaveAttribute("data-inset", "true");
    });
  });
});

describe("DropdownMenuLabel", () => {
  describe("inset", () => {
    it("should set data-inset when inset is true", () => {
      renderOpenMenu(
        <DropdownMenuGroup>
          <DropdownMenuLabel inset>Label</DropdownMenuLabel>
        </DropdownMenuGroup>,
      );
      const label = document.querySelector("[data-slot='dropdown-menu-label']");
      expect(label).toHaveAttribute("data-inset", "true");
    });
  });
});

describe("DropdownMenuSeparator", () => {
  it("should render", () => {
    renderOpenMenu(<DropdownMenuSeparator />);
    expect(document.querySelector("[data-slot='dropdown-menu-separator']")).toBeInTheDocument();
  });
});

describe("DropdownMenuShortcut", () => {
  it("should render", () => {
    renderOpenMenu(
      <DropdownMenuItem>
        Copy <DropdownMenuShortcut>Ctrl+C</DropdownMenuShortcut>
      </DropdownMenuItem>,
    );
    expect(document.querySelector("[data-slot='dropdown-menu-shortcut']")).toHaveTextContent("Ctrl+C");
  });
});

describe("DropdownMenuCheckboxItem", () => {
  describe("inset", () => {
    it("should set data-inset when inset is true", () => {
      renderOpenMenu(<DropdownMenuCheckboxItem inset>Check</DropdownMenuCheckboxItem>);
      const item = document.querySelector("[data-slot='dropdown-menu-checkbox-item']");
      expect(item).toHaveAttribute("data-inset", "true");
    });
  });
});

describe("DropdownMenuRadioItem", () => {
  describe("inset", () => {
    it("should set data-inset when inset is true", () => {
      renderOpenMenu(
        <DropdownMenuRadioGroup value="a">
          <DropdownMenuRadioItem value="a" inset>Radio</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>,
      );
      const item = document.querySelector("[data-slot='dropdown-menu-radio-item']");
      expect(item).toHaveAttribute("data-inset", "true");
    });
  });
});

describe("DropdownMenuSubTrigger", () => {
  describe("inset", () => {
    it("should set data-inset when inset is true", () => {
      renderOpenMenu(
        <DropdownMenuSub>
          <DropdownMenuSubTrigger inset>More</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Sub item</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>,
      );
      const trigger = document.querySelector("[data-slot='dropdown-menu-sub-trigger']");
      expect(trigger).toHaveAttribute("data-inset", "true");
    });
  });
});
