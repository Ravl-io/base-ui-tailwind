import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Spinner } from "../index";

describe("Spinner", () => {
  it("should render", () => {
    const { container } = render(<Spinner />);
    expect(container.innerHTML).not.toBe("");
  });
});
