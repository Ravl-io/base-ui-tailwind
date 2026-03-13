import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Plus } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ingredients/tooltip";
import { expect, userEvent, waitFor, within } from "storybook/test";

/**
 * A popup that displays information related to an element when the element
 * receives keyboard focus or the mouse hovers over it.
 */
const meta: Meta<typeof TooltipContent> = {
  title: "ingredients/Tooltip",
  component: TooltipContent,
  tags: ["autodocs"],
  argTypes: {
    side: {
      options: ["top", "bottom", "left", "right"],
      control: {
        type: "radio",
      },
    },
    children: {
      control: "text",
    },
  },
  args: {
    side: "top",
    children: "Add to library",
  },
  parameters: {
    layout: "centered",
  },
  render: (args) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add</span>
        </TooltipTrigger>
        <TooltipContent {...args} />
      </Tooltip>
    </TooltipProvider>
  ),
} satisfies Meta<typeof TooltipContent>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the tooltip.
 */
export const Default: Story = {};

/**
 * Use the `bottom` side to display the tooltip below the element.
 */
export const Bottom: Story = {
  args: {
    side: "bottom",
  },
};

/**
 * Use the `left` side to display the tooltip to the left of the element.
 */
export const Left: Story = {
  args: {
    side: "left",
  },
};

/**
 * Use the `right` side to display the tooltip to the right of the element.
 */
export const Right: Story = {
  args: {
    side: "right",
  },
};

// ---------------------------------------------------------------------------
// Interaction & accessibility tests
// ---------------------------------------------------------------------------

export const ShouldHaveTriggerWithAccessibleName: Story = {
  name: "should have trigger with accessible name (WCAG 4.1.2, 2.5.3)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    // 4.1.2 / 2.5.3 — trigger accessible name from sr-only text
    await waitFor(() => {
      expect(canvasBody.getByRole("button", { name: /add/i })).toBeInTheDocument();
    });
  },
};

export const ShouldMeetTargetSize: Story = {
  name: "should meet minimum trigger target size of 24px (WCAG 2.5.8)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);
    const trigger = canvasBody.getByRole("button", { name: /add/i });

    // 2.5.8 — trigger at least 24px
    await waitFor(() => {
      const { width, height } = trigger.getBoundingClientRect();
      expect(width).toBeGreaterThanOrEqual(24);
      expect(height).toBeGreaterThanOrEqual(24);
    });
  },
};

export const ShouldShowOnFocus: Story = {
  name: "should show tooltip on keyboard focus (WCAG 1.4.13)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    // 1.4.13 — tooltip appears on focus
    await userEvent.tab();

    await waitFor(() => {
      const tooltip = canvasElement.ownerDocument.body.querySelector(
        "[data-slot=tooltip-content]",
      );
      expect(tooltip).toBeVisible();
    });
  },
};

export const ShouldShowOnHover: Story = {
  name: "when hovering over trigger, should show hover tooltip content",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement, step }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);
    const triggerBtn = await canvasBody.findByRole("button", { name: /add/i });

    await step("hover over trigger", async () => {
      await userEvent.hover(triggerBtn);
      await waitFor(() =>
        expect(
          canvasElement.ownerDocument.body.querySelector(
            "[data-slot=tooltip-content]",
          ),
        ).toBeVisible(),
      );
    });

    await step("unhover trigger", async () => {
      await userEvent.unhover(triggerBtn);
      await waitFor(() => {
        const tooltipElement = canvasElement.ownerDocument.body.querySelector(
          "[data-slot=tooltip-content]",
        );
        expect(tooltipElement).toBeNull();
      });
    });
  },
};
