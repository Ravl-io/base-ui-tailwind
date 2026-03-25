import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ingredients/menubar";
import { expect, userEvent, waitFor, within } from "storybook/test";

/**
 * A visually persistent menu common in desktop applications that provides
 * quick access to a consistent set of commands.
 */
const meta = {
  title: "ingredients/Menubar",
  component: Menubar,
  tags: ["autodocs"],
  argTypes: {
    loop: {
      control: "boolean",
      description: "Whether keyboard navigation loops from last item to first",
    },
  },
  args: {
    loop: false,
  },
  render: (args) => (
    <Menubar {...args}>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>New Window</MenubarItem>
          <MenubarSeparator />
          <MenubarItem disabled>Share</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Menubar>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the menubar.
 */
export const Default: Story = {};

/**
 * A menubar with a submenu.
 */
export const WithSubmenu: Story = {
  render: (args) => (
    <Menubar {...args}>
      <MenubarMenu>
        <MenubarTrigger>Actions</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Download</MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

/**
 * A menubar with radio items.
 */
export const WithRadioItems: Story = {
  render: (args) => (
    <Menubar {...args}>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarLabel inset>Device Size</MenubarLabel>
          <MenubarRadioGroup value="md">
            <MenubarRadioItem value="sm">Small</MenubarRadioItem>
            <MenubarRadioItem value="md">Medium</MenubarRadioItem>
            <MenubarRadioItem value="lg">Large</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

/**
 * A menubar with checkbox items.
 */
export const WithCheckboxItems: Story = {
  render: (args) => (
    <Menubar {...args}>
      <MenubarMenu>
        <MenubarTrigger>Filters</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Show All</MenubarItem>
          <MenubarGroup>
            <MenubarCheckboxItem checked>Unread</MenubarCheckboxItem>
            <MenubarCheckboxItem checked>Important</MenubarCheckboxItem>
            <MenubarCheckboxItem>Flagged</MenubarCheckboxItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

// ---------------------------------------------------------------------------
// Interaction & accessibility tests
// ---------------------------------------------------------------------------

export const ShouldHaveMenubarRole: Story = {
  name: "should have menubar role (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    await waitFor(() => {
      expect(canvasBody.getByRole("menubar")).toBeInTheDocument();
    });
  },
};

export const ShouldMeetTriggerTargetSize: Story = {
  name: "should meet minimum trigger target size of 24px (WCAG 2.5.8)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);
    const trigger = canvasBody.getByRole("menuitem", { name: /file/i });

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
    const canvasBody = within(canvasElement.ownerDocument.body);

    await userEvent.tab();
    await waitFor(() => {
      expect(canvasBody.getByRole("menuitem", { name: /file/i })).toHaveFocus();
    });
  },
};

export const ShouldExposeMenuRole: Story = {
  name: "should expose menu role when opened (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    await userEvent.click(
      await canvasBody.findByRole("menuitem", { name: /file/i }),
    );

    await waitFor(() => {
      expect(canvasBody.getByRole("menu")).toBeInTheDocument();
    });
  },
};

export const ShouldCloseViaEscapeKey: Story = {
  name: "should close via Escape key (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    await userEvent.click(
      await canvasBody.findByRole("menuitem", { name: /file/i }),
    );
    await waitFor(() => expect(canvasBody.getByRole("menu")).toBeInTheDocument());

    await userEvent.keyboard("{Escape}");
    await waitFor(() => {
      expect(canvasBody.queryByRole("menu")).not.toBeInTheDocument();
    });
  },
};

export const ShouldOpenClose: Story = {
  name: "when clicking an item, should close the menubar",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement, step }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    await step("open the menubar", async () => {
      await userEvent.click(
        await canvasBody.findByRole("menuitem", { name: /file/i }),
      );
      expect(await canvasBody.findByRole("menu")).toBeInTheDocument();
    });

    const items = await canvasBody.findAllByRole("menuitem");
    expect(items).toHaveLength(5);

    await step("click the first item to close the menubar", async () => {
      await userEvent.click(items[0], { delay: 100 });
    });
  },
};
