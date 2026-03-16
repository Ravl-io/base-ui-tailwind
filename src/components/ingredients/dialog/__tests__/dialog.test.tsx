import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "../index";

describe("Dialog", () => {
  describe("DialogContent", () => {
    it("should render close button by default", () => {
      render(
        <Dialog open>
          <DialogContent>Content</DialogContent>
        </Dialog>,
      );

      expect(document.body.querySelector(".sr-only")).toHaveTextContent("Close");
    });

    it("should hide close button when showCloseButton is false", () => {
      render(
        <Dialog open>
          <DialogContent showCloseButton={false}>Content</DialogContent>
        </Dialog>,
      );

      expect(document.body.querySelector(".sr-only")).toBeNull();
    });
  });

  describe("DialogFooter", () => {
    it("should render close button when showCloseButton is true", () => {
      render(
        <Dialog open>
          <DialogContent showCloseButton={false}>
            <DialogFooter showCloseButton>Actions</DialogFooter>
          </DialogContent>
        </Dialog>,
      );

      expect(document.body.textContent).toContain("Close");
    });

    it("should not render close button by default", () => {
      render(<DialogFooter>Actions</DialogFooter>);

      const footer = screen.getByText("Actions");
      expect(footer.querySelector("button")).toBeNull();
    });
  });

  describe("plain HTML sub-components", () => {
    it("should render DialogHeader", () => {
      render(<DialogHeader>Header</DialogHeader>);
      expect(screen.getByText("Header")).toBeInTheDocument();
    });

    it("should render DialogFooter", () => {
      render(<DialogFooter>Footer</DialogFooter>);
      expect(screen.getByText("Footer")).toBeInTheDocument();
    });
  });
});
