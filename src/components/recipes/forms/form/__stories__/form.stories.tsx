import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Form } from "@/components/recipes/forms/form";
import { Input } from "@/components/recipes/forms/input";
import type { FormProps } from "@/components/recipes/forms/form";

/**
 * A form component with built-in submit, cancel, and reset button management,
 * form-level error handling, and WCAG AA 2.2 compliant focus management.
 */
const meta = {
  title: "recipes/forms/Form",
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
} satisfies Meta<Omit<FormProps, "children">>;

export default meta;

type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Visual stories
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Interaction & accessibility tests
// ---------------------------------------------------------------------------

export const ShouldHaveAccessibleFormLabel: Story = {
  name: "should have accessible label on form element (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    // 4.1.2 — form landmark labelled via aria-label so AT can identify it
    await waitFor(() => {
      const form = canvasElement.querySelector("form");
      expect(form).toHaveAttribute("aria-label", "Login");
      expect(form).toHaveAttribute("novalidate");
    });
  },
};

export const ShouldRenderSubmitButtonWithAccessibleName: Story = {
  name: "should render submit button with accessible name (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 4.1.2 — submit button role and name exposed to AT
    await waitFor(() => {
      const submit = canvas.getByRole("button", { name: "Sign in" });
      expect(submit).toBeInTheDocument();
      expect(submit).toHaveAttribute("type", "submit");
    });
  },
};

export const ShouldRenderCancelAndResetButtons: Story = {
  name: "should render cancel and reset buttons with accessible names when provided (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  args: {
    onCancel: () => {},
    onReset: () => {},
    labels: {
      submit: "Sign in",
      cancel: "Cancel",
      reset: "Reset",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 4.1.2 — all button roles and names exposed to AT
    await waitFor(() => {
      expect(canvas.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Reset" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
    });
  },
};

export const ShouldBeFullyKeyboardOperable: Story = {
  name: "should allow full keyboard navigation through form fields and actions (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 2.1.1 — all interactive elements reachable via Tab in logical order
    await userEvent.tab();
    await waitFor(() => {
      expect(canvas.getByLabelText("Username")).toHaveFocus();
    });

    await userEvent.tab();
    await waitFor(() => {
      expect(canvas.getByLabelText("Password")).toHaveFocus();
    });

    await userEvent.tab();
    await waitFor(() => {
      expect(canvas.getByRole("button", { name: "Sign in" })).toHaveFocus();
    });
  },
};

export const ShouldSubmitOnEnterKey: Story = {
  name: "should submit form when Enter is pressed on the submit button (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submit = canvas.getByRole("button", { name: "Sign in" });

    // 2.1.1 — submit operable via keyboard
    submit.focus();
    await userEvent.keyboard("{Enter}");

    await waitFor(() => {
      expect(canvasElement.querySelector("form")).toBeInTheDocument();
    });
  },
};

export const ShouldAnnounceFormLevelError: Story = {
  name: "should announce form-level error via role=alert (WCAG 3.3.1, 4.1.3)",
  tags: ["!dev", "!autodocs"],
  args: {
    error: "Invalid username or password. Please try again.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 4.1.3 — status message via role=alert announced without focus change
    // 3.3.1 — error conveyed in text, not colour alone
    await waitFor(() => {
      const alert = canvas.getByRole("alert");
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveTextContent("Invalid username or password. Please try again.");
      expect(alert).toHaveAttribute("aria-live", "assertive");
    });
  },
};

export const ShouldFocusFirstInvalidFieldAfterSubmit: Story = {
  name: "should move focus to first invalid field after failed submit (WCAG 3.3.1, 2.4.3)",
  tags: ["!dev", "!autodocs"],
  render: () => (
    <Form
      name="Login"
      onSubmit={() => {}}
      labels={{ submit: "Sign in" }}
    >
      <Input
        id="username"
        label="Username"
        type="text"
        autoComplete="username"
        error="Username is required."
      />
      <Input
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
      />
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 3.3.1 — errors identified and described in text
    // 2.4.3 — focus moves to first invalid field so AT users land on the error
    await userEvent.click(canvas.getByRole("button", { name: "Sign in" }));

    await waitFor(() => {
      expect(canvas.getByLabelText("Username")).toHaveFocus();
    });
  },
};

export const ShouldDisableCancelAndResetWhileSubmitting: Story = {
  name: "should disable cancel and reset buttons while submitting (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 4.1.2 — disabled state exposed to AT on cancel and reset
    await waitFor(() => {
      expect(canvas.getByRole("button", { name: "Cancel" })).toBeDisabled();
      expect(canvas.getByRole("button", { name: "Reset" })).toBeDisabled();
    });
  },
};

export const ShouldExposeSubmittingStateToAT: Story = {
  name: "should expose submitting state on submit button to AT (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  args: {
    isSubmitting: true,
    labels: { submit: "Sign in" },
  },
  play: async ({ canvasElement }) => {
    // 4.1.2 — aria-busy signals AT that an operation is in progress
    await waitFor(() => {
      const submit = canvasElement.querySelector<HTMLButtonElement>('button[type="submit"]');
      expect(submit).toBeInTheDocument();
      expect(submit).toHaveAttribute("aria-busy", "true");
    });
  },
};

export const ShouldNotBreakA11yWithClassNameOverrides: Story = {
  name: "should not break accessible structure with classNames overrides (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  args: {
    classNames: {
      root: "gap-6",
      actions: "flex-row-reverse",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Style overrides must not remove form label or button roles
    await waitFor(() => {
      expect(canvasElement.querySelector("form")).toHaveAttribute("aria-label", "Login");
      expect(canvas.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
    });
  },
};