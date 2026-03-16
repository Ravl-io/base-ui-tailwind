import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Label } from "../index";

describe("Label", () => {
  it("should render", () => {
    const { container } = render(<Label>Label text</Label>);
    expect(container.innerHTML).not.toBe("");
  });
});
