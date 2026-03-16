import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Empty } from "../index";

describe("Empty", () => {
  it("should render", () => {
    const { container } = render(<Empty>No data</Empty>);
    expect(container.innerHTML).not.toBe("");
  });
});
