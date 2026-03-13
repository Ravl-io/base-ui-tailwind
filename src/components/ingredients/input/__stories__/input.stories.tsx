import { expect, userEvent, waitFor, within } from "storybook/test";
// Replace nextjs-vite with the name of your framework
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { A11Y_NOTES } from "@sb/a11yNotes";
import { A11yWarning } from "@sb/a11yWarning";
import { Button } from "@/components/ingredients/button";
import { Input } from "@/components/ingredients/input";
import { Label } from "@/components/ingredients/label";

/**
 * Displays a form input field or a component that looks like an input field.
 */
const meta = {
  title: "ingredients/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    className: "w-96",
    type: "email",
    placeholder: "Email",
    disabled: false,
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the input field.
 */
export const Default: Story = {};

/**
 * Use the `disabled` prop to make the input non-interactive and appears faded,
 * indicating that input is not currently accepted.
 *
 * <hr/>
 *
 * > {@link A11Y_NOTES.DISABLED_NOT_RECOMMENDED}
 */
export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <>
      <A11yWarning message={A11Y_NOTES.DISABLED_NOT_RECOMMENDED.text} />
      <Input {...args} className="w-96" />
    </>
  ),
};

/**
 * Use the `Label` component to includes a clear, descriptive label above or
 * alongside the input area to guide users.
 */
export const WithLabel: Story = {
  render: (args) => (
    <div className="grid items-center gap-1.5">
      <Label htmlFor="email">{args.placeholder}</Label>
      <Input {...args} id="email" />
    </div>
  ),
};

/**
 * Use a text element below the input field to provide additional instructions
 * or information to users.
 */
export const WithHelperText: Story = {
  render: (args) => (
    <div className="grid items-center gap-1.5">
      <Label htmlFor="email-2">{args.placeholder}</Label>
      <Input {...args} id="email-2" />
      <p className="text-foreground/60 text-sm">Enter your email address.</p>
    </div>
  ),
};

/**
 * Use the `Button` component to indicate that the input field can be submitted
 * or used to trigger an action.
 */
export const WithButton: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Input {...args} />
      <Button type="submit">Subscribe</Button>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Interaction & accessibility tests
// ---------------------------------------------------------------------------

export const ShouldHaveTextboxRole: Story = {
  name: "should have textbox role (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByRole("textbox")).toBeInTheDocument();
    });
  },
};

export const ShouldBeFocusableViaKeyboard: Story = {
  name: "should be focusable via keyboard (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.tab();
    await waitFor(() => {
      expect(canvas.getByRole("textbox")).toHaveFocus();
    });
  },
};

export const ShouldMeetTargetSize: Story = {
  name: "should meet minimum target size of 24px (WCAG 2.5.8)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    await waitFor(() => {
      const { height } = input.getBoundingClientRect();
      expect(height).toBeGreaterThanOrEqual(24);
    });
  },
};

export const ShouldEnterText: Story = {
  name: "when user enters text, should see it in the input field",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas, step }) => {
    const input = await canvas.findByPlaceholderText(/email/i);
    const mockedInput = "mocked@shadcn.com";

    await step("focus and type into the input field", async () => {
      await userEvent.click(input);
      await userEvent.type(input, mockedInput);
    });

    expect(input).toHaveValue(mockedInput);
  },
};
