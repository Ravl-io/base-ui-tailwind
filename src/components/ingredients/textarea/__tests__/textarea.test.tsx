import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Textarea } from "../index";

describe("Textarea", () => {
  it("should render", () => {
    const { container } = render(<Textarea />);
    expect(container.innerHTML).not.toBe("");
  });
});
