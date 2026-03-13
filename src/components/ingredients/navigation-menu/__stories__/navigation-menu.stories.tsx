import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ingredients/navigation-menu";

/**
 * A collection of links for navigating websites.
 */
const meta = {
  title: "ingredients/NavigationMenu",
  component: NavigationMenu,
  tags: ["autodocs"],
  argTypes: {},
  render: (args) => (
    <NavigationMenu {...args}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Overview
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Documentation</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-96 p-2">
              <li>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  API Reference
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Getting Started
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Guides
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            href="https://www.google.com"
            target="_blank"
          >
            External
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof NavigationMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Visual stories
// ---------------------------------------------------------------------------

/**
 * The default form of the navigation menu.
 *
 * Note: The Overview link has no href and is therefore not keyboard focusable.
 * In production use, NavigationMenuLink should always receive an href to be
 * reachable by keyboard users (WCAG 4.1.2).
 */
export const Default: Story = {};

// ---------------------------------------------------------------------------
// Interaction & accessibility tests
// ---------------------------------------------------------------------------

export const ShouldHaveNavLandmark: Story = {
  name: "should have navigation landmark (WCAG 1.3.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    // 1.3.1 — navigation landmark exposes region to AT
    await waitFor(() => {
      const nav = canvasElement.querySelector("[data-slot='navigation-menu']");
      expect(nav).toBeInTheDocument();
    });
  },
};

export const ShouldHaveAccessibleNames: Story = {
  name: "should have accessible names on all interactive elements (WCAG 4.1.2, 2.5.3)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 4.1.2 / 2.5.3 — trigger accessible name matches visible text
    await waitFor(() => {
      expect(
        canvas.getByRole("button", { name: /documentation/i }),
      ).toBeInTheDocument();
    });

    // 2.5.3 — link accessible name matches visible text
    await waitFor(() => {
      expect(canvas.getByRole("link", { name: /external/i })).toBeInTheDocument();
    });
  },
};

export const ShouldMeetTargetSize: Story = {
  name: "should meet minimum target size of 24px height (WCAG 2.5.8)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 2.5.8 — all top-level interactive elements at least 24px tall
    await waitFor(() => {
      const trigger = canvas.getByRole("button", { name: /documentation/i });
      const externalLink = canvas.getByRole("link", { name: /external/i });

      for (const el of [trigger, externalLink]) {
        const { height } = el.getBoundingClientRect();
        expect(height).toBeGreaterThanOrEqual(24);
      }
    });
  },
};

export const ShouldBeKeyboardFocusable: Story = {
  name: "should be reachable via keyboard Tab (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 2.1.1 — focusable items reachable via Tab in DOM order
    // Note: Overview has no href so it is not in the tab order
    await userEvent.tab();
    await waitFor(() =>
      expect(canvas.getByRole("button", { name: /documentation/i })).toHaveFocus(),
    );

    await userEvent.tab();
    await waitFor(() =>
      expect(canvas.getByRole("link", { name: /external/i })).toHaveFocus(),
    );
  },
};

export const ShouldOpenSubmenuViaClick: Story = {
  name: "should open submenu when trigger is clicked (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /documentation/i });

    // 4.1.2 — initial collapsed state exposed to AT
    await waitFor(() =>
      expect(trigger).toHaveAttribute("aria-expanded", "false"),
    );

    await userEvent.click(trigger);

    // 4.1.2 — expanded state reflected to AT after click
    await waitFor(() =>
      expect(trigger).toHaveAttribute("aria-expanded", "true"),
    );
  },
};

export const ShouldOpenSubmenuViaEnterKey: Story = {
  name: "should open submenu via Enter key (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /documentation/i });

    // One tab reaches the trigger — Overview <a> has no href so is not focusable
    await userEvent.tab();
    await waitFor(() => expect(trigger).toHaveFocus());

    // 2.1.1 — Enter opens submenu
    await userEvent.keyboard("{Enter}");
    await waitFor(() =>
      expect(trigger).toHaveAttribute("aria-expanded", "true"),
    );
  },
};

export const ShouldOpenSubmenuViaSpaceKey: Story = {
  name: "should open submenu via Space key (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /documentation/i });

    // One tab reaches the trigger — Overview <a> has no href so is not focusable
    await userEvent.tab();
    await waitFor(() => expect(trigger).toHaveFocus());

    // 2.1.1 — Space opens submenu
    await userEvent.keyboard(" ");
    await waitFor(() =>
      expect(trigger).toHaveAttribute("aria-expanded", "true"),
    );
  },
};

export const ShouldCloseSubmenuViaEscape: Story = {
  name: "should close submenu via Escape key (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /documentation/i });

    await userEvent.click(trigger);
    await waitFor(() =>
      expect(trigger).toHaveAttribute("aria-expanded", "true"),
    );

    // 2.1.1 — Escape closes submenu
    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(trigger).toHaveAttribute("aria-expanded", "false"),
    );
  },
};

export const ShouldNotTrapKeyboardFocus: Story = {
  name: "should not trap keyboard focus inside submenu (WCAG 2.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /documentation/i });

    // Open the submenu
    await userEvent.click(trigger);
    await waitFor(() =>
      expect(trigger).toHaveAttribute("aria-expanded", "true"),
    );

    // 2.1.2 — Escape must allow focus to escape the submenu
    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(trigger).toHaveAttribute("aria-expanded", "false"),
    );

    // Focus returns to trigger — not trapped inside popup
    await waitFor(() => expect(trigger).toHaveFocus());
  },
};