import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TooltipProvider, Tooltip, TooltipTrigger } from "../index";

describe("Tooltip", () => {
  it("should render", () => {
    const { container } = render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover</TooltipTrigger>
        </Tooltip>
      </TooltipProvider>,
    );
    expect(container.innerHTML).not.toBe("");
  });
});
