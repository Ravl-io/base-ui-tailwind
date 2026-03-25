import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/components/ingredients/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ingredients/popover";
import { expect, userEvent, waitFor, within } from "storybook/test";

/**
 * Displays rich content in a portal, triggered by a button.
 */
const meta = {
  title: "ingredients/Popover",
  component: Popover,
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "Controlled open state of the popover",
    },
    defaultOpen: {
      control: "boolean",
      description: "Whether the popover is open by default (uncontrolled)",
    },
  },
  args: {
    open: undefined,
    defaultOpen: false,
  },

  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger>Open</PopoverTrigger>
      <PopoverContent>Place content for the popover here.</PopoverContent>
    </Popover>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the popover.
 */
export const Default: Story = {};

/**
 * Use the `open` and `onOpenChange` props to control the popover programmatically
 * from an external trigger that lives outside the `Popover` component tree.
 * This is a common pattern when the popover needs to be opened from a different
 * part of the UI, such as a toolbar button or contextual action.
 */
export const RemoteTrigger: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="flex gap-2">
        <Button onClick={() => setOpen(true)}>Show Info</Button>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Details
        </Button>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverContent>Place content for the popover here.</PopoverContent>
        </Popover>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Interaction & accessibility tests
// ---------------------------------------------------------------------------

export const ShouldHaveTriggerWithButtonRole: Story = {
  name: "should have trigger with button role (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    // 4.1.2 — trigger has button role
    await waitFor(() => {
      expect(canvasBody.getByRole("button", { name: /open/i })).toBeInTheDocument();
    });
  },
};

export const ShouldMeetTargetSize: Story = {
  name: "should meet minimum trigger target size of 24px (WCAG 2.5.8)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);
    const trigger = canvasBody.getByRole("button", { name: /open/i });

    // 2.5.8 — trigger at least 24px
    await waitFor(() => {
      const { height } = trigger.getBoundingClientRect();
      expect(height).toBeGreaterThanOrEqual(24);
    });
  },
};

export const ShouldOpenViaEnterKey: Story = {
  name: "should open via Enter key (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    await userEvent.tab();
    await waitFor(() =>
      expect(canvasBody.getByRole("button", { name: /open/i })).toHaveFocus(),
    );

    // 2.1.1 — Enter opens
    await userEvent.keyboard("{Enter}");
    await waitFor(() => {
      expect(canvasBody.getByRole("dialog")).toBeInTheDocument();
    });
  },
};

export const ShouldCloseViaEscapeKey: Story = {
  name: "should close via Escape key (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    await userEvent.click(canvasBody.getByRole("button", { name: /open/i }));
    await waitFor(() => expect(canvasBody.getByRole("dialog")).toBeInTheDocument());

    // 2.1.1 — Escape closes
    await userEvent.keyboard("{Escape}");
    await waitFor(() => {
      expect(canvasBody.queryByRole("dialog")).not.toBeInTheDocument();
    });
  },
};

export const ShouldOpenClose: Story = {
  name: "when clicking the trigger, should open and close the popover",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement, step }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    await step("click the trigger to open the popover", async () => {
      await userEvent.click(
        await canvasBody.findByRole("button", { name: /open/i }),
      );
      expect(await canvasBody.findByRole("dialog")).toBeInTheDocument();
    });

    await step("click the trigger to close the popover", async () => {
      await userEvent.click(
        await canvasBody.findByRole("button", { name: /open/i }),
      );
      await waitFor(() => {
        expect(canvasBody.queryByRole("dialog")).not.toBeInTheDocument();
      });
    });
  },
};
