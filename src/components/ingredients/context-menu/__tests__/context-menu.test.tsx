import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ContextMenu, ContextMenuTrigger } from "../index";

describe("ContextMenu", () => {
  it("should render", () => {
    const { container } = render(
      <ContextMenu>
        <ContextMenuTrigger>Right click me</ContextMenuTrigger>
      </ContextMenu>,
    );
    expect(container.innerHTML).not.toBe("");
  });
});
