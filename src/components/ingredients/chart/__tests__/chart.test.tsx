import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeAll } from "vitest";

beforeAll(() => {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

vi.mock("recharts", async (importOriginal) => {
  const mod = await importOriginal<Record<string, unknown>>();
  return {
    ...mod,
    ResponsiveContainer: ({ children }: Record<string, unknown>) => (
      <div data-testid="responsive-container">{children as React.ReactNode}</div>
    ),
  };
});

import { ChartContainer, ChartStyle } from "../index";
import type { ChartConfig } from "../index";

const testConfig: ChartConfig = {
  revenue: { label: "Revenue", color: "#ff0000" },
};

describe("ChartContainer", () => {
  it("renders with data-slot='chart'", () => {
    render(
      <ChartContainer config={testConfig}>
        <div>chart child</div>
      </ChartContainer>,
    );
    const container = screen.getByText("chart child").closest("[data-slot='chart']");
    expect(container).toBeInTheDocument();
    expect(container).toHaveAttribute("data-slot", "chart");
  });

  it("forwards className", () => {
    render(
      <ChartContainer config={testConfig} className="custom">
        <div>chart</div>
      </ChartContainer>,
    );
    const container = screen.getByText("chart").closest("[data-slot='chart']");
    expect(container).toHaveClass("custom");
  });

  it("generates a data-chart id attribute", () => {
    render(
      <ChartContainer config={testConfig} id="test-chart">
        <div>chart</div>
      </ChartContainer>,
    );
    const container = screen.getByText("chart").closest("[data-slot='chart']");
    expect(container).toHaveAttribute("data-chart", "chart-test-chart");
  });
});

describe("ChartStyle", () => {
  it("returns null when no colors in config", () => {
    const emptyConfig: ChartConfig = { item: { label: "No color" } };
    const { container } = render(<ChartStyle id="test" config={emptyConfig} />);
    expect(container.querySelector("style")).toBeNull();
  });

  it("renders a style tag when config has colors", () => {
    const { container } = render(<ChartStyle id="test" config={testConfig} />);
    expect(container.querySelector("style")).not.toBeNull();
  });
});
