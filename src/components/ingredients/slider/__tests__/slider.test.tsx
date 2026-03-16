import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Slider } from "../index";

describe("Slider", () => {
  it("should render", () => {
    const { container } = render(<Slider defaultValue={[50]} />);
    expect(container.innerHTML).not.toBe("");
  });
});
