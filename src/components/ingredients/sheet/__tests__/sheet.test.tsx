import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "../index";

describe("SheetContent", () => {
  describe("showCloseButton", () => {
    it("should render close button by default", () => {
      render(
        <Sheet open>
          <SheetContent>Content</SheetContent>
        </Sheet>,
      );
      expect(document.body.querySelector("[data-slot='sheet-close']")).toBeInTheDocument();
    });

    it("should hide close button when showCloseButton is false", () => {
      render(
        <Sheet open>
          <SheetContent showCloseButton={false}>Content</SheetContent>
        </Sheet>,
      );
      expect(document.body.querySelector("[data-slot='sheet-close']")).not.toBeInTheDocument();
    });
  });

  describe("side", () => {
    it("should default side to right", () => {
      render(
        <Sheet open>
          <SheetContent>Content</SheetContent>
        </Sheet>,
      );
      expect(document.body.querySelector("[data-slot='sheet-content']")).toHaveAttribute("data-side", "right");
    });

    it("should set side to left when provided", () => {
      render(
        <Sheet open>
          <SheetContent side="left">Content</SheetContent>
        </Sheet>,
      );
      expect(document.body.querySelector("[data-slot='sheet-content']")).toHaveAttribute("data-side", "left");
    });
  });
});

describe("SheetHeader", () => {
  it("should render", () => {
    render(
      <Sheet open>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Title</SheetTitle>
            <SheetDescription>Description</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>,
    );
    expect(document.body.querySelector("[data-slot='sheet-header']")).toBeInTheDocument();
    expect(document.body.querySelector("[data-slot='sheet-title']")).toBeInTheDocument();
    expect(document.body.querySelector("[data-slot='sheet-description']")).toBeInTheDocument();
  });
});

describe("SheetFooter", () => {
  it("should render", () => {
    render(
      <Sheet open>
        <SheetContent>
          <SheetFooter>Footer</SheetFooter>
        </SheetContent>
      </Sheet>,
    );
    expect(document.body.querySelector("[data-slot='sheet-footer']")).toBeInTheDocument();
  });
});
