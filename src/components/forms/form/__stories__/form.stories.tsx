import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Form } from "@/components/forms/form";
import { Input } from "@/components/forms/input";
import type { FormProps } from "@/components/forms/form";

/**
 * A form component with built-in submit, cancel, and reset button management,
 * form-level error handling, and WCAG AA 2.2 compliant focus management.
 */
const meta = {
  title: "forms/Form",
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "text",
      description: "Accessible label for the form via aria-label",
    },
    error: {
      control: "text",
      description: "Form-level error message, announced via role=alert",
    },
    isSubmitting: {
      control: "boolean",
      description: "Controls loading state on submit button and disables cancel/reset",
    },
    labels: {
      control: "object",
      description: "Labels for form action buttons",
    },
    classNames: {
      control: "object",
      description: "Style overrides for individual slots within the form",
    },
  },
  args: {
    name: "Login",
    isSubmitting: false,
    labels: {
      submit: "Sign in",
    },
    onSubmit: () => {},
  },
  render: (args) => (
    <Form {...args}>
      <Input
        id="username"
        label="Username"
        type="text"
        autoComplete="username"
      />
      <Input
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
      />
    </Form>
  ),
} satisfies Meta<Omit<FormProps, 'children'>>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default form with a submit button only.
 */
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Form
  name="Login"
  onSubmit={handleSubmit}
  labels={{ submit: "Sign in" }}
>
  <Form.Input
    id="username"
    label="Username"
    type="text"
    autoComplete="username"
  />
  <Form.Input
    id="password"
    label="Password"
    type="password"
    autoComplete="current-password"
  />
</Form>
        `,
      },
    },
  },
};

/**
 * Form with a cancel button. Renders when onCancel is provided.
 */
export const WithCancel: Story = {
  args: {
    onCancel: () => {},
    labels: {
      submit: "Sign in",
      cancel: "Cancel",
    },
  },
  parameters: {
    docs: {
      source: {
        code: `
<Form
  name="Login"
  onSubmit={handleSubmit}
  onCancel={handleCancel}
  labels={{ submit: "Sign in", cancel: "Cancel" }}
>
  <Form.Input
    id="username"
    label="Username"
    type="text"
    autoComplete="username"
  />
  <Form.Input
    id="password"
    label="Password"
    type="password"
    autoComplete="current-password"
  />
</Form>
        `,
      },
    },
  },
};

/**
 * Form with a reset button. Renders when onReset is provided.
 */
export const WithReset: Story = {
  args: {
    onReset: () => {},
    labels: {
      submit: "Sign in",
      reset: "Reset",
    },
  },
  parameters: {
    docs: {
      source: {
        code: `
<Form
  name="Login"
  onSubmit={handleSubmit}
  onReset={handleReset}
  labels={{ submit: "Sign in", reset: "Reset" }}
>
  <Form.Input
    id="username"
    label="Username"
    type="text"
    autoComplete="username"
  />
  <Form.Input
    id="password"
    label="Password"
    type="password"
    autoComplete="current-password"
  />
</Form>
        `,
      },
    },
  },
};

/**
 * Form with all action buttons rendered.
 */
export const WithAllButtons: Story = {
  args: {
    onCancel: () => {},
    onReset: () => {},
    labels: {
      submit: "Sign in",
      cancel: "Cancel",
      reset: "Reset",
    },
  },
  parameters: {
    docs: {
      source: {
        code: `
<Form
  name="Login"
  onSubmit={handleSubmit}
  onCancel={handleCancel}
  onReset={handleReset}
  labels={{ submit: "Sign in", cancel: "Cancel", reset: "Reset" }}
>
  <Form.Input
    id="username"
    label="Username"
    type="text"
    autoComplete="username"
  />
  <Form.Input
    id="password"
    label="Password"
    type="password"
    autoComplete="current-password"
  />
</Form>
        `,
      },
    },
  },
};

/**
 * Form with a form-level error message. Announced immediately via role=alert.
 */
export const WithError: Story = {
  args: {
    error: "Invalid username or password. Please try again.",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Form
  name="Login"
  onSubmit={handleSubmit}
  labels={{ submit: "Sign in" }}
  error="Invalid username or password. Please try again."
>
  <Form.Input
    id="username"
    label="Username"
    type="text"
    autoComplete="username"
  />
  <Form.Input
    id="password"
    label="Password"
    type="password"
    autoComplete="current-password"
  />
</Form>
        `,
      },
    },
  },
};

/**
 * Form in a submitting state. Submit button shows loading spinner,
 * cancel and reset buttons are disabled.
 */
export const Submitting: Story = {
  args: {
    isSubmitting: true,
    onCancel: () => {},
    onReset: () => {},
    labels: {
      submit: "Sign in",
      cancel: "Cancel",
      reset: "Reset",
    },
  },
  parameters: {
    docs: {
      source: {
        code: `
<Form
  name="Login"
  onSubmit={handleSubmit}
  onCancel={handleCancel}
  onReset={handleReset}
  labels={{ submit: "Sign in", cancel: "Cancel", reset: "Reset" }}
  isSubmitting={isSubmitting}
>
  <Form.Input
    id="username"
    label="Username"
    type="text"
    autoComplete="username"
  />
  <Form.Input
    id="password"
    label="Password"
    type="password"
    autoComplete="current-password"
  />
</Form>
        `,
      },
    },
  },
};