import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "../index";

describe("HoverCard", () => {
  it("should render trigger", () => {
    render(
      <HoverCard>
        <HoverCardTrigger>Hover me</HoverCardTrigger>
      </HoverCard>,
    );
    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });
});

describe("HoverCardContent", () => {
  it("should render when open", () => {
    render(
      <HoverCard open>
        <HoverCardTrigger>Hover me</HoverCardTrigger>
        <HoverCardContent>Card content</HoverCardContent>
      </HoverCard>,
    );
    expect(document.body.querySelector("[data-slot='hover-card-content']")).toBeInTheDocument();
  });
});
