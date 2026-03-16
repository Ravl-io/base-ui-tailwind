import { render } from "@testing-library/react";
import { describe, it, expect, beforeAll } from "vitest";

beforeAll(() => {
  if (typeof globalThis.ResizeObserver === "undefined") {
    globalThis.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof ResizeObserver;
  }
});

import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "../index";

describe("ResizableHandle", () => {
  describe("withHandle", () => {
    it("should render handle indicator when withHandle is true", () => {
      render(
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel>A</ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>B</ResizablePanel>
        </ResizablePanelGroup>,
      );
      const handle = document.querySelector('[data-slot="resizable-handle"]');
      expect(handle?.querySelector("div")).toBeInTheDocument();
    });

    it("should not render handle indicator by default", () => {
      render(
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel>A</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>B</ResizablePanel>
        </ResizablePanelGroup>,
      );
      const handle = document.querySelector('[data-slot="resizable-handle"]');
      expect(handle?.querySelector("div")).not.toBeInTheDocument();
    });
  });
});
