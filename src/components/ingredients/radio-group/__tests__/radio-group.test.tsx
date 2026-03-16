import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RadioGroup, RadioGroupItem } from "../index";

describe("RadioGroup", () => {
  it("should render", () => {
    const { container } = render(
      <RadioGroup>
        <RadioGroupItem value="a" />
      </RadioGroup>,
    );
    expect(container.innerHTML).not.toBe("");
  });
});
