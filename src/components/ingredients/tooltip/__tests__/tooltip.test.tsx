import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "../index";

describe("Tooltip", () => {
  it("should render trigger", () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover</TooltipTrigger>
        </Tooltip>
      </TooltipProvider>,
    );
    expect(screen.getByText("Hover")).toBeInTheDocument();
  });
});

describe("TooltipContent", () => {
  it("should render when open", () => {
    render(
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger>Hover</TooltipTrigger>
          <TooltipContent>Tooltip text</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    expect(document.body.querySelector("[data-slot='tooltip-content']")).toBeInTheDocument();
  });
});
