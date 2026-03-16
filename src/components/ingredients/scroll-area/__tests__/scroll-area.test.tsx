import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ScrollArea } from "../index";

describe("ScrollArea", () => {
  it("should render", () => {
    const { container } = render(<ScrollArea>content</ScrollArea>);
    expect(container.innerHTML).not.toBe("");
  });
});
