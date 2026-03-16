import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Progress, ProgressLabel, ProgressValue } from "../index";

describe("Progress", () => {
  it("should render without crashing", () => {
    render(<Progress value={50} />);
    expect(document.querySelector('[data-slot="progress"]')).toBeInTheDocument();
  });

  it("should always render a track and indicator inside", () => {
    render(<Progress value={50} />);
    expect(document.querySelector('[data-slot="progress-track"]')).toBeInTheDocument();
    expect(document.querySelector('[data-slot="progress-indicator"]')).toBeInTheDocument();
  });

  it("should render children alongside the track", () => {
    render(
      <Progress value={50}>
        <ProgressLabel>Uploading</ProgressLabel>
        <ProgressValue />
      </Progress>,
    );

    expect(document.querySelector('[data-slot="progress-label"]')).toBeInTheDocument();
    expect(document.querySelector('[data-slot="progress-value"]')).toBeInTheDocument();
  });
});
