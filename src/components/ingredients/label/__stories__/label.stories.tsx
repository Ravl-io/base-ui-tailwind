import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, waitFor, within } from "storybook/test";

import { Input } from "@/components/ingredients/input";
import { Label } from "@/components/ingredients/label";

/**
 * Renders an accessible label associated with controls.
 */
const meta = {
  title: "ingredients/Label",
  component: Label,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: { type: "text" },
    },
  },
  args: {
    children: "Your email address",
    htmlFor: "email",
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof Label>;

/**
 * The default form of the label.
 */
export const Default: Story = {};

/**
 * A label associated with an input control.
 */
export const WithInput: Story = {
  render: () => (
    <div className="grid gap-1.5">
      <Label htmlFor="label-test">Your email address</Label>
      <Input id="label-test" type="email" placeholder="Email" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Interaction & accessibility tests
// ---------------------------------------------------------------------------

export const ShouldRenderAsLabelElement: Story = {
  name: "should render as native label element (WCAG 1.3.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      const label = canvas.getByText(/your email address/i);
      expect(label.tagName).toBe("LABEL");
    });
  },
};

export const ShouldExposeTextContent: Story = {
  name: "should expose text content (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByText(/your email address/i)).toBeInTheDocument();
    });
  },
};

export const ShouldAssociateWithControl: Story = {
  name: "should associate label with control via htmlFor (WCAG 1.3.1)",
  tags: ["!dev", "!autodocs"],
  render: () => (
    <div className="grid gap-1.5">
      <Label htmlFor="a11y-test-input">Test Label</Label>
      <Input id="a11y-test-input" type="text" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      const input = canvas.getByRole("textbox");
      expect(input).toHaveAccessibleName(/test label/i);
    });
  },
};
