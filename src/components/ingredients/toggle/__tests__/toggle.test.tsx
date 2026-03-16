import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Toggle } from "../index";

describe("Toggle", () => {
  it("should render", () => {
    const { container } = render(<Toggle>Bold</Toggle>);
    expect(container.innerHTML).not.toBe("");
  });
});
