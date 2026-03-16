import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Input } from "@/components/recipes/forms/input";
import { A11Y_NOTES } from "@sb/a11yNotes";
import { A11yWarning } from "@sb/a11yWarning";

/**
 * A form input field with label, helper text, and error state support.
 */
const meta = {
  title: "recipes/forms/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      description: "Unique identifier, drives all aria ID derivation",
    },
    label: {
      control: "text",
      description: "Label text for the input",
    },
    helperText: {
      control: "text",
      description: "Helper text displayed below the input",
    },
    error: {
      control: "text",
      description: "Error message, replaces helper text when present",
    },
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
    classes: {
      control: "object",
      description: "Style overrides for individual slots within the component",
    },
  },
  args: {
    id: "input",
    label: "Username",
    placeholder: "johndoe",
    disabled: false,
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Visual stories
// ---------------------------------------------------------------------------

/**
 * Default input with a label.
 */
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Login">
  <Form.Input
    id="username"
    label="Username"
    placeholder="johndoe"
  />
</Form>
        `,
      },
    },
  },
};

/**
 * Input with helper text providing additional context.
 */
export const WithHelperText: Story = {
  args: {
    helperText: "Your unique account identifier.",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Login">
  <Form.Input
    id="username"
    label="Username"
    placeholder="johndoe"
    helperText="Your unique account identifier."
  />
</Form>
        `,
      },
    },
  },
};

/**
 * Input in an error state with an error message.
 */
export const WithError: Story = {
  args: {
    error: "Username is required.",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Login">
  <Form.Input
    id="username"
    label="Username"
    placeholder="johndoe"
    error="Username is required."
  />
</Form>
        `,
      },
    },
  },
};

/**
 * Input with both helper text and an error — error takes visual precedence.
 */
export const WithHelperTextAndError: Story = {
  args: {
    helperText: "Your unique account identifier.",
    error: "Username is required.",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Login">
  <Form.Input
    id="username"
    label="Username"
    placeholder="johndoe"
    helperText="Your unique account identifier."
    error="Username is required."
  />
</Form>
        `,
      },
    },
  },
};

/**
 * Disabled input.
 *
 * Disabled controls are not recommended without clear instructions on how to
 * enable them. See the accessibility guidance rendered below the story.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    helperText: "Your unique account identifier.",
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Input {...args} />
      <A11yWarning message={A11Y_NOTES.DISABLED_NOT_RECOMMENDED.text} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: A11Y_NOTES.DISABLED_NOT_RECOMMENDED.markdown,
      },
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Login">
  <Form.Input
    id="username"
    label="Username"
    placeholder="johndoe"
    helperText="Your unique account identifier."
    disabled
  />
</Form>
        `,
      },
    },
  },
};

/**
 * Demonstrates style overrides via classes prop.
 */
