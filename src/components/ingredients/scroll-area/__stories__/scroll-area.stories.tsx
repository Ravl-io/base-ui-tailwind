import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { ScrollArea } from "@/components/ingredients/scroll-area";

/**
 * Augments native scroll functionality for custom, cross-browser styling.
 */
const meta = {
  title: "ingredients/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
    },
  },
  args: {
    className: "h-32 w-80 rounded-md border p-4",
    children:
      "Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place: under the king's pillow, in his soup, even in the royal toilet. The king was furious, but he couldn't seem to stop Jokester. And then, one day, the people of the kingdom discovered that the jokes left by Jokester were so funny that they couldn't help but laugh. And once they started laughing, they couldn't stop. The king was so angry that he banished Jokester from the kingdom, but the people still laughed, and they laughed, and they laughed. And they all lived happily ever after.",
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ScrollArea>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the scroll area.
 */
export const Default: Story = {};

/**
 * Use the `overflowEdgeThreshold` prop to control when edge styles appear.
 */
export const WithEdgeThreshold: Story = {
  args: {
    overflowEdgeThreshold: 12,
  },
};

// ---------------------------------------------------------------------------
// Interaction & accessibility tests
// ---------------------------------------------------------------------------

export const ShouldExposeContentToAT: Story = {
  name: "should expose scrollable content to assistive technology (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByText(/jokester/i)).toBeInTheDocument();
    });
  },
};

export const ShouldBeFocusableViaKeyboard: Story = {
  name: "should focus viewport via keyboard for scrolling (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    // The scroll-area viewport has focus-visible styles so it must be
    // reachable via Tab to allow keyboard-only users to scroll.
    await userEvent.tab();
    await waitFor(() => {
      const focused = canvasElement.ownerDocument.activeElement;
      expect(
        focused?.closest("[data-slot=scroll-area-viewport]"),
      ).toBeInTheDocument();
    });
  },
};
