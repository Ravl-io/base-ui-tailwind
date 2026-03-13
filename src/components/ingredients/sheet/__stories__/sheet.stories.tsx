import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/components/ingredients/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ingredients/sheet";
import { expect, userEvent, waitFor, within } from "storybook/test";

/**
 * Extends the Dialog component to display content that complements the main
 * content of the screen.
 */
const meta: Meta<typeof SheetContent> = {
  title: "ingredients/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  argTypes: {
    side: {
      options: ["top", "bottom", "left", "right"],
      control: {
        type: "radio",
      },
    },
  },
  args: {
    side: "right",
  },
  render: (args) => (
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent {...args}>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose className="hover:underline">Cancel</SheetClose>
          <SheetClose className="bg-primary text-primary-foreground rounded px-4 py-2">
            Submit
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof SheetContent>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the sheet, sliding in from the right.
 */
export const Right: Story = {
  args: {
    side: "right",
  },
};

/**
 * Use the `left` side to slide the sheet in from the left.
 */
export const Left: Story = {
  args: {
    side: "left",
  },
};

/**
 * Use the `top` side to slide the sheet in from the top.
 */
export const Top: Story = {
  args: {
    side: "top",
  },
};

/**
 * Use the `bottom` side to slide the sheet in from the bottom.
 */
export const Bottom: Story = {
  args: {
    side: "bottom",
  },
};

/**
 * Use the `open` and `onOpenChange` props to control the sheet programmatically
 * from an external trigger that lives outside the `Sheet` component tree.
 * This is the more common real-world pattern — for example, opening a sheet
 * from a table row action or a global keyboard shortcut.
 */
export const RemoteTrigger: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="flex gap-2">
        <Button onClick={() => setOpen(true)}>Edit Profile</Button>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Settings
        </Button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent {...args}>
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <SheetClose className="hover:underline">Cancel</SheetClose>
              <Button onClick={() => setOpen(false)}>Submit</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
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

    // 4.1.2 — accessible name from SheetTitle
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

export const ShouldOpenCloseWithSubmit: Story = {
  name: "when clicking Submit button, should close the sheet",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement, step }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    await step("open the sheet", async () => {
      await userEvent.click(
        await canvasBody.findByRole("button", { name: /open/i }),
      );
      const sheet = await canvasBody.findByRole("dialog");
      await waitFor(() => {
        expect(sheet).toHaveAttribute("data-open");
      });
    });

    await step("close the sheet", async () => {
      await userEvent.click(
        await canvasBody.findByRole("button", { name: /submit/i }),
      );
      await waitFor(() => {
        expect(canvasBody.queryByRole("dialog")).not.toBeInTheDocument();
      });
    });
  },
};

export const ShouldOpenCloseWithCancel: Story = {
  name: "when clicking Cancel button, should close the sheet",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement, step }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    await step("open the sheet", async () => {
      await userEvent.click(
        await canvasBody.findByRole("button", { name: /open/i }),
      );
      const sheet = await canvasBody.findByRole("dialog");
      await waitFor(() => {
        expect(sheet).toHaveAttribute("data-open");
      });
    });

    await step("close the sheet", async () => {
      await userEvent.click(
        await canvasBody.findByRole("button", { name: /cancel/i }),
      );
      await waitFor(() => {
        expect(canvasBody.queryByRole("dialog")).not.toBeInTheDocument();
      });
    });
  },
};

export const ShouldOpenCloseWithClose: Story = {
  name: "when clicking Close icon, should close the sheet",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement, step }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    await step("open the sheet", async () => {
      await userEvent.click(
        await canvasBody.findByRole("button", { name: /open/i }),
      );
      const sheet = await canvasBody.findByRole("dialog");
      await waitFor(() => {
        expect(sheet).toHaveAttribute("data-open");
      });
    });

    await step("close the sheet", async () => {
      await userEvent.click(
        await canvasBody.findByRole("button", { name: /close/i }),
      );
      await waitFor(() => {
        expect(canvasBody.queryByRole("dialog")).not.toBeInTheDocument();
      });
    });
  },
};
