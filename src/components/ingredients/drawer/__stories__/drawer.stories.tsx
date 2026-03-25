import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/components/ingredients/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ingredients/drawer";
import { expect, fn, userEvent, within } from "storybook/test";

/**
 * A drawer component for React.
 */
const meta = {
  title: "ingredients/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "The direction from which the drawer slides in",
    },
    modal: {
      control: "boolean",
      description: "Whether the drawer should be modal (blocks interaction with the rest of the page)",
    },
    dismissible: {
      control: "boolean",
      description: "Whether the drawer can be dismissed by clicking outside or pressing Escape",
    },
    handleOnly: {
      control: "boolean",
      description: "Whether only the handle can be used to drag the drawer",
    },
  },
  args: {
    direction: "bottom",
    modal: true,
    dismissible: true,
    handleOnly: false,
    onOpenChange: fn(),
    onClose: fn(),
    onAnimationEnd: fn(),
  },
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you sure absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose className="bg-primary text-primary-foreground rounded px-4 py-2">
            Submit
          </DrawerClose>
          <DrawerClose className="hover:underline">Cancel</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the drawer, sliding up from the bottom.
 */
export const Bottom: Story = {};

/**
 * Use `direction="top"` to slide the drawer down from the top.
 */
export const Top: Story = {
  args: {
    direction: "top",
  },
};

/**
 * Use `direction="left"` to slide the drawer in from the left.
 */
export const Left: Story = {
  args: {
    direction: "left",
  },
};

/**
 * Use `direction="right"` to slide the drawer in from the right.
 */
export const Right: Story = {
  args: {
    direction: "right",
  },
};

/**
 * Use the `open` and `onOpenChange` props to control the drawer programmatically
 * from external triggers that live outside the `Drawer` component tree.
 * This is the more common real-world pattern — for example, opening a drawer
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

        <Drawer {...args} open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Are you sure absolutely sure?</DrawerTitle>
              <DrawerDescription>
                This action cannot be undone.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button onClick={() => setOpen(false)}>Submit</Button>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
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
    await expect(await canvasBody.findByRole("dialog")).toBeInTheDocument();
  },
};

export const ShouldHaveAccessibleName: Story = {
  name: "should have accessible name from title (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    await userEvent.click(await canvasBody.findByRole("button", { name: /open/i }));

    // 4.1.2 — accessible name from DrawerTitle
    const dialog = await canvasBody.findByRole("dialog");
    await expect(dialog).toHaveAccessibleName(/are you sure/i);
  },
};

export const ShouldOpenCloseWithSubmit: Story = {
  name: "when clicking Submit button, should close the drawer",
  tags: ["!dev", "!autodocs"],
  play: async ({ args, canvasElement, step }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    await step("Open the drawer", async () => {
      await userEvent.click(
        await canvasBody.findByRole("button", { name: /open/i }),
      );
      await expect(args.onOpenChange).toHaveBeenCalled();

      const dialog = await canvasBody.findByRole("dialog");
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute("data-state", "open");
    });

    await step("Close the drawer", async () => {
      await userEvent.click(
        await canvasBody.findByRole("button", { name: /submit/i }),
        { delay: 100 },
      );
      await expect(args.onClose).toHaveBeenCalled();
      expect(await canvasBody.findByRole("dialog")).toHaveAttribute(
        "data-state",
        "closed",
      );
    });
  },
};

export const ShouldOpenCloseWithCancel: Story = {
  name: "when clicking Cancel button, should close the drawer",
  tags: ["!dev", "!autodocs"],
  play: async ({ args, canvasElement, step }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    await step("Open the drawer", async () => {
      await userEvent.click(
        await canvasBody.findByRole("button", { name: /open/i }),
      );
      await expect(args.onOpenChange).toHaveBeenCalled();

      const dialog = await canvasBody.findByRole("dialog");
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute("data-state", "open");
    });

    await step("Close the drawer", async () => {
      await userEvent.click(
        await canvasBody.findByRole("button", { name: /cancel/i }),
        { delay: 100 },
      );
      await expect(args.onClose).toHaveBeenCalled();
      expect(await canvasBody.findByRole("dialog")).toHaveAttribute(
        "data-state",
        "closed",
      );
    });
  },
};
