import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Separator } from "../index";

describe("Separator", () => {
  it("should render", () => {
    const { container } = render(<Separator />);
    expect(container.innerHTML).not.toBe("");
  });
});
