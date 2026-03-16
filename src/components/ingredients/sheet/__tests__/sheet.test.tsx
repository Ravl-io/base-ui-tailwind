import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Sheet, SheetContent } from "../index";

describe("Sheet", () => {
  describe("showCloseButton", () => {
    it("should render close button by default", () => {
      render(
        <Sheet open>
          <SheetContent>Content</SheetContent>
        </Sheet>,
      );
      expect(document.body.querySelector('[data-slot="sheet-close"]')).toBeInTheDocument();
    });

    it("should hide close button when showCloseButton is false", () => {
      render(
        <Sheet open>
          <SheetContent showCloseButton={false}>Content</SheetContent>
        </Sheet>,
      );
      expect(document.body.querySelector('[data-slot="sheet-close"]')).not.toBeInTheDocument();
    });
  });
});
