import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DropdownMenu, DropdownMenuTrigger } from "../index";

describe("DropdownMenu", () => {
  it("should render", () => {
    const { container } = render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
      </DropdownMenu>,
    );
    expect(container.innerHTML).not.toBe("");
  });
});
