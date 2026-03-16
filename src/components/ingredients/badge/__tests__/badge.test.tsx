import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "../index";

describe("Badge", () => {
  it("should render", () => {
    const { container } = render(<Badge>badge</Badge>);
    expect(container.innerHTML).not.toBe("");
  });
});
