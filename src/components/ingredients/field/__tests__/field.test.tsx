import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Field,
  FieldSet,
  FieldLegend,
  FieldGroup,
  FieldLabel,
  FieldTitle,
  FieldContent,
  FieldDescription,
  FieldSeparator,
  FieldError,
} from "../index";

describe("Field", () => {
  it("should render without crashing", () => {
    render(<Field data-testid="field">content</Field>);
    expect(screen.getByTestId("field")).toBeInTheDocument();
  });

  it("should set data-slot attribute", () => {
    render(<Field data-testid="field">content</Field>);
    expect(screen.getByTestId("field")).toHaveAttribute("data-slot", "field");
  });

  it("should have role=group", () => {
    render(<Field>content</Field>);
    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  it("should forward className", () => {
    render(<Field data-testid="field" className="custom-class">content</Field>);
    expect(screen.getByTestId("field")).toHaveClass("custom-class");
  });

  it("should default orientation to vertical", () => {
    render(<Field data-testid="field">content</Field>);
    expect(screen.getByTestId("field")).toHaveAttribute("data-orientation", "vertical");
  });

  it("should set data-orientation for horizontal", () => {
    render(<Field data-testid="field" orientation="horizontal">content</Field>);
    expect(screen.getByTestId("field")).toHaveAttribute("data-orientation", "horizontal");
  });
});

describe("FieldSet", () => {
  it("should render as a fieldset element", () => {
    render(<FieldSet data-testid="fs">content</FieldSet>);
    expect(screen.getByTestId("fs").tagName).toBe("FIELDSET");
  });

  it("should set data-slot attribute", () => {
    render(<FieldSet data-testid="fs">content</FieldSet>);
    expect(screen.getByTestId("fs")).toHaveAttribute("data-slot", "field-set");
  });

  it("should forward className", () => {
    render(<FieldSet data-testid="fs" className="custom-class">content</FieldSet>);
    expect(screen.getByTestId("fs")).toHaveClass("custom-class");
  });
});

describe("FieldLegend", () => {
  it("should render as a legend element", () => {
    render(<FieldSet><FieldLegend>Legend</FieldLegend></FieldSet>);
    expect(screen.getByText("Legend").tagName).toBe("LEGEND");
  });

  it("should set data-slot attribute", () => {
    render(<FieldSet><FieldLegend>Legend</FieldLegend></FieldSet>);
    expect(screen.getByText("Legend")).toHaveAttribute("data-slot", "field-legend");
  });

  it("should default variant to legend", () => {
    render(<FieldSet><FieldLegend>Legend</FieldLegend></FieldSet>);
    expect(screen.getByText("Legend")).toHaveAttribute("data-variant", "legend");
  });

  it("should set data-variant for label", () => {
    render(<FieldSet><FieldLegend variant="label">Legend</FieldLegend></FieldSet>);
    expect(screen.getByText("Legend")).toHaveAttribute("data-variant", "label");
  });
});

describe("FieldGroup", () => {
  it("should render without crashing", () => {
    render(<FieldGroup data-testid="fg">content</FieldGroup>);
    expect(screen.getByTestId("fg")).toBeInTheDocument();
  });

  it("should set data-slot attribute", () => {
    render(<FieldGroup data-testid="fg">content</FieldGroup>);
    expect(screen.getByTestId("fg")).toHaveAttribute("data-slot", "field-group");
  });
});

describe("FieldLabel", () => {
  it("should render as a label element", () => {
    render(<FieldLabel>Label text</FieldLabel>);
    expect(screen.getByText("Label text").tagName).toBe("LABEL");
  });

  it("should set data-slot to field-label", () => {
    render(<FieldLabel>Label text</FieldLabel>);
    expect(screen.getByText("Label text")).toHaveAttribute("data-slot", "field-label");
  });

  it("should forward className", () => {
    render(<FieldLabel className="custom-class">Label text</FieldLabel>);
    expect(screen.getByText("Label text")).toHaveClass("custom-class");
  });
});

describe("FieldTitle", () => {
  it("should render without crashing", () => {
    render(<FieldTitle>Title</FieldTitle>);
    expect(screen.getByText("Title")).toBeInTheDocument();
  });

  it("should set data-slot to field-label", () => {
    render(<FieldTitle>Title</FieldTitle>);
    expect(screen.getByText("Title")).toHaveAttribute("data-slot", "field-label");
  });

  it("should forward className", () => {
    render(<FieldTitle className="custom-class">Title</FieldTitle>);
    expect(screen.getByText("Title")).toHaveClass("custom-class");
  });
});

describe("FieldContent", () => {
  it("should render without crashing", () => {
    render(<FieldContent data-testid="fc">content</FieldContent>);
    expect(screen.getByTestId("fc")).toBeInTheDocument();
  });

  it("should set data-slot attribute", () => {
    render(<FieldContent data-testid="fc">content</FieldContent>);
    expect(screen.getByTestId("fc")).toHaveAttribute("data-slot", "field-content");
  });
});

describe("FieldDescription", () => {
  it("should render as a p element", () => {
    render(<FieldDescription>Help text</FieldDescription>);
    expect(screen.getByText("Help text").tagName).toBe("P");
  });

  it("should set data-slot attribute", () => {
    render(<FieldDescription>Help text</FieldDescription>);
    expect(screen.getByText("Help text")).toHaveAttribute("data-slot", "field-description");
  });

  it("should forward className", () => {
    render(<FieldDescription className="custom-class">Help text</FieldDescription>);
    expect(screen.getByText("Help text")).toHaveClass("custom-class");
  });
});

describe("FieldSeparator", () => {
  it("should render without crashing", () => {
    render(<FieldSeparator data-testid="sep" />);
    expect(screen.getByTestId("sep")).toBeInTheDocument();
  });

  it("should set data-slot attribute", () => {
    render(<FieldSeparator data-testid="sep" />);
    expect(screen.getByTestId("sep")).toHaveAttribute("data-slot", "field-separator");
  });

  it("should set data-content to false when no children", () => {
    render(<FieldSeparator data-testid="sep" />);
    expect(screen.getByTestId("sep")).toHaveAttribute("data-content", "false");
  });

  it("should set data-content to true and render children when provided", () => {
    render(<FieldSeparator data-testid="sep">or</FieldSeparator>);
    expect(screen.getByTestId("sep")).toHaveAttribute("data-content", "true");
    expect(screen.getByText("or")).toBeInTheDocument();
  });

  it("should not render span when no children", () => {
    render(<FieldSeparator data-testid="sep" />);
    expect(screen.queryByText(/.+/)).not.toBeInTheDocument();
  });
});

describe("FieldError", () => {
  it("should not render when no children and no errors", () => {
    const { container } = render(<FieldError />);
    expect(container.querySelector("[data-slot=field-error]")).not.toBeInTheDocument();
  });

  it("should not render when errors array is empty", () => {
    const { container } = render(<FieldError errors={[]} />);
    expect(container.querySelector("[data-slot=field-error]")).not.toBeInTheDocument();
  });

  it("should render children when provided", () => {
    render(<FieldError>Custom error</FieldError>);
    expect(screen.getByText("Custom error")).toBeInTheDocument();
  });

  it("should set role=alert", () => {
    render(<FieldError>Error</FieldError>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("should set data-slot attribute", () => {
    render(<FieldError>Error</FieldError>);
    expect(screen.getByRole("alert")).toHaveAttribute("data-slot", "field-error");
  });

  it("should render single error message as text", () => {
    render(<FieldError errors={[{ message: "Required" }]} />);
    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it("should render multiple errors as a list", () => {
    render(
      <FieldError
        errors={[{ message: "Too short" }, { message: "Must contain number" }]}
      />,
    );
    expect(screen.getByText("Too short")).toBeInTheDocument();
    expect(screen.getByText("Must contain number")).toBeInTheDocument();
    expect(screen.getByRole("alert").querySelector("ul")).toBeInTheDocument();
  });

  it("should deduplicate errors with the same message", () => {
    render(
      <FieldError
        errors={[{ message: "Required" }, { message: "Required" }]}
      />,
    );
    // With deduplication, only one unique error remains, so it renders as text (not list)
    expect(screen.getByText("Required")).toBeInTheDocument();
    expect(screen.getByRole("alert").querySelector("ul")).not.toBeInTheDocument();
  });

  it("should prefer children over errors", () => {
    render(
      <FieldError errors={[{ message: "From errors" }]}>
        From children
      </FieldError>,
    );
    expect(screen.getByText("From children")).toBeInTheDocument();
    expect(screen.queryByText("From errors")).not.toBeInTheDocument();
  });

  it("should forward className", () => {
    render(<FieldError className="custom-class">Error</FieldError>);
    expect(screen.getByRole("alert")).toHaveClass("custom-class");
  });
});
