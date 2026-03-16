import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "../index";

describe("Popover", () => {
  it("should render trigger", () => {
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
      </Popover>,
    );
    expect(screen.getByText("Open")).toBeInTheDocument();
  });
});

describe("PopoverContent", () => {
  it("should render with sub-components when open", () => {
    render(
      <Popover open>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Title</PopoverTitle>
            <PopoverDescription>Description</PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>,
    );
    expect(document.body.querySelector("[data-slot='popover-content']")).toBeInTheDocument();
    expect(document.body.querySelector("[data-slot='popover-header']")).toBeInTheDocument();
    expect(document.body.querySelector("[data-slot='popover-title']")).toBeInTheDocument();
    expect(document.body.querySelector("[data-slot='popover-description']")).toBeInTheDocument();
  });
});
