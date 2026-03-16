import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialogDescription,
} from "../index";

function renderOpenDialog(contentProps: Record<string, unknown> = {}, children?: React.ReactNode) {
  return render(
    <AlertDialog open>
      <AlertDialogTrigger>Open</AlertDialogTrigger>
      <AlertDialogContent {...contentProps}>
        <AlertDialogTitle>Title</AlertDialogTitle>
        <AlertDialogDescription>Description</AlertDialogDescription>
        {children}
      </AlertDialogContent>
    </AlertDialog>,
  );
}

describe("AlertDialogContent", () => {
  describe("size", () => {
    it("should default size to default", () => {
      renderOpenDialog();
      const content = screen.getByText("Title").closest("[data-slot='alert-dialog-content']");
      expect(content).toHaveAttribute("data-size", "default");
    });

    it("should set size to sm when provided", () => {
      renderOpenDialog({ size: "sm" });
      const content = screen.getByText("Title").closest("[data-slot='alert-dialog-content']");
      expect(content).toHaveAttribute("data-size", "sm");
    });
  });
});

describe("AlertDialogCancel", () => {
  describe("button defaults", () => {
    it("should default to outline variant", () => {
      renderOpenDialog({}, <AlertDialogCancel>Cancel</AlertDialogCancel>);
      const cancel = screen.getByRole("button", { name: "Cancel" });
      expect(cancel).toHaveClass("border-border");
    });
  });
});
