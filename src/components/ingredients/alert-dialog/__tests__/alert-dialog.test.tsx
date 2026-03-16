import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogMedia,
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

describe("AlertDialogHeader", () => {
  it("should render", () => {
    renderOpenDialog({}, <AlertDialogHeader>Header</AlertDialogHeader>);
    expect(screen.getByText("Header")).toBeInTheDocument();
  });
});

describe("AlertDialogFooter", () => {
  it("should render", () => {
    renderOpenDialog({}, <AlertDialogFooter>Footer</AlertDialogFooter>);
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});

describe("AlertDialogMedia", () => {
  it("should render", () => {
    renderOpenDialog({}, <AlertDialogMedia>Media</AlertDialogMedia>);
    expect(screen.getByText("Media")).toBeInTheDocument();
  });
});

describe("AlertDialogAction", () => {
  it("should render", () => {
    renderOpenDialog({}, <AlertDialogAction>Confirm</AlertDialogAction>);
    expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
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
