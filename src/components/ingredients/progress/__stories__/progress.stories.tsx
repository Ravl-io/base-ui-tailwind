import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, waitFor, within } from "storybook/test";

import { Progress } from "@/components/ingredients/progress";

/**
 * Displays an indicator showing the completion progress of a task, typically
 * displayed as a progress bar.
 */
const meta = {
  title: "ingredients/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    "aria-label": "Progress",
    value: 30,
    max: 100,
  },
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the progress.
 */
export const Default: Story = {};

/**
 * When the progress is indeterminate.
 */
export const Indeterminate: Story = {
  args: {
    value: undefined,
  },
};

/**
 * When the progress is completed.
 */
export const Completed: Story = {
  args: {
    value: 100,
  },
};

// ---------------------------------------------------------------------------
// Interaction & accessibility tests
// ---------------------------------------------------------------------------

export const ShouldHaveProgressbarRole: Story = {
  name: "should have role progressbar (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 4.1.2 — role exposed to AT
    await waitFor(() => {
      expect(canvas.getByRole("progressbar")).toBeInTheDocument();
    });
  },
};

export const ShouldHaveAccessibleName: Story = {
  name: "should have accessible name from aria-label (WCAG 4.1.2, 1.3.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 4.1.2 / 1.3.1 — accessible name set via aria-label
    await waitFor(() => {
      expect(canvas.getByRole("progressbar")).toHaveAccessibleName("Progress");
    });
  },
};

export const ShouldExposeValueToAT: Story = {
  name: "should expose value, min, and max to AT (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const progress = canvas.getByRole("progressbar");

    // 4.1.2 — value attributes exposed
    await waitFor(() => {
      expect(progress).toHaveAttribute("aria-valuenow", "30");
      expect(progress).toHaveAttribute("aria-valuemin", "0");
      expect(progress).toHaveAttribute("aria-valuemax", "100");
    });
  },
};

export const ShouldExposeIndeterminateState: Story = {
  name: "should not expose valuenow when indeterminate (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  args: {
    value: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const progress = canvas.getByRole("progressbar");

    // 4.1.2 — indeterminate has no aria-valuenow
    await waitFor(() => {
      expect(progress).not.toHaveAttribute("aria-valuenow");
    });
  },
};
