import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "@storybook/test";

import { Checkbox } from "@/components/recipes/forms/checkbox";
import type { CheckboxProps } from "@/components/recipes/forms/checkbox";
import { A11Y_NOTES } from "@sb/a11yNotes";
import { A11yWarning } from "@sb/a11yWarning";

// ---------------------------------------------------------------------------
// Shared test utility
// ---------------------------------------------------------------------------

const assertTargetSize = async (element: HTMLElement) => {
  const { width, height } = element.getBoundingClientRect();
  // WCAG 2.5.8: minimum 24×24 CSS pixels
  await expect(width).toBeGreaterThanOrEqual(24);
  await expect(height).toBeGreaterThanOrEqual(24);
};

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

/**
 * A checkbox field with label, helper text, and error state support.
 * Label wraps the checkbox primitive making the entire label the click target,
 * satisfying WCAG 2.5.8 via min-h-6 (24px minimum height).
 */
const meta = {
  title: "recipes/forms/Checkbox",
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      description: "Unique identifier, drives all aria ID derivation",
    },
    label: {
      control: "text",
      description: "Label text rendered to the right of the checkbox",
    },
    helperText: {
      control: "text",
      description: "Helper text displayed below the checkbox",
    },
    error: {
      control: "text",
      description: "Error message displayed below the checkbox",
    },
    disabled: {
      control: "boolean",
    },
    indeterminate: {
      control: "boolean",
      description: "Sets the checkbox to an indeterminate state",
    },
    classes: {
      control: "object",
      description: "Style overrides for individual slots within the component",
    },
  },
  args: {
    id: "terms",
    label: "I agree to the terms and conditions",
    disabled: false,
  },
  render: (args) => <Checkbox {...args} />,
} satisfies Meta<Omit<CheckboxProps, "children">>;

export default meta;

type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/**
 * Default checkbox with a label.
 */
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Terms">
  <Form.Checkbox
    id="terms"
    label="I agree to the terms and conditions"
  />
</Form>
        `,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    // 4.1.2 — Name, Role, Value
    await expect(checkbox).toHaveAccessibleName("I agree to the terms and conditions");
    await expect(checkbox).not.toBeChecked();
    await expect(checkbox).toHaveAttribute("aria-invalid", "false");

    // 1.3.1 — label programmatically associated via aria-labelledby
    // Note: FieldLabel wraps CheckboxPrimitive so association is by containment.
    // htmlFor is not used since Base UI's hidden input intercepts that association.
    // We assert via aria-labelledby on the checkbox span instead.
    await expect(checkbox).toHaveAttribute("aria-labelledby", "terms-label");
    const labelEl = canvasElement.querySelector('label[id="terms-label"]');
    await expect(labelEl).toBeInTheDocument();
    await expect(labelEl).toHaveTextContent("I agree to the terms and conditions");

    // 2.5.3 — visible label text is contained in the accessible name
    await expect(checkbox).toHaveAccessibleName(
      expect.stringContaining("I agree to the terms and conditions"),
    );

    // 2.5.8 — label is the click target, must be at least 24×24px
    await assertTargetSize(labelEl as HTMLElement);

    // 2.1.1 — keyboard operable: focus via Tab, toggle via Space
    await userEvent.tab();
    await expect(checkbox).toHaveFocus();
    await userEvent.keyboard(" ");
    await expect(checkbox).toBeChecked();
    await userEvent.keyboard(" ");
    await expect(checkbox).not.toBeChecked();

    // 1.3.1 — label association is functional: clicking label text toggles checkbox
    const labelText = canvas.getByText("I agree to the terms and conditions");
    await userEvent.click(labelText);
    await expect(checkbox).toBeChecked();
    await userEvent.click(labelText);
    await expect(checkbox).not.toBeChecked();
  },
};

/**
 * Checkbox with helper text providing additional context.
 */
export const WithHelperText: Story = {
  args: {
    helperText: "You must agree to continue.",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Terms">
  <Form.Checkbox
    id="terms"
    label="I agree to the terms and conditions"
    helperText="You must agree to continue."
  />
</Form>
        `,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    // 3.3.2 — helper text rendered and non-empty
    const helperText = canvas.getByText("You must agree to continue.");
    await expect(helperText).toBeInTheDocument();
    await expect(canvasElement.querySelector("#terms-helper")).not.toBeEmptyDOMElement();

    // 1.3.1 — helper text programmatically linked via aria-describedby
    await expect(checkbox).toHaveAttribute(
      "aria-describedby",
      expect.stringContaining("terms-helper"),
    );
  },
};

/**
 * Checkbox in an error state.
 */
