import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, waitFor, within } from "storybook/test";

import { Skeleton } from "@/components/ingredients/skeleton";

/**
 * Use to show a placeholder while content is loading.
 */
const meta = {
  title: "ingredients/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    "aria-label": {
      control: "text",
      description: "Accessible label describing the loading state.",
    },
  },
  args: {
    "aria-label": "Loading",
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof Skeleton>;

/**
 * The default form of the skeleton.
 */
export const Default: Story = {
  render: (args) => (
    <div className="flex items-center space-x-4">
      <Skeleton {...args} className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton {...args} className="h-4 w-[250px]" />
        <Skeleton {...args} className="h-4 w-[200px]" />
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Interaction & accessibility tests
// ---------------------------------------------------------------------------

export const ShouldHaveStatusRole: Story = {
  name: "should have status role to announce loading state (WCAG 4.1.3)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 4.1.3 — loading state must be announced to AT without requiring focus.
    // role="status" is an implicit aria-live="polite" region.
    await waitFor(() => {
      const skeletons = canvas.getAllByRole("status");
      expect(skeletons.length).toBeGreaterThanOrEqual(1);
    });
  },
};

export const ShouldHaveAccessibleLabel: Story = {
  name: "should have accessible label describing loading state (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      const skeletons = canvas.getAllByRole("status");
      expect(skeletons[0]).toHaveAccessibleName(/loading/i);
    });
  },
};
