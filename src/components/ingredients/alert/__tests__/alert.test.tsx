import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Alert } from "../index";

describe("Alert", () => {
  it("should render", () => {
    const { container } = render(<Alert>Alert content</Alert>);
    expect(container.innerHTML).not.toBe("");
  });
});
