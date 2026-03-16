import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "../index";

describe("Pagination", () => {
  it("should render as nav with aria-label 'pagination'", () => {
    render(<Pagination>content</Pagination>);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("aria-label", "pagination");
  });
});

describe("PaginationLink", () => {
  describe("isActive prop", () => {
    it("should set aria-current='page' when isActive is true", () => {
      render(<PaginationLink isActive href="#">1</PaginationLink>);
      const link = screen.getByText("1");
      expect(link).toHaveAttribute("aria-current", "page");
      expect(link).toHaveAttribute("data-active", "true");
    });

    it("should not set aria-current when not active", () => {
      render(<PaginationLink href="#">2</PaginationLink>);
      expect(screen.getByText("2")).not.toHaveAttribute("aria-current");
    });
  });
});

describe("PaginationPrevious", () => {
  it("should render with aria-label for previous page", () => {
    render(<PaginationPrevious href="#" />);
    expect(screen.getByLabelText("Go to previous page")).toBeInTheDocument();
  });

  describe("text prop", () => {
    it("should default text to 'Previous'", () => {
      render(<PaginationPrevious href="#" />);
      expect(screen.getByText("Previous")).toBeInTheDocument();
    });

    it("should render custom text", () => {
      render(<PaginationPrevious href="#" text="Back" />);
      expect(screen.getByText("Back")).toBeInTheDocument();
    });
  });
});

describe("PaginationNext", () => {
  it("should render with aria-label for next page", () => {
    render(<PaginationNext href="#" />);
    expect(screen.getByLabelText("Go to next page")).toBeInTheDocument();
  });

  describe("text prop", () => {
    it("should default text to 'Next'", () => {
      render(<PaginationNext href="#" />);
      expect(screen.getByText("Next")).toBeInTheDocument();
    });

    it("should render custom text", () => {
      render(<PaginationNext href="#" text="Forward" />);
      expect(screen.getByText("Forward")).toBeInTheDocument();
    });
  });
});

describe("PaginationEllipsis", () => {
  it("should render with aria-hidden", () => {
    render(<PaginationEllipsis />);
    const el = document.querySelector('[data-slot="pagination-ellipsis"]');
    expect(el).toHaveAttribute("aria-hidden");
  });

  it("should contain sr-only text 'More pages'", () => {
    render(<PaginationEllipsis />);
    expect(screen.getByText("More pages")).toBeInTheDocument();
  });
});

describe("PaginationContent", () => {
  it("should render without crashing", () => {
    render(<PaginationContent data-testid="pc" />);
    expect(screen.getByTestId("pc")).toBeInTheDocument();
  });
});

describe("PaginationItem", () => {
  it("should render without crashing", () => {
    render(<ul><PaginationItem>Item</PaginationItem></ul>);
    expect(screen.getByText("Item")).toBeInTheDocument();
  });
});
