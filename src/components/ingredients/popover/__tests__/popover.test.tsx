import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Popover, PopoverTrigger } from "../index";

describe("Popover", () => {
  it("should render", () => {
    const { container } = render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
      </Popover>,
    );
    expect(container.innerHTML).not.toBe("");
  });
});
