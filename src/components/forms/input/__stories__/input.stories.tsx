import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Input } from "@/components/forms/input";

/**
 * A form input field with label, helper text, and error state support.
 */
const meta = {
  title: "forms/Input",
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
    classNames: {
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
 */
export const Disabled: Story = {
  args: {
    disabled: true,
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
    disabled
  />
</Form>
        `,
      },
    },
  },
};

/**
 * Demonstrates style overrides via classNames prop.
 */
export const WithClassNameOverrides: Story = {
  args: {
    helperText: "Your unique account identifier.",
    classNames: {
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
    classNames={{
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

export const ShouldRenderLabelAssociatedToInput: Story = {
  name: "should have label correctly associated to input via htmlFor",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");
    const label = canvas.getByText("Username");

    await waitFor(() => {
      expect(input).toHaveAttribute("id", "input");
      expect(label).toHaveAttribute("for", "input");
    });
  },
};

export const ShouldRenderHelperText: Story = {
  name: "should render helper text associated to input via aria-describedby",
  tags: ["!dev", "!autodocs"],
  args: {
    helperText: "Your unique account identifier.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    await waitFor(() => {
      expect(input).toHaveAttribute("aria-describedby", "input-helper");
      expect(canvas.getByText("Your unique account identifier.")).toBeInTheDocument();
    });
  },
};

export const ShouldRenderErrorMessage: Story = {
  name: "should render error message and set aria-invalid on input",
  tags: ["!dev", "!autodocs"],
  args: {
    error: "Username is required.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    await waitFor(() => {
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(input).toHaveAttribute("aria-describedby", "input-error");
      expect(canvas.getByRole("alert")).toHaveTextContent("Username is required.");
    });
  },
};

export const ShouldFocusInputOnLabelClick: Story = {
  name: "should focus input when label is clicked",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText("Username");
    const input = canvas.getByRole("textbox");

    await userEvent.click(label);

    await waitFor(() => {
      expect(input).toHaveFocus();
    });
  },
};

export const ShouldAcceptUserInput: Story = {
  name: "should accept and reflect user typed input",
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