import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DirectionProvider } from "../index";

describe("DirectionProvider", () => {
  it("should render", () => {
    const { container } = render(
      <DirectionProvider direction="ltr">
        <div>content</div>
      </DirectionProvider>,
    );
    expect(container.innerHTML).not.toBe("");
  });
});
