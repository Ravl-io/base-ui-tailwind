import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { A11Y_NOTES } from "@sb/a11yNotes";
import { A11yWarning } from "@sb/a11yWarning";
import { Button } from "@/components/ingredients/button";
import { Label } from "@/components/ingredients/label";
import { Textarea } from "@/components/ingredients/textarea";

/**
 * Displays a form textarea or a component that looks like a textarea.
 */
const meta = {
  title: "ingredients/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
  },
  args: {
    placeholder: "Type your message here.",
    disabled: false,
  },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the textarea.
 */
export const Default: Story = {};

/**
 * Use the `disabled` prop to disable the textarea.
 *
 * <hr/>
 *
 * > {@link A11Y_NOTES.DISABLED_NOT_RECOMMENDED}
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <>
      <A11yWarning message={A11Y_NOTES.DISABLED_NOT_RECOMMENDED.text} />
      <Textarea {...args} />
    </>
  ),
};

/**
 * Use the `Label` component to includes a clear, descriptive label above or
 * alongside the text area to guide users.
 */
export const WithLabel: Story = {
  render: (args) => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea {...args} id="message" />
    </div>
  ),
};

/**
 * Use a text element below the text area to provide additional instructions
 * or information to users.
 */
export const WithText: Story = {
  render: (args) => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message-2">Your Message</Label>
      <Textarea {...args} id="message-2" />
      <p className="text-sm text-slate-500">
        Your message will be copied to the support team.
      </p>
    </div>
  ),
};

/**
 * Use the `Button` component to indicate that the text area can be submitted
 * or used to trigger an action.
 */
export const WithButton: Story = {
  render: (args) => (
    <div className="grid w-full gap-2">
      <Textarea {...args} />
      <Button type="submit">Send Message</Button>
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
    const textarea = canvas.getByRole("textbox");

    await waitFor(() => {
      const { height } = textarea.getBoundingClientRect();
      expect(height).toBeGreaterThanOrEqual(24);
    });
  },
};

export const ShouldAcceptTypedInput: Story = {
  name: "when user types, should update textarea value",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole("textbox");
    const testText = "Hello, world!";

    await userEvent.click(textarea);
    await userEvent.type(textarea, testText);

    expect(textarea).toHaveValue(testText);
  },
};
