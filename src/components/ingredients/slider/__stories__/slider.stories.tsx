import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Slider } from "@/components/ingredients/slider";
import { A11Y_NOTES } from "@sb/a11yNotes";
import { A11yWarning } from "@sb/a11yWarning";

/**
 * An input where the user selects a value from within a given range.
 */
const meta = {
  title: "ingredients/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    defaultValue: [33],
    max: 100,
    step: 1,
  },
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the slider.
 */
export const Default: Story = {};

/**
 * Use the `orientation` prop to render a vertical slider.
 */
export const Vertical: Story = {
  args: {
    orientation: "vertical",
    className: "h-40",
  },
};

/**
 * Use the `disabled` prop to disable the slider.
 *
 * Disabled controls are not recommended without clear instructions on how to
 * enable them. See the accessibility guidance rendered below the story.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Slider {...args} />
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

export const ShouldHaveSliderRole: Story = {
  name: "should have role slider (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 4.1.2 — role exposed to AT
    await waitFor(() => {
      expect(canvas.getByRole("slider")).toBeInTheDocument();
    });
  },
};

export const ShouldHaveAccessibleValue: Story = {
  name: "should expose value, min, and max to AT (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const slider = canvas.getByRole("slider");

    // 4.1.2 — Base UI renders a native <input type="range"> so min/max are
    // native attributes while aria-valuenow is set explicitly.
    await waitFor(() => {
      expect(slider).toHaveAttribute("aria-valuenow", "33");
      expect(slider).toHaveAttribute("min", "0");
      expect(slider).toHaveAttribute("max", "100");
    });
  },
};

export const ShouldBeFocusableViaKeyboard: Story = {
  name: "should be reachable via keyboard Tab (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 2.1.1 — reachable via Tab
    await userEvent.tab();
    await waitFor(() => expect(canvas.getByRole("slider")).toHaveFocus());
  },
};

export const ShouldChangeValueViaArrowKeys: Story = {
  name: "should change value via arrow keys (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const slider = canvas.getByRole("slider");

    await userEvent.tab();
    await waitFor(() => expect(slider).toHaveFocus());

    const initialValue = Number(slider.getAttribute("aria-valuenow"));

    // 2.1.1 — ArrowRight increases value
    await userEvent.keyboard("{ArrowRight}");
    await waitFor(() => {
      const newValue = Number(slider.getAttribute("aria-valuenow"));
      expect(newValue).toBeGreaterThan(initialValue);
    });
  },
};
