import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { HoverCard, HoverCardTrigger } from "../index";

describe("HoverCard", () => {
  it("should render", () => {
    const { container } = render(
      <HoverCard>
        <HoverCardTrigger>Hover me</HoverCardTrigger>
      </HoverCard>,
    );
    expect(container.innerHTML).not.toBe("");
  });
});
