import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Item } from "../index";

describe("Item", () => {
  it("should render", () => {
    const { container } = render(<Item>content</Item>);
    expect(container.innerHTML).not.toBe("");
  });
});
