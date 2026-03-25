import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, waitFor, within } from "storybook/test";

import { Separator } from "@/components/ingredients/separator";

/**
 * Visually or semantically separates content.
 */
const meta = {
  title: "ingredients/Separator",
  component: Separator,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
  args: {
    orientation: "horizontal",
  },
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default horizontal separator between vertical items.
 */
export const Default: Story = {
  render: () => (
    <div className="flex flex-col items-center justify-center gap-2">
      <div>Top</div>
      <Separator orientation="horizontal" />
      <div>Bottom</div>
    </div>
  ),
};

/**
 * Use `orientation="vertical"` for a vertical separator between horizontal items.
 */
export const Vertical: Story = {
  render: () => (
    <div className="flex h-12 items-center justify-center gap-2">
      <div>Left</div>
      <Separator orientation="vertical" />
      <div>Right</div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Interaction & accessibility tests
// ---------------------------------------------------------------------------

export const ShouldHaveSeparatorRole: Story = {
  name: "should have separator role (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByRole("separator")).toBeInTheDocument();
    });
  },
};

export const ShouldExposeOrientation: Story = {
  name: "should expose orientation to assistive technology (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  render: () => (
    <div className="flex h-12 items-center justify-center gap-2">
      <div>Left</div>
      <Separator orientation="vertical" />
      <div>Right</div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      const separator = canvas.getByRole("separator");
      expect(separator).toHaveAttribute("aria-orientation", "vertical");
    });
  },
};
