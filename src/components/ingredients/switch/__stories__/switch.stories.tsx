import { expect, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Label } from "@/components/ingredients/label";
import { Switch } from "@/components/ingredients/switch";
import { A11Y_NOTES } from "@sb/a11yNotes";
import { A11yWarning } from "@sb/a11yWarning";

/**
 * A control that allows the user to toggle between checked and not checked.
 */
const meta = {
  title: "ingredients/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm"],
    },
    disabled: {
      control: "boolean",
    },
    defaultChecked: {
      control: "boolean",
      description: "Initial checked state (uncontrolled).",
    },
  },
  args: {
    size: "default",
    disabled: false,
    defaultChecked: false,
  },
  parameters: {
    layout: "centered",
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch {...args} />
      <Label htmlFor={args.id}>Airplane Mode</Label>
    </div>
  ),
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the switch.
 */
export const Default: Story = {
  args: {
    id: "default-switch",
  },
};

/**
 * Use the `disabled` prop to disable the switch.
 *
 * Disabled controls are not recommended without clear instructions on how to
 * enable them. See the accessibility guidance rendered below the story.
 */
export const Disabled: Story = {
  args: {
    id: "disabled-switch",
    disabled: true,
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center space-x-2">
        <Switch {...args} />
        <Label htmlFor={args.id}>Airplane Mode</Label>
      </div>
      <A11yWarning message={A11Y_NOTES.DISABLED_NOT_RECOMMENDED.text} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: A11Y_NOTES.DISABLED_NOT_RECOMMENDED.markdown,
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Interaction & accessibility tests
// ---------------------------------------------------------------------------

export const ShouldHaveSwitchRole: Story = {
  name: "should have role switch (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  args: { id: "test-switch" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 4.1.2 — role exposed to AT
    await waitFor(() => {
      expect(canvas.getByRole("switch")).toBeInTheDocument();
    });
  },
};

export const ShouldMeetTargetSize: Story = {
  name: "should meet minimum target size of 24px (WCAG 2.5.8)",
  tags: ["!dev", "!autodocs"],
  args: { id: "size-switch" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const sw = canvas.getByRole("switch");

    // 2.5.8 — target at least 24px wide
    await waitFor(() => {
      const { width } = sw.getBoundingClientRect();
      expect(width).toBeGreaterThanOrEqual(24);
    });
  },
};

export const ShouldBeFocusableViaKeyboard: Story = {
  name: "should be reachable via keyboard Tab (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  args: { id: "focus-switch" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 2.1.1 — reachable via Tab
    await userEvent.tab();
    await waitFor(() => expect(canvas.getByRole("switch")).toHaveFocus());
  },
};

export const ShouldToggleViaSpaceKey: Story = {
  name: "should toggle checked state via Space key (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  args: { id: "space-switch" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.tab();
    await waitFor(() => expect(canvas.getByRole("switch")).toHaveFocus());

    // 2.1.1 — Space toggles
    await userEvent.keyboard(" ");
    await waitFor(() => expect(canvas.getByRole("switch")).toBeChecked());

    await userEvent.keyboard(" ");
    await waitFor(() => expect(canvas.getByRole("switch")).not.toBeChecked());
  },
};

export const ShouldToggleViaClick: Story = {
  name: "should toggle checked state via click (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  args: { id: "click-switch" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const sw = canvas.getByRole("switch");

    await userEvent.click(sw);
    await waitFor(() => expect(sw).toBeChecked());

    await userEvent.click(sw);
    await waitFor(() => expect(sw).not.toBeChecked());
  },
};

export const ShouldExposeCheckedStateToAT: Story = {
  name: "should expose checked state change to AT (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  args: { id: "state-switch" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const sw = canvas.getByRole("switch");

    // 4.1.2 — initial unchecked
    await waitFor(() => expect(sw).not.toBeChecked());

    await userEvent.click(sw);

    // 4.1.2 — checked state reflected
    await waitFor(() => expect(sw).toBeChecked());
  },
};

export const ShouldExposeDisabledState: Story = {
  name: "should expose disabled state and not be focusable (WCAG 4.1.2, 2.1.1)",
  tags: ["!dev", "!autodocs"],
  args: { id: "disabled-test-switch", disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const sw = canvas.getByRole("switch");

    // 4.1.2 — disabled state exposed (Base UI uses aria-disabled on a <span>,
    // which toBeDisabled() doesn't recognise — check the attribute directly)
    await waitFor(() => expect(sw).toHaveAttribute("aria-disabled", "true"));

    // 2.1.1 — not reachable via Tab
    await userEvent.tab();
    await waitFor(() => expect(sw).not.toHaveFocus());
  },
};
