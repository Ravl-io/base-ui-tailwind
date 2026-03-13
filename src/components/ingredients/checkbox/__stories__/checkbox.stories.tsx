import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Checkbox } from "@/components/ingredients/checkbox";
import { Label } from "@/components/ingredients/label";
import { A11Y_NOTES } from "@sb/a11yNotes";
import { A11yWarning } from "@sb/a11yWarning";

/**
 * A control that allows the user to toggle between checked and not checked.
 * Primitive wrapper around Base UI Checkbox. For full form integration
 * including label, helper text, and error state, use Form.Checkbox instead.
 */
const meta: Meta<typeof Checkbox> = {
  title: "ingredients/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: {
    id: "terms",
    disabled: false,
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} />
      <Label htmlFor={args.id}>Accept terms and conditions</Label>
    </div>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Visual stories
// ---------------------------------------------------------------------------

/**
 * The default form of the checkbox.
 */
export const Default: Story = {};

/**
 * Use the `disabled` prop to disable the checkbox.
 *
 * Disabled controls are not recommended without clear instructions on how to
 * enable them. See the accessibility guidance rendered below the story.
 */
export const Disabled: Story = {
  args: {
    id: "disabled-terms",
    disabled: true,
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Checkbox {...args} />
        <Label htmlFor={args.id}>Accept terms and conditions</Label>
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

export const ShouldHaveCorrectRole: Story = {
  name: "should have role checkbox (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 4.1.2 — role exposed to AT
    await waitFor(() => {
      expect(canvas.getByRole("checkbox")).toBeInTheDocument();
    });
  },
};

export const ShouldBeFocusableViaKeyboard: Story = {
  name: "should be reachable and focusable via keyboard (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 2.1.1 — reachable via Tab
    await userEvent.tab();

    await waitFor(() => {
      expect(canvas.getByRole("checkbox")).toHaveFocus();
    });
  },
};

export const ShouldToggleViaSpaceKey: Story = {
  name: "should toggle checked state via Space key (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    // 2.1.1 — operable via keyboard
    await userEvent.tab();
    await userEvent.keyboard(" ");

    await waitFor(() => {
      expect(checkbox).toBeChecked();
    });

    await userEvent.keyboard(" ");

    await waitFor(() => {
      expect(checkbox).not.toBeChecked();
    });
  },
};

export const ShouldToggleViaClick: Story = {
  name: "should toggle checked state via click (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    await userEvent.click(checkbox);
    await waitFor(() => expect(checkbox).toBeChecked());

    await userEvent.click(checkbox);
    await waitFor(() => expect(checkbox).not.toBeChecked());
  },
};

export const ShouldExposeCheckedStateToAT: Story = {
  name: "should expose checked state change to AT (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    // 4.1.2 — initial unchecked state exposed to AT
    await waitFor(() => expect(checkbox).not.toBeChecked());

    await userEvent.click(checkbox);

    // 4.1.2 — state change reflected to AT
    await waitFor(() => expect(checkbox).toBeChecked());
  },
};

export const ShouldBeDisabledAndNotFocusable: Story = {
  name: "should be disabled and not reachable via keyboard (WCAG 4.1.2, 2.1.1)",
  tags: ["!dev", "!autodocs"],
  args: {
    id: "disabled-terms",
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    // 4.1.2 — Base UI exposes disabled via aria-disabled on the span,
    // not the native disabled attribute
    await waitFor(() => expect(checkbox).toHaveAttribute("aria-disabled", "true"));

    // 2.1.1 — disabled controls must not be reachable via Tab
    await userEvent.tab();
    await waitFor(() => expect(checkbox).not.toHaveFocus());

    // Forced click must not toggle state
    await userEvent.click(checkbox, { pointerEventsCheck: 0 });
    await waitFor(() => expect(checkbox).not.toBeChecked());
  },
};