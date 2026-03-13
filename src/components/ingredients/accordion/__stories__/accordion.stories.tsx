import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ingredients/accordion";

/**
 * A vertically stacked set of interactive headings that each reveal a section
 * of content.
 */
const meta = {
  title: "ingredients/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  argTypes: {
    multiple: {
      control: "boolean",
      description: "Allow multiple accordion items to be open",
    },
    disabled: {
      control: "boolean",
    },
  },
  args: {
    multiple: false,
    disabled: false,
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components'
          aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Visual stories
// ---------------------------------------------------------------------------

/**
 * The default behavior of the accordion allows only one item to be open at a time.
 */
export const Default: Story = {};

/**
 * With multiple set to true, all items can be open simultaneously.
 */
export const Multiple: Story = {
  args: {
    multiple: true,
  },
};

// ---------------------------------------------------------------------------
// Interaction & accessibility tests
// ---------------------------------------------------------------------------

export const ShouldHaveCorrectRoleAndInitialState: Story = {
  name: "should have button role and be collapsed by default (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 4.1.2 — triggers must have button role
    const triggers = canvas.getAllByRole("button");
    await waitFor(() => expect(triggers).toHaveLength(3));

    // 4.1.2 — all items collapsed by default, state exposed to AT
    for (const trigger of triggers) {
      await expect(trigger).toHaveAttribute("aria-expanded", "false");
    }
  },
};

export const ShouldHaveAccessibleNames: Story = {
  name: "should have accessible name from trigger text (WCAG 4.1.2, 2.5.3)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 4.1.2 / 2.5.3 — accessible name matches visible label text
    await waitFor(() => {
      expect(canvas.getByRole("button", { name: "Is it accessible?" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Is it styled?" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Is it animated?" })).toBeInTheDocument();
    });
  },
};

export const ShouldMeetTargetSize: Story = {
  name: "should meet minimum trigger target size of 24px height (WCAG 2.5.8)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = canvas.getAllByRole("button");

    // 2.5.8 — each trigger must be at least 24px tall
    await waitFor(() => {
      for (const trigger of triggers) {
        const { height } = trigger.getBoundingClientRect();
        expect(height).toBeGreaterThanOrEqual(24);
      }
    });
  },
};

export const ShouldBeKeyboardFocusable: Story = {
  name: "should be reachable and navigable via keyboard (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = canvas.getAllByRole("button");

    // 2.1.1 — all triggers reachable via Tab in DOM order
    // Base UI accordion uses tabindex="0" on all triggers (not roving tabindex)
    for (const trigger of triggers) {
      await userEvent.tab();
      await waitFor(() => expect(trigger).toHaveFocus());
    }
  },
};

export const ShouldToggleViaEnterKey: Story = {
  name: "should toggle open and closed via Enter key (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getAllByRole("button")[0];

    await userEvent.tab();
    await waitFor(() => expect(trigger).toHaveFocus());

    // 2.1.1 — Enter opens
    await userEvent.keyboard("{Enter}");
    await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "true"));

    // 2.1.1 — Enter closes
    await userEvent.keyboard("{Enter}");
    await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "false"));
  },
};

export const ShouldToggleViaSpaceKey: Story = {
  name: "should toggle open and closed via Space key (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getAllByRole("button")[0];

    await userEvent.tab();
    await waitFor(() => expect(trigger).toHaveFocus());

    // 2.1.1 — Space opens
    await userEvent.keyboard(" ");
    await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "true"));

    // 2.1.1 — Space closes
    await userEvent.keyboard(" ");
    await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "false"));
  },
};

export const ShouldExposeExpandedStateToAT: Story = {
  name: "should expose expanded state change to AT (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getAllByRole("button")[0];

    // 4.1.2 — initial state
    await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "false"));

    await userEvent.click(trigger);

    // 4.1.2 — expanded state reflected to AT
    await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "true"));

    await userEvent.click(trigger);

    // 4.1.2 — collapsed state reflected to AT
    await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "false"));
  },
};

export const ShouldNotTrapKeyboardFocus: Story = {
  name: "should not trap keyboard focus (WCAG 2.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = canvas.getAllByRole("button");

    // Tab through all triggers
    for (const trigger of triggers) {
      await userEvent.tab();
      await waitFor(() => expect(trigger).toHaveFocus());
    }

    // Tab once more — focus must leave the last trigger
    // (2.1.2: no keyboard trap — user can Tab away from the component)
    await userEvent.tab();
    await waitFor(() => expect(triggers[triggers.length - 1]).not.toHaveFocus());
  },
};

export const ShouldOnlyOpenOneWhenSingleType: Story = {
  name: "when accordions are clicked, should open only one item at a time",
  args: {
    multiple: false,
  },
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = canvas.getAllByRole("button");
    const expandedCount = () =>
      triggers.filter(
        (trigger) => trigger.getAttribute("aria-expanded") === "true",
      ).length;

    // Open each trigger in turn — only one should be open at a time
    for (const trigger of triggers) {
      await userEvent.click(trigger);
      await waitFor(() => expect(expandedCount()).toBe(1));
    }

    // Close the last opened trigger
    await userEvent.click(triggers[triggers.length - 1]);
    await waitFor(() => expect(expandedCount()).toBe(0));
  },
};

export const ShouldOpenAllWhenMultipleType: Story = {
  name: "when accordions are clicked, should open all items one at a time",
  args: {
    multiple: true,
  },
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = canvas.getAllByRole("button");
    const expandedCount = () =>
      triggers.filter(
        (trigger) => trigger.getAttribute("aria-expanded") === "true",
      ).length;

    // Open all triggers one at a time — count should increment
    for (let i = 0; i < triggers.length; i++) {
      await userEvent.click(triggers[i]);
      await waitFor(() => expect(expandedCount()).toBe(i + 1));
    }

    // Close all triggers one at a time — count should decrement
    for (let i = triggers.length - 1; i >= 0; i--) {
      await userEvent.click(triggers[i]);
      await waitFor(() => expect(expandedCount()).toBe(i));
    }
  },
};