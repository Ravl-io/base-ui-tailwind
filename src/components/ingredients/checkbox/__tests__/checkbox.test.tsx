import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Checkbox } from "../index";

describe("Checkbox", () => {
  it("should render", () => {
    const { container } = render(<Checkbox />);
    expect(container.innerHTML).not.toBe("");
  });
});
