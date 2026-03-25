import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ingredients/alert-dialog";
import { Button } from "@/components/ingredients/button";

/**
 * A modal dialog that interrupts the user with important content and expects
 * a response.
 */
const meta = {
  title: "ingredients/AlertDialog",
  component: AlertDialog,
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "Controlled open state of the alert dialog",
    },
  },
  args: {
    open: undefined,
  },
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger>Open</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the alert dialog.
 */
export const Default: Story = {};

/**
 * Use the `open` and `onOpenChange` props to control the alert dialog
 * programmatically from external triggers that live outside the `AlertDialog`
 * component tree. This is the more common real-world pattern — for example,
 * confirming a destructive action triggered from a table row or toolbar.
 */
export const RemoteTrigger: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="flex gap-2">
        <Button variant="destructive" onClick={() => setOpen(true)}>
          Delete Account
        </Button>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Remove Data
        </Button>

        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={() => setOpen(false)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Interaction & accessibility tests
// ---------------------------------------------------------------------------

export const ShouldHaveAlertDialogRole: Story = {
  name: "should have role alertdialog when open (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement, canvas }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    await userEvent.click(canvas.getByRole("button", { name: /open/i }));

    // 4.1.2 — alertdialog role exposed
    await waitFor(() => {
      expect(canvasBody.getByRole("alertdialog")).toBeInTheDocument();
    });
  },
};

export const ShouldHaveAccessibleName: Story = {
  name: "should have accessible name from title (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement, canvas }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    await userEvent.click(canvas.getByRole("button", { name: /open/i }));

    // 4.1.2 — dialog has accessible name
    await waitFor(() => {
      expect(canvasBody.getByRole("alertdialog")).toHaveAccessibleName(
        /are you sure/i,
      );
    });
  },
};

export const ShouldReturnFocusToTrigger: Story = {
  name: "should return focus to trigger after close (WCAG 2.4.3)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement, canvas }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole("button", { name: /open/i });

    await userEvent.click(trigger);
    await waitFor(() => expect(canvasBody.getByRole("alertdialog")).toBeInTheDocument());

    await userEvent.click(canvasBody.getByRole("button", { name: /cancel/i }));
    await waitFor(() => expect(canvasBody.queryByRole("alertdialog")).not.toBeInTheDocument());

    // 2.4.3 — focus returns to trigger
    await waitFor(() => expect(trigger).toHaveFocus());
  },
};

export const ShouldOpenClose: Story = {
  name: "when alert dialog trigger is pressed, should open the dialog and be able to close it",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement, canvas, step }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    await step("open the alert dialog", async () => {
      await userEvent.click(
        await canvas.getByRole("button", {
          name: /open/i,
        }),
      );
    });

    await step("close the alert dialog", async () => {
      await userEvent.click(
        await canvasBody.getByRole("button", {
          name: /cancel/i,
        }),
        { delay: 100 },
      );
    });
  },
};
