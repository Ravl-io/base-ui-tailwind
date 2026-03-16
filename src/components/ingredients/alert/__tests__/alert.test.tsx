import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Alert, AlertTitle, AlertDescription, AlertAction } from "../index";

describe("Alert", () => {
  it("should render", () => {
    render(<Alert>Alert content</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});

describe("AlertTitle", () => {
  it("should render", () => {
    render(<AlertTitle>Title</AlertTitle>);
    expect(screen.getByText("Title")).toBeInTheDocument();
  });
});

describe("AlertDescription", () => {
  it("should render", () => {
    render(<AlertDescription>Description</AlertDescription>);
    expect(screen.getByText("Description")).toBeInTheDocument();
  });
});

describe("AlertAction", () => {
  it("should render", () => {
    render(<AlertAction>Action</AlertAction>);
    expect(screen.getByText("Action")).toBeInTheDocument();
  });
});
