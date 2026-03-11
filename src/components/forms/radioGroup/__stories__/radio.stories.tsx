import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { RadioGroup } from "@/components/forms/radioGroup";
import type { RadioGroupProps } from "@/components/forms/radioGroup";

const options = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "post", label: "Post", disabled: true },
];

/**
 * A radio group field with fieldset/legend structure, helper text,
 * and error state support. WCAG AA 2.2 compliant.
 */
const meta = {
  title: "forms/RadioGroup",
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      description: "Unique identifier, drives all aria ID and option ID derivation",
    },
    label: {
      control: "text",
      description: "Legend text for the radio group",
    },
    helperText: {
      control: "text",
      description: "Helper text displayed below the group",
    },
    error: {
      control: "text",
      description: "Error message displayed below the group",
    },
    classNames: {
      control: "object",
      description: "Style overrides for individual slots within the component",
    },
  },
  args: {
    id: "contact",
    label: "Preferred contact method",
    options,
  },
  render: (args) => <RadioGroup {...args} />,
} satisfies Meta<Omit<RadioGroupProps, 'children'>>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default radio group with a legend.
 */
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Contact form">
  <Form.RadioGroup
    id="contact"
    label="Preferred contact method"
    options={[
      { value: "email", label: "Email" },
      { value: "phone", label: "Phone" },
      { value: "post", label: "Post" },
    ]}
  />
</Form>
        `,
      },
    },
  },
};

/**
 * Radio group with helper text providing additional context.
 */
export const WithHelperText: Story = {
  args: {
    helperText: "We will only use this to contact you about your account.",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Contact form">
  <Form.RadioGroup
    id="contact"
    label="Preferred contact method"
    helperText="We will only use this to contact you about your account."
    options={[
      { value: "email", label: "Email" },
      { value: "phone", label: "Phone" },
      { value: "post", label: "Post" },
    ]}
  />
</Form>
        `,
      },
    },
  },
};

/**
 * Radio group in an error state with an error message.
 */
export const WithError: Story = {
  args: {
    error: "Please select a contact method.",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Contact form">
  <Form.RadioGroup
    id="contact"
    label="Preferred contact method"
    error="Please select a contact method."
    options={[
      { value: "email", label: "Email" },
      { value: "phone", label: "Phone" },
      { value: "post", label: "Post" },
    ]}
  />
</Form>
        `,
      },
    },
  },
};

/**
 * Radio group with both helper text and an error.
 */
export const WithHelperTextAndError: Story = {
  args: {
    helperText: "We will only use this to contact you about your account.",
    error: "Please select a contact method.",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Contact form">
  <Form.RadioGroup
    id="contact"
    label="Preferred contact method"
    helperText="We will only use this to contact you about your account."
    error="Please select a contact method."
    options={[
      { value: "email", label: "Email" },
      { value: "phone", label: "Phone" },
      { value: "post", label: "Post" },
    ]}
  />
</Form>
        `,
      },
    },
  },
};

/**
 * Radio group with a disabled option.
 */
export const WithDisabledOption: Story = {
  args: {
    helperText: "Post is currently unavailable.",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Contact form">
  <Form.RadioGroup
    id="contact"
    label="Preferred contact method"
    helperText="Post is currently unavailable."
    options={[
      { value: "email", label: "Email" },
      { value: "phone", label: "Phone" },
      { value: "post", label: "Post", disabled: true },
    ]}
  />
</Form>
        `,
      },
    },
  },
};

/**
 * Radio group with style overrides via classNames prop.
 */
export const WithClassNameOverrides: Story = {
  args: {
    helperText: "We will only use this to contact you about your account.",
    classNames: {
      legend: "text-blue-600",
      itemLabel: "text-blue-600",
      helperText: "text-blue-400",
    },
  },
  parameters: {
    docs: {
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Contact form">
  <Form.RadioGroup
    id="contact"
    label="Preferred contact method"
    helperText="We will only use this to contact you about your account."
    classNames={{
      legend: "text-blue-600",
      itemLabel: "text-blue-600",
      helperText: "text-blue-400",
    }}
    options={[
      { value: "email", label: "Email" },
      { value: "phone", label: "Phone" },
      { value: "post", label: "Post" },
    ]}
  />
</Form>
        `,
      },
    },
  },
};