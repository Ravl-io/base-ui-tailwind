import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Info } from "lucide-react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { A11Y_NOTES } from "@sb/a11yNotes";
import { A11yWarning } from "@sb/a11yWarning";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ingredients/collapsible";

/**
 * An interactive component which expands/collapses a panel.
 */
const meta = {
  title: "ingredients/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  argTypes: {
    defaultOpen: {
      control: "boolean",
      description: "Whether the collapsible is initially expanded",
    },
    disabled: {
      control: "boolean",
    },
  },
  args: {
    className: "w-96",
    defaultOpen: false,
    disabled: false,
  },
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger className="flex gap-2">
        <h3 className="font-semibold">Can I use this in my project?</h3>
        <Info className="size-6" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        Yes. Free to use for personal and commercial projects. No attribution
        required.
      </CollapsibleContent>
    </Collapsible>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Collapsible>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the collapsible.
 */
export const Default: Story = {};

/**
 * Use the `disabled` prop to disable the interaction.
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
      <Collapsible {...args}>
        <CollapsibleTrigger className="flex gap-2">
          <h3 className="font-semibold">Can I use this in my project?</h3>
          <Info className="size-6" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          Yes. Free to use for personal and commercial projects. No attribution
          required.
        </CollapsibleContent>
      </Collapsible>
    </>
  ),
};

// ---------------------------------------------------------------------------
// Interaction & accessibility tests
// ---------------------------------------------------------------------------

export const ShouldHaveTriggerWithButtonRole: Story = {
  name: "should have trigger with button role (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByRole("button")).toBeInTheDocument();
    });
  },
};

export const ShouldExposeExpandedState: Story = {
  name: "should expose expanded state via aria-expanded (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");

    // Initially collapsed
    await waitFor(() => {
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    // Click to expand
    await userEvent.click(trigger);
    await waitFor(() => {
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });
  },
};

export const ShouldMeetTargetSize: Story = {
  name: "should meet minimum trigger target size of 24px (WCAG 2.5.8)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");

    await waitFor(() => {
      const { width, height } = trigger.getBoundingClientRect();
      expect(width).toBeGreaterThanOrEqual(24);
      expect(height).toBeGreaterThanOrEqual(24);
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
      expect(canvas.getByRole("button")).toHaveFocus();
    });
  },
};

export const ShouldToggleViaEnterKey: Story = {
  name: "should toggle via Enter key (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.tab();
    await userEvent.keyboard("{Enter}");

    await waitFor(() => {
      expect(canvas.getByRole("button")).toHaveAttribute("aria-expanded", "true");
    });
  },
};

export const ShouldOpenClose: Story = {
  name: "when collapsable trigger is clicked, should show content",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas, step }) => {
    const trigger = await canvas.findByRole("button");

    await step("Open the collapsible", async () => {
      await userEvent.click(trigger, { delay: 100 });
      expect(await canvas.queryByText(/yes/i, { exact: true })).toBeVisible();
    });

    await step("Close the collapsible", async () => {
      await userEvent.click(trigger, { delay: 100 });
      expect(await canvas.queryByText(/yes/i, { exact: true })).toBeNull();
    });
  },
};
