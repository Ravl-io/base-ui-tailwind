import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Bold, Italic, Underline } from "lucide-react";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ingredients/toggle-group";
import { A11Y_NOTES } from "@sb/a11yNotes";
import { A11yWarning } from "@sb/a11yWarning";

/**
 * A set of two-state buttons that can be toggled on or off.
 */
const meta = {
  title: "ingredients/ToggleGroup",
  component: ToggleGroup,
  tags: ["autodocs"],
  argTypes: {
    multiple: {
      options: [true, false],
      control: { type: "radio" },
    },
  },
  args: {
    variant: "default",
    size: "default",
    multiple: true,
    disabled: false,
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the toggle group.
 */
export const Default: Story = {};

/**
 * Use the `outline` variant to emphasizing the individuality of each button
 * while keeping them visually cohesive.
 */
export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

/**
 * Use the `single` type to create exclusive selection within the button
 * group, allowing only one button to be active at a time.
 */
export const Single: Story = {
  args: {
    multiple: false,
  },
};

/**
 * Use the `sm` size for a compact version of the button group, featuring
 * smaller buttons for spaces with limited real estate.
 */
export const Small: Story = {
  args: {
    size: "sm",
  },
};

/**
 * Use the `lg` size for a more prominent version of the button group, featuring
 * larger buttons for emphasis.
 */
export const Large: Story = {
  args: {
    size: "lg",
  },
};

/**
 * Add the `disabled` prop to a button to prevent interactions.
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
      <ToggleGroup {...args}>
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
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

export const ShouldHaveGroupRole: Story = {
  name: "should have group role (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 4.1.2 — group role exposed to AT
    await waitFor(() => {
      expect(canvas.getByRole("group")).toBeInTheDocument();
    });
  },
};

export const ShouldHaveAccessibleNames: Story = {
  name: "should have accessible names on all items (WCAG 4.1.2, 2.5.3)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 4.1.2 / 2.5.3 — each item has accessible name from aria-label
    await waitFor(() => {
      expect(canvas.getByRole("button", { name: "Toggle bold" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Toggle italic" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Toggle underline" })).toBeInTheDocument();
    });
  },
};

export const ShouldMeetTargetSize: Story = {
  name: "should meet minimum target size of 24px (WCAG 2.5.8)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const items = canvas.getAllByRole("button");

    // 2.5.8 — all items at least 24×24px
    await waitFor(() => {
      for (const item of items) {
        const { width, height } = item.getBoundingClientRect();
        expect(width).toBeGreaterThanOrEqual(24);
        expect(height).toBeGreaterThanOrEqual(24);
      }
    });
  },
};

export const ShouldBeFocusableViaKeyboard: Story = {
  name: "should be reachable via keyboard Tab (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 2.1.1 — Tab reaches first toggle item
    await userEvent.tab();
    await waitFor(() => {
      expect(canvas.getAllByRole("button")[0]).toHaveFocus();
    });
  },
};

export const ShouldToggleViaClick: Story = {
  name: "should toggle pressed state via click (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const item = canvas.getByRole("button", { name: "Toggle bold" });

    // 4.1.2 — initial unpressed
    await waitFor(() => expect(item).toHaveAttribute("aria-pressed", "false"));

    await userEvent.click(item);

    // 4.1.2 — pressed state reflected
    await waitFor(() => expect(item).toHaveAttribute("aria-pressed", "true"));
  },
};