export const WithClassNameOverrides: Story = {
  args: {
    helperText: "Your unique account identifier.",
    classes: {
      label: "text-blue-600",
      input: "border-blue-400",
      helperText: "text-blue-400",
    },
  },
  parameters: {
    docs: {
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Login">
  <Form.Input
    id="username"
    label="Username"
    placeholder="johndoe"
    helperText="Your unique account identifier."
    classes={{
      label: "text-blue-600",
      input: "border-blue-400",
      helperText: "text-blue-400",
    }}
  />
</Form>
        `,
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Interaction & accessibility tests
// ---------------------------------------------------------------------------

export const ShouldRenderLabelAssociatedToInput: Story = {
  name: "should have label correctly associated to input via htmlFor (WCAG 1.3.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");
    const label = canvas.getByText("Username");

    // 1.3.1 — label programmatically associated, not just co-located
    await waitFor(() => {
      expect(input).toHaveAttribute("id", "input");
      expect(label).toHaveAttribute("for", "input");
    });
  },
};

export const ShouldHaveAccessibleName: Story = {
  name: "should have accessible name matching visible label (WCAG 2.5.3, 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    // 2.5.3 — visible label text is contained in the accessible name
    // 4.1.2 — name exposed to AT
    await waitFor(() => {
      expect(input).toHaveAccessibleName("Username");
    });
  },
};

export const ShouldMeetTargetSize: Story = {
  name: "should meet minimum target size of 24x24px (WCAG 2.5.8)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    // 2.5.8 — minimum 24×24 CSS pixels
    await waitFor(() => {
      const { width, height } = input.getBoundingClientRect();
      expect(width).toBeGreaterThanOrEqual(24);
      expect(height).toBeGreaterThanOrEqual(24);
    });
  },
};

export const ShouldRenderHelperText: Story = {
  name: "should render helper text associated to input via aria-describedby (WCAG 1.3.1, 3.3.2)",
  tags: ["!dev", "!autodocs"],
  args: {
    helperText: "Your unique account identifier.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    // 1.3.1 — helper text programmatically linked
    // 3.3.2 — helper text rendered and non-empty
    await waitFor(() => {
      expect(input).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("input-helper"),
      );
      expect(canvas.getByText("Your unique account identifier.")).toBeInTheDocument();
      expect(canvasElement.querySelector("#input-helper")).not.toBeEmptyDOMElement();
    });
  },
};

export const ShouldRenderErrorMessage: Story = {
  name: "should render error message and set aria-invalid on input (WCAG 4.1.2, 3.3.1, 1.3.1)",
  tags: ["!dev", "!autodocs"],
  args: {
    error: "Username is required.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    // 4.1.2 — aria-invalid exposed to AT
    // 3.3.1 — error conveyed in text, not colour alone
    // 1.3.1 — error programmatically linked via aria-describedby
    await waitFor(() => {
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(input).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("input-error"),
      );
      expect(canvas.getByText("Username is required.")).toBeInTheDocument();
      expect(canvasElement.querySelector("#input-error")).not.toBeEmptyDOMElement();
    });
  },
};

export const ShouldLinkBothHelperAndError: Story = {
  name: "should link both helper text and error via aria-describedby (WCAG 1.3.1)",
  tags: ["!dev", "!autodocs"],
  args: {
    helperText: "Your unique account identifier.",
    error: "Username is required.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    // 1.3.1 — both IDs present in aria-describedby
    await waitFor(() => {
      const describedBy = input.getAttribute("aria-describedby") ?? "";
      expect(describedBy).toContain("input-helper");
      expect(describedBy).toContain("input-error");
      expect(canvasElement.querySelector("#input-helper")).not.toBeEmptyDOMElement();
      expect(canvasElement.querySelector("#input-error")).not.toBeEmptyDOMElement();
    });
  },
};

export const ShouldFocusInputOnLabelClick: Story = {
  name: "should focus input when label is clicked (WCAG 1.3.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText("Username");
    const input = canvas.getByRole("textbox");

    // 1.3.1 — label association is functional, not just structural
    await userEvent.click(label);

    await waitFor(() => {
      expect(input).toHaveFocus();
    });
  },
};

export const ShouldBeFocusableViaKeyboard: Story = {
  name: "should be reachable and focusable via keyboard (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    // 2.1.1 — keyboard operable
    await userEvent.tab();

    await waitFor(() => {
      expect(input).toHaveFocus();
    });
  },
};

export const ShouldAcceptUserInput: Story = {
  name: "should accept and reflect user typed input (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    await userEvent.type(input, "johndoe");

    await waitFor(() => {
      expect(input).toHaveValue("johndoe");
    });
  },
};

export const ShouldBeDisabledAndNotFocusable: Story = {
  name: "should be disabled and not reachable via keyboard (WCAG 4.1.2, 2.1.1)",
  tags: ["!dev", "!autodocs"],
  args: {
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    // 4.1.2 — disabled state exposed to AT via native disabled attribute
    await waitFor(() => {
      expect(input).toBeDisabled();
    });

    // 2.1.1 — disabled controls must not be reachable via Tab
    await userEvent.tab();

    await waitFor(() => {
      expect(input).not.toHaveFocus();
    });
  },
};

export const ShouldNotBreakA11yWithClassNameOverrides: Story = {
  name: "should not break accessible name or structure with classes overrides (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  args: {
    helperText: "Your unique account identifier.",
    classes: {
      label: "text-blue-600",
      input: "border-blue-400",
      helperText: "text-blue-400",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    // 4.1.2 — style overrides must not break accessible name or structure
    await waitFor(() => {
      expect(input).toHaveAccessibleName("Username");
      expect(input).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("input-helper"),
      );
      expect(canvas.getByText("Username")).toHaveClass("text-blue-600");
      expect(canvas.getByText("Your unique account identifier.")).toHaveClass("text-blue-400");
    });
  },
};