export const WithError: Story = {
  args: {
    error: "You must agree to the terms to continue.",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Terms">
  <Form.Checkbox
    id="terms"
    label="I agree to the terms and conditions"
    error="You must agree to the terms to continue."
  />
</Form>
        `,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    // 4.1.2 — aria-invalid exposed to AT
    await expect(checkbox).toHaveAttribute("aria-invalid", "true");

    // 3.3.1 — error conveyed in text (not colour alone), element non-empty
    const errorMsg = canvas.getByText("You must agree to the terms to continue.");
    await expect(errorMsg).toBeInTheDocument();
    await expect(canvasElement.querySelector("#terms-error")).not.toBeEmptyDOMElement();

    // 1.3.1 — error programmatically linked via aria-describedby
    await expect(checkbox).toHaveAttribute(
      "aria-describedby",
      expect.stringContaining("terms-error"),
    );
  },
};

/**
 * Checkbox with both helper text and an error.
 */
export const WithHelperTextAndError: Story = {
  args: {
    helperText: "You must agree to continue.",
    error: "You must agree to the terms to continue.",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Terms">
  <Form.Checkbox
    id="terms"
    label="I agree to the terms and conditions"
    helperText="You must agree to continue."
    error="You must agree to the terms to continue."
  />
</Form>
        `,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    // 1.3.1 — both IDs present in aria-describedby
    const describedBy = checkbox.getAttribute("aria-describedby") ?? "";
    await expect(describedBy).toContain("terms-helper");
    await expect(describedBy).toContain("terms-error");

    // 3.3.1 / 3.3.2 — all contextual text present and non-empty
    await expect(canvasElement.querySelector("#terms-helper")).not.toBeEmptyDOMElement();
    await expect(canvasElement.querySelector("#terms-error")).not.toBeEmptyDOMElement();

    // 4.1.2 — invalid state exposed
    await expect(checkbox).toHaveAttribute("aria-invalid", "true");
  },
};

/**
 * Disabled checkbox.
 *
 * Disabled controls are not recommended without clear instructions on how to
 * enable them. See the accessibility guidance rendered below the story.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Checkbox {...args} />
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
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Terms">
  <Form.Checkbox
    id="terms"
    label="I agree to the terms and conditions"
    disabled
  />
</Form>
        `,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    // 4.1.2 — Base UI exposes disabled via aria-disabled on the span,
    // not the native disabled attribute
    await expect(checkbox).toHaveAttribute("aria-disabled", "true");
    await expect(checkbox).not.toBeChecked();

    // 2.1.1 — disabled controls must not be reachable via Tab
    await userEvent.tab();
    await expect(checkbox).not.toHaveFocus();

    // Belt-and-suspenders: forced click must not toggle state
    await userEvent.click(checkbox, { pointerEventsCheck: 0 });
    await expect(checkbox).not.toBeChecked();
  },
};

/**
 * Checkbox in an indeterminate state.
 */
export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
  parameters: {
    docs: {
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Terms">
  <Form.Checkbox
    id="terms"
    label="I agree to the terms and conditions"
    indeterminate
  />
</Form>
        `,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    // 4.1.2 — Base UI sets aria-checked="mixed" for indeterminate
    await expect(checkbox).toHaveAttribute("aria-checked", "mixed");

    // 2.5.8 — target size still applies in indeterminate state
    const labelEl = canvasElement.querySelector('label[id="terms-label"]');
    await assertTargetSize(labelEl as HTMLElement);

    // 2.1.1 — still keyboard reachable and focusable
    await userEvent.tab();
    await expect(checkbox).toHaveFocus();
  },
};

/**
 * Checkbox with style overrides via classes prop.
 */
export const WithClassNameOverrides: Story = {
  args: {
    helperText: "You must agree to continue.",
    classes: {
      label: "text-blue-600",
      helperText: "text-blue-400",
    },
  },
  parameters: {
    docs: {
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Terms">
  <Form.Checkbox
    id="terms"
    label="I agree to the terms and conditions"
    helperText="You must agree to continue."
    classes={{
      label: "text-blue-600",
      helperText: "text-blue-400",
    }}
  />
</Form>
        `,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // classes slots reach the correct elements
    const labelEl = canvasElement.querySelector('label[id="terms-label"]');
    const helperText = canvas.getByText("You must agree to continue.");
    await expect(labelEl).toHaveClass("text-blue-600");
    await expect(helperText).toHaveClass("text-blue-400");

    // 4.1.2 — style overrides must not break accessible name or aria-labelledby wiring
    const checkbox = canvas.getByRole("checkbox");
    await expect(checkbox).toHaveAccessibleName("I agree to the terms and conditions");
    await expect(checkbox).toHaveAttribute("aria-labelledby", "terms-label");
    await expect(checkbox).toHaveAttribute(
      "aria-describedby",
      expect.stringContaining("terms-helper"),
    );
  },
};