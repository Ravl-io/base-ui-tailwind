import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ingredients/pagination";

/**
 * Pagination with page navigation, next and previous links.
 */
const meta = {
  title: "ingredients/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {},
  render: (args) => (
    <Pagination {...args}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the pagination.
 */
export const Default: Story = {};

// ---------------------------------------------------------------------------
// Interaction & accessibility tests
// ---------------------------------------------------------------------------

export const ShouldHaveNavLandmark: Story = {
  name: "should have navigation landmark with aria-label (WCAG 1.3.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1.3.1 — nav with accessible name
    await waitFor(() => {
      expect(canvas.getByRole("navigation")).toHaveAccessibleName("pagination");
    });
  },
};

export const ShouldHaveAccessibleNames: Story = {
  name: "should have accessible names on Previous and Next (WCAG 4.1.2, 2.5.3)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 4.1.2 / 2.5.3 — accessible names on nav buttons
    await waitFor(() => {
      expect(canvas.getByRole("button", { name: /previous/i })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: /next/i })).toBeInTheDocument();
    });
  },
};

export const ShouldMeetTargetSize: Story = {
  name: "should meet minimum target size of 24px (WCAG 2.5.8)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole("button");

    // 2.5.8 — all pagination items at least 24px
    await waitFor(() => {
      for (const btn of buttons) {
        const { width, height } = btn.getBoundingClientRect();
        expect(width).toBeGreaterThanOrEqual(24);
        expect(height).toBeGreaterThanOrEqual(24);
      }
    });
  },
};

export const ShouldBeFocusableViaKeyboard: Story = {
  name: "should be reachable via keyboard Tab (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 2.1.1 — Tab reaches first button
    await userEvent.tab();
    await waitFor(() => {
      const buttons = canvas.getAllByRole("button");
      expect(buttons[0]).toHaveFocus();
    });
  },
};
