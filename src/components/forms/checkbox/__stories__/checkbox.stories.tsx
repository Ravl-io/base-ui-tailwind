import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Checkbox } from "@/components/forms/checkbox";
import type { CheckboxProps } from "@/components/forms/checkbox";

/**
 * A checkbox field with label, helper text, and error state support.
 * Label always renders to the right of the checkbox.
 */
const meta = {
  title: "forms/Checkbox",
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
    classNames: {
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
} satisfies Meta<Omit<CheckboxProps, 'children'>>;

export default meta;

type Story = StoryObj<typeof meta>;

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
};

/**
 * Disabled checkbox.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
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
};

/**
 * Checkbox with style overrides via classNames prop.
 */
export const WithClassNameOverrides: Story = {
  args: {
    helperText: "You must agree to continue.",
    classNames: {
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
    classNames={{
      label: "text-blue-600",
      helperText: "text-blue-400",
    }}
  />
</Form>
        `,
      },
    },
  },
};