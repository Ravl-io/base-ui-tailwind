import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Select } from "@/components/forms/select";
import type { SelectProps } from "@/components/forms/select";

const options = [
  { value: "engineer", label: "Software Engineer" },
  { value: "designer", label: "Product Designer" },
  { value: "manager", label: "Product Manager" },
  { value: "analyst", label: "Business Analyst" },
  { value: "qa", label: "QA Engineer", disabled: true },
];

/**
 * A form select field with label, helper text, and error state support.
 */
const meta = {
  title: "forms/Select",
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      description: "Unique identifier, drives all aria ID derivation",
    },
    label: {
      control: "text",
      description: "Label text for the select",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text shown when no option is selected",
    },
    helperText: {
      control: "text",
      description: "Helper text displayed below the select",
    },
    error: {
      control: "text",
      description: "Error message displayed below the select",
    },
    classNames: {
      control: "object",
      description: "Style overrides for individual slots within the component",
    },
  },
  args: {
    id: "role",
    label: "Role",
    placeholder: "Select a role",
    options,
  },
  render: (args) => <Select {...args} />,
} satisfies Meta<Omit<SelectProps, 'children'>>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default select with a label.
 */
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Job application">
  <Form.Select
    id="role"
    label="Role"
    placeholder="Select a role"
    options={[
      { value: "engineer", label: "Software Engineer" },
      { value: "designer", label: "Product Designer" },
      { value: "manager", label: "Product Manager" },
      { value: "analyst", label: "Business Analyst" },
    ]}
  />
</Form>
        `,
      },
    },
  },
};

/**
 * Select with helper text providing additional context.
 */
export const WithHelperText: Story = {
  args: {
    helperText: "Choose the role that best describes your position.",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Job application">
  <Form.Select
    id="role"
    label="Role"
    placeholder="Select a role"
    helperText="Choose the role that best describes your position."
    options={[
      { value: "engineer", label: "Software Engineer" },
      { value: "designer", label: "Product Designer" },
      { value: "manager", label: "Product Manager" },
      { value: "analyst", label: "Business Analyst" },
    ]}
  />
</Form>
        `,
      },
    },
  },
};

/**
 * Select in an error state with an error message.
 */
export const WithError: Story = {
  args: {
    error: "Please select a role.",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Job application">
  <Form.Select
    id="role"
    label="Role"
    placeholder="Select a role"
    error="Please select a role."
    options={[
      { value: "engineer", label: "Software Engineer" },
      { value: "designer", label: "Product Designer" },
      { value: "manager", label: "Product Manager" },
      { value: "analyst", label: "Business Analyst" },
    ]}
  />
</Form>
        `,
      },
    },
  },
};

/**
 * Select with both helper text and an error.
 */
export const WithHelperTextAndError: Story = {
  args: {
    helperText: "Choose the role that best describes your position.",
    error: "Please select a role.",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Job application">
  <Form.Select
    id="role"
    label="Role"
    placeholder="Select a role"
    helperText="Choose the role that best describes your position."
    error="Please select a role."
    options={[
      { value: "engineer", label: "Software Engineer" },
      { value: "designer", label: "Product Designer" },
      { value: "manager", label: "Product Manager" },
      { value: "analyst", label: "Business Analyst" },
    ]}
  />
</Form>
        `,
      },
    },
  },
};

/**
 * Select with a disabled option.
 */
export const WithDisabledOption: Story = {
  args: {
    helperText: "QA Engineer is currently unavailable.",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Job application">
  <Form.Select
    id="role"
    label="Role"
    placeholder="Select a role"
    helperText="QA Engineer is currently unavailable."
    options={[
      { value: "engineer", label: "Software Engineer" },
      { value: "designer", label: "Product Designer" },
      { value: "manager", label: "Product Manager" },
      { value: "analyst", label: "Business Analyst" },
      { value: "qa", label: "QA Engineer", disabled: true },
    ]}
  />
</Form>
        `,
      },
    },
  },
};

/**
 * Select with style overrides via classNames prop.
 */
export const WithClassNameOverrides: Story = {
  args: {
    classNames: {
      label: "text-blue-600",
      trigger: "border-blue-400",
      helperText: "text-blue-400",
    },
    helperText: "Choose the role that best describes your position.",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Job application">
  <Form.Select
    id="role"
    label="Role"
    placeholder="Select a role"
    helperText="Choose the role that best describes your position."
    classNames={{
      label: "text-blue-600",
      trigger: "border-blue-400",
      helperText: "text-blue-400",
    }}
    options={[
      { value: "engineer", label: "Software Engineer" },
      { value: "designer", label: "Product Designer" },
      { value: "manager", label: "Product Manager" },
      { value: "analyst", label: "Business Analyst" },
    ]}
  />
</Form>
        `,
      },
    },
  },
};