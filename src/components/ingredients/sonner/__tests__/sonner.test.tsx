import { render } from "@testing-library/react";
import { describe, it, expect, vi, beforeAll } from "vitest";

vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "light" }),
}));

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

import { Toaster } from "../index";

describe("Toaster", () => {
  it("should render", () => {
    const { container } = render(<Toaster />);
    expect(container.innerHTML).not.toBe("");
  });
});
