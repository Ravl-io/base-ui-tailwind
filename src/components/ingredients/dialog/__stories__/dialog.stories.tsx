import * as React from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/components/ingredients/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ingredients/dialog";

/**
 * A window overlaid on either the primary window or another dialog window,
 * rendering the content underneath inert.
 */
const meta = {
  title: "ingredients/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  argTypes: {
    defaultOpen: {
      control: "boolean",
      description: "Whether the dialog is initially open (uncontrolled)",
    },
    modal: {
      control: "boolean",
      description: "Whether the dialog blocks interaction with the rest of the page",
    },
  },
  args: {
    defaultOpen: false,
    modal: true,
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-4">
          <DialogClose className="hover:underline">Cancel</DialogClose>
          <DialogClose className="bg-primary text-primary-foreground rounded px-4 py-2">
            Continue
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the dialog.
 */
export const Default: Story = {};

/**
 * Use the `open` and `onOpenChange` props to control the dialog programmatically
 * from external triggers that live outside the `Dialog` component tree.
 * This is the more common real-world pattern — for example, opening a dialog
 * from a table row action or a global keyboard shortcut.
 */
export const RemoteTrigger: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="flex gap-2">
        <Button onClick={() => setOpen(true)}>Edit Profile</Button>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Settings
        </Button>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-4">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Continue</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Interaction & accessibility tests
// ---------------------------------------------------------------------------

export const ShouldHaveDialogRole: Story = {
  name: "should have role dialog when open (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    await userEvent.click(await canvasBody.findByRole("button", { name: /open/i }));

    // 4.1.2 — dialog role exposed
    await waitFor(() => {
      expect(canvasBody.getByRole("dialog")).toBeInTheDocument();
    });
  },
};

export const ShouldHaveAccessibleName: Story = {
  name: "should have accessible name from title (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    await userEvent.click(await canvasBody.findByRole("button", { name: /open/i }));

    // 4.1.2 — dialog has accessible name from title
    await waitFor(() => {
      expect(canvasBody.getByRole("dialog")).toHaveAccessibleName(
        /are you absolutely sure/i,
      );
    });
  },
};

export const ShouldCloseViaEscapeKey: Story = {
  name: "should close via Escape key (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    await userEvent.click(await canvasBody.findByRole("button", { name: /open/i }));
    await waitFor(() => expect(canvasBody.getByRole("dialog")).toBeInTheDocument());

    // 2.1.1 — Escape closes
    await userEvent.keyboard("{Escape}");
    await waitFor(() => {
      expect(canvasBody.queryByRole("dialog")).not.toBeInTheDocument();
    });
  },
};

export const ShouldReturnFocusToTrigger: Story = {
  name: "should return focus to trigger after close (WCAG 2.4.3)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);
    const trigger = await canvasBody.findByRole("button", { name: /open/i });

    await userEvent.click(trigger);
    await waitFor(() => expect(canvasBody.getByRole("dialog")).toBeInTheDocument());

    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(canvasBody.queryByRole("dialog")).not.toBeInTheDocument());

    // 2.4.3 — focus returns to trigger
    await waitFor(() => expect(trigger).toHaveFocus());
  },
};

export const ShouldOpenCloseWithContinue: Story = {
  name: "when clicking Continue button, should close the dialog",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement, step }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    await step("Open the dialog", async () => {
      await userEvent.click(
        await canvasBody.findByRole("button", { name: /open/i }),
      );
      const dialog = await canvasBody.findByRole("dialog");
      await waitFor(() => {
        expect(dialog).toHaveAttribute("data-open");
      });
    });

    await step("Close the dialog", async () => {
      await userEvent.click(
        await canvasBody.findByRole("button", { name: /continue/i }),
      );
      await waitFor(() => {
        expect(canvasBody.queryByRole("dialog")).not.toBeInTheDocument();
      });
    });
  },
};

export const ShouldOpenCloseWithCancel: Story = {
  name: "when clicking Cancel button, should close the dialog",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement, step }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    await step("Open the dialog", async () => {
      await userEvent.click(
        await canvasBody.findByRole("button", { name: /open/i }),
      );
      const dialog = await canvasBody.findByRole("dialog");
      await waitFor(() => {
        expect(dialog).toHaveAttribute("data-open");
      });
    });

    await step("Close the dialog", async () => {
      await userEvent.click(
        await canvasBody.findByRole("button", { name: /cancel/i }),
      );
      await waitFor(() => {
        expect(canvasBody.queryByRole("dialog")).not.toBeInTheDocument();
      });
    });
  },
};

export const ShouldOpenCloseCross: Story = {
  name: "when clicking Close icon, should close the dialog",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement, step }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    await step("Open the dialog", async () => {
      await userEvent.click(
        await canvasBody.findByRole("button", { name: /open/i }),
      );
      const dialog = await canvasBody.findByRole("dialog");
      await waitFor(() => {
        expect(dialog).toHaveAttribute("data-open");
      });
    });

    await step("Close the dialog", async () => {
      await userEvent.click(
        await canvasBody.findByRole("button", { name: /close/i }),
      );
      await waitFor(() => {
        expect(canvasBody.queryByRole("dialog")).not.toBeInTheDocument();
      });
    });
  },
};
