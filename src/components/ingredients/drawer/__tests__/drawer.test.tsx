import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "../index";

describe("Drawer", () => {
  it("should render trigger", () => {
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
      </Drawer>,
    );
    expect(screen.getByText("Open")).toBeInTheDocument();
  });
});

describe("DrawerContent", () => {
  it("should render with sub-components", () => {
    render(
      <Drawer open>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Title</DrawerTitle>
            <DrawerDescription>Description</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose>Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>,
    );
    expect(document.body.querySelector("[data-slot='drawer-content']")).toBeInTheDocument();
    expect(document.body.querySelector("[data-slot='drawer-header']")).toBeInTheDocument();
    expect(document.body.querySelector("[data-slot='drawer-footer']")).toBeInTheDocument();
  });
});
