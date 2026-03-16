import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useIsMobile } from "../use-mobile";

function createMatchMediaMock(matches: boolean) {
  const listeners: Array<(e: { matches: boolean }) => void> = [];
  return {
    mock: vi.fn().mockReturnValue({
      matches,
      addEventListener: (_event: string, cb: (e: { matches: boolean }) => void) => {
        listeners.push(cb);
      },
      removeEventListener: (_event: string, cb: (e: { matches: boolean }) => void) => {
        const idx = listeners.indexOf(cb);
        if (idx !== -1) listeners.splice(idx, 1);
      },
    }),
    listeners,
  };
}

describe("useIsMobile", () => {
  const originalMatchMedia = window.matchMedia;
  const originalInnerWidth = window.innerWidth;

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  describe("wide viewport", () => {
    it("should return false when viewport is >= 768px", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1024,
      });
      const { mock } = createMatchMediaMock(false);
      window.matchMedia = mock;

      const { result } = renderHook(() => useIsMobile());

      expect(result.current).toBe(false);
    });
  });

  describe("narrow viewport", () => {
    it("should return true when viewport is < 768px", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 500,
      });
      const { mock } = createMatchMediaMock(true);
      window.matchMedia = mock;

      const { result } = renderHook(() => useIsMobile());

      expect(result.current).toBe(true);
    });
  });

  describe("viewport change", () => {
    it("should update when matchMedia fires a change event", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1024,
      });
      const { mock, listeners } = createMatchMediaMock(false);
      window.matchMedia = mock;

      const { result } = renderHook(() => useIsMobile());
      expect(result.current).toBe(false);

      act(() => {
        Object.defineProperty(window, "innerWidth", {
          writable: true,
          configurable: true,
          value: 500,
        });
        listeners.forEach((cb) => cb({ matches: true }));
      });

      expect(result.current).toBe(true);
    });
  });
});
