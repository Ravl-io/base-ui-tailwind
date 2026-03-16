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

import {
  ChartContainer,
  ChartStyle,
  ChartTooltipContent,
  ChartLegendContent,
} from "../index";
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

describe("ChartTooltipContent", () => {
  it("should return null when not active", () => {
    const { container } = render(
      <ChartContainer config={testConfig}>
        <ChartTooltipContent active={false} payload={[]} />
      </ChartContainer>,
    );
    expect(container.querySelector(".grid")).toBeNull();
  });

  it("should render tooltip content when active with payload", () => {
    render(
      <ChartContainer config={testConfig}>
        <ChartTooltipContent
          active
          payload={[
            {
              name: "revenue",
              value: 1000,
              dataKey: "revenue",
              color: "#ff0000",
              payload: { fill: "#ff0000" },
              type: "line",
            },
          ]}
          label="Jan"
        />
      </ChartContainer>,
    );
    expect(screen.getByText("1,000")).toBeInTheDocument();
  });

  it("should hide label when hideLabel is true", () => {
    render(
      <ChartContainer config={testConfig}>
        <ChartTooltipContent
          active
          payload={[
            {
              name: "revenue",
              value: 500,
              dataKey: "revenue",
              color: "#ff0000",
              payload: { fill: "#ff0000" },
              type: "line",
            },
          ]}
          label="Jan"
          hideLabel
        />
      </ChartContainer>,
    );
    expect(screen.queryByText("Jan")).not.toBeInTheDocument();
  });

  it("should use labelFormatter when provided", () => {
    render(
      <ChartContainer config={testConfig}>
        <ChartTooltipContent
          active
          payload={[
            {
              name: "revenue",
              value: 500,
              dataKey: "revenue",
              color: "#ff0000",
              payload: { fill: "#ff0000" },
              type: "line",
            },
          ]}
          label="Jan"
          labelFormatter={(value) => `Formatted: ${value}`}
        />
      </ChartContainer>,
    );
    expect(screen.getByText("Formatted: Jan")).toBeInTheDocument();
  });
});

describe("ChartLegendContent", () => {
  it("should return null when no payload", () => {
    const { container } = render(
      <ChartContainer config={testConfig}>
        <ChartLegendContent payload={[]} />
      </ChartContainer>,
    );
    expect(container.querySelectorAll(".flex.items-center.gap-1\\.5").length).toBe(0);
  });

  it("should render legend items", () => {
    render(
      <ChartContainer config={testConfig}>
        <ChartLegendContent
          payload={[
            { value: "revenue", dataKey: "revenue", color: "#ff0000", type: "line" },
          ]}
        />
      </ChartContainer>,
    );
    expect(screen.getByText("Revenue")).toBeInTheDocument();
  });
});
