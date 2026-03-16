import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "../index";

describe("Avatar", () => {
  describe("size", () => {
    it("should default size to default", () => {
      render(<Avatar data-testid="avatar" />);
      expect(screen.getByTestId("avatar")).toHaveAttribute("data-size", "default");
    });

    it("should set size to sm", () => {
      render(<Avatar data-testid="avatar" size="sm" />);
      expect(screen.getByTestId("avatar")).toHaveAttribute("data-size", "sm");
    });

    it("should set size to lg", () => {
      render(<Avatar data-testid="avatar" size="lg" />);
      expect(screen.getByTestId("avatar")).toHaveAttribute("data-size", "lg");
    });
  });
});

describe("AvatarImage", () => {
  it("should render", () => {
    render(
      <Avatar>
        <AvatarImage src="test.png" alt="Test" />
      </Avatar>,
    );
    expect(screen.getByAltText("Test")).toBeInTheDocument();
  });
});

describe("AvatarFallback", () => {
  it("should render", () => {
    render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByText("AB")).toBeInTheDocument();
  });
});

describe("AvatarBadge", () => {
  it("should render", () => {
    render(
      <Avatar>
        <AvatarBadge data-testid="badge" />
      </Avatar>,
    );
    expect(screen.getByTestId("badge")).toBeInTheDocument();
  });
});

describe("AvatarGroup", () => {
  it("should render", () => {
    render(<AvatarGroup data-testid="group" />);
    expect(screen.getByTestId("group")).toBeInTheDocument();
  });
});

describe("AvatarGroupCount", () => {
  it("should render", () => {
    render(<AvatarGroupCount>+3</AvatarGroupCount>);
    expect(screen.getByText("+3")).toBeInTheDocument();
  });
});
