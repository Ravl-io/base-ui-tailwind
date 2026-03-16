import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Item,
  ItemGroup,
  ItemSeparator,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemHeader,
  ItemFooter,
} from "../index";

describe("Item", () => {
  it("should render with all sub-components", () => {
    render(
      <ItemGroup>
        <Item>
          <ItemMedia>Icon</ItemMedia>
          <ItemContent>
            <ItemTitle>Title</ItemTitle>
            <ItemDescription>Description</ItemDescription>
          </ItemContent>
          <ItemActions>Actions</ItemActions>
        </Item>
        <ItemSeparator data-testid="sep" />
        <Item>
          <ItemHeader>Header</ItemHeader>
          <ItemFooter>Footer</ItemFooter>
        </Item>
      </ItemGroup>,
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
    expect(screen.getByTestId("sep")).toBeInTheDocument();
  });
});

describe("ItemMedia", () => {
  describe("variant", () => {
    it("should default variant to default", () => {
      render(<ItemMedia data-testid="media">Icon</ItemMedia>);
      expect(screen.getByTestId("media")).toHaveAttribute("data-variant", "default");
    });

    it("should set variant to icon when provided", () => {
      render(<ItemMedia data-testid="media" variant="icon">Icon</ItemMedia>);
      expect(screen.getByTestId("media")).toHaveAttribute("data-variant", "icon");
    });

    it("should set variant to image when provided", () => {
      render(<ItemMedia data-testid="media" variant="image">Img</ItemMedia>);
      expect(screen.getByTestId("media")).toHaveAttribute("data-variant", "image");
    });
  });
});
