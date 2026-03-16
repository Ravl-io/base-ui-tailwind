import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ButtonGroup } from "../index";

describe("ButtonGroup", () => {
  it("should render", () => {
    const { container } = render(<ButtonGroup>content</ButtonGroup>);
    expect(container.innerHTML).not.toBe("");
  });
});
