import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Kbd } from "../index";

describe("Kbd", () => {
  it("should render", () => {
    const { container } = render(<Kbd>Ctrl</Kbd>);
    expect(container.innerHTML).not.toBe("");
  });
});
