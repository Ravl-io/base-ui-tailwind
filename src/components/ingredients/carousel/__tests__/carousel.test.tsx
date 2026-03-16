import { vi } from "vitest";

// Must be hoisted before embla-carousel-react imports
vi.hoisted(() => {
  if (typeof globalThis.window !== "undefined") {
    if (typeof globalThis.window.matchMedia === "undefined") {
      Object.defineProperty(globalThis.window, "matchMedia", {
        writable: true,
        value: (query: string) => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => false,
        }),
      });
    }
    if (typeof globalThis.IntersectionObserver === "undefined") {
      globalThis.IntersectionObserver = class {
        constructor() {}
        observe() {}
        unobserve() {}
        disconnect() {}
      } as unknown as typeof IntersectionObserver;
    }
    if (typeof globalThis.ResizeObserver === "undefined") {
      globalThis.ResizeObserver = class {
        constructor() {}
        observe() {}
        unobserve() {}
        disconnect() {}
      } as unknown as typeof ResizeObserver;
    }
  }
});

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../index";

describe("Carousel", () => {
  describe("keyboard navigation", () => {
    it("should handle ArrowLeft and ArrowRight key events", () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Slide</CarouselItem>
          </CarouselContent>
        </Carousel>,
      );
      const region = screen.getByRole("region");

      fireEvent.keyDown(region, { key: "ArrowLeft" });
      fireEvent.keyDown(region, { key: "ArrowRight" });
      expect(region).toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("should set aria-roledescription to carousel", () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
          </CarouselContent>
        </Carousel>,
      );
      expect(screen.getByRole("region")).toHaveAttribute("aria-roledescription", "carousel");
    });
  });
});

describe("CarouselItem", () => {
  describe("accessibility", () => {
    it("should set aria-roledescription to slide", () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
          </CarouselContent>
        </Carousel>,
      );
      expect(screen.getByRole("group")).toHaveAttribute("aria-roledescription", "slide");
    });
  });
});

describe("CarouselPrevious / CarouselNext", () => {
  describe("sr-only labels", () => {
    it("should render sr-only labels for screen readers", () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Slide</CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>,
      );
      expect(screen.getByText("Previous slide")).toBeInTheDocument();
      expect(screen.getByText("Next slide")).toBeInTheDocument();
    });
  });
});
