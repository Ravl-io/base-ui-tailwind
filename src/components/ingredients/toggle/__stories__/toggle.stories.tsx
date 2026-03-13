import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Bold, Italic } from "lucide-react";

import { Toggle } from "@/components/ingredients/toggle";
import { A11Y_NOTES } from "@sb/a11yNotes";
import { A11yWarning } from "@sb/a11yWarning";

/**
 * A two-state button that can be either on or off.
 */
const meta: Meta<typeof Toggle> = {
  title: "ingredients/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: { disable: true },
    },
  },
  args: {
    children: <Bold className="h-4 w-4" />,
    "aria-label": "Toggle bold",
  },
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof Toggle>;

/**
 * The default form of the toggle.
 */
export const Default: Story = {};

/**
 * Use the `outline` variant for a distinct outline, emphasizing the boundary
 * of the selection circle for clearer visibility
 */
export const Outline: Story = {
  args: {
    variant: "outline",
    children: <Italic className="h-4 w-4" />,
    "aria-label": "Toggle italic",
  },
};

/**
 * Use the text element to add a label to the toggle.
 */
export const WithText: Story = {
  render: (args) => (
    <Toggle {...args}>
      <Italic className="mr-2 h-4 w-4" />
      Italic
    </Toggle>
  ),
  args: { ...Outline.args },
};

/**
 * Use the `sm` size for a smaller toggle, suitable for interfaces needing
 * compact elements without sacrificing usability.
 */
export const Small: Story = {
  args: {
    size: "sm",
  },
};

/**
 * Use the `lg` size for a larger toggle, offering better visibility and
 * easier interaction for users.
 */
export const Large: Story = {
  args: {
    size: "lg",
  },
};

/**
 * Add the `disabled` prop to prevent interactions with the toggle.
 *
 * Disabled controls are not recommended without clear instructions on how to
 * enable them. See the accessibility guidance rendered below the story.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <div className="flex flex-col gap-4 items-center">
      <Toggle {...args} />
      <A11yWarning message={A11Y_NOTES.DISABLED_NOT_RECOMMENDED.text} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: A11Y_NOTES.DISABLED_NOT_RECOMMENDED.markdown,
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Interaction & accessibility tests
// ---------------------------------------------------------------------------

export const ShouldHaveButtonRole: Story = {
  name: "should have role button (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 4.1.2 — role exposed to AT
    await waitFor(() => {
      expect(canvas.getByRole("button")).toBeInTheDocument();
    });
  },
};

export const ShouldHaveAccessibleName: Story = {
  name: "should have accessible name from aria-label (WCAG 4.1.2, 2.5.3)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 4.1.2 / 2.5.3 — accessible name set via aria-label
    await waitFor(() => {
      expect(canvas.getByRole("button")).toHaveAccessibleName("Toggle bold");
    });
  },
};

export const ShouldMeetTargetSize: Story = {
  name: "should meet minimum target size of 24px (WCAG 2.5.8)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("button");

    // 2.5.8 — target at least 24×24px
    await waitFor(() => {
      const { width, height } = toggle.getBoundingClientRect();
      expect(width).toBeGreaterThanOrEqual(24);
      expect(height).toBeGreaterThanOrEqual(24);
    });
  },
};

export const ShouldBeFocusableViaKeyboard: Story = {
  name: "should be reachable via keyboard Tab (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 2.1.1 — reachable via Tab
    await userEvent.tab();
    await waitFor(() => expect(canvas.getByRole("button")).toHaveFocus());
  },
};

export const ShouldToggleViaSpaceKey: Story = {
  name: "should toggle pressed state via Space key (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.tab();
    await waitFor(() => expect(canvas.getByRole("button")).toHaveFocus());

    // 2.1.1 — Space toggles
    await userEvent.keyboard(" ");
    await waitFor(() =>
      expect(canvas.getByRole("button")).toHaveAttribute("aria-pressed", "true"),
    );

    await userEvent.keyboard(" ");
    await waitFor(() =>
      expect(canvas.getByRole("button")).toHaveAttribute("aria-pressed", "false"),
    );
  },
};

export const ShouldExposePressedState: Story = {
  name: "should expose pressed state change to AT (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("button");

    // 4.1.2 — initial unpressed state
    await waitFor(() => expect(toggle).toHaveAttribute("aria-pressed", "false"));

    await userEvent.click(toggle);

    // 4.1.2 — pressed state reflected
    await waitFor(() => expect(toggle).toHaveAttribute("aria-pressed", "true"));
  },
};
