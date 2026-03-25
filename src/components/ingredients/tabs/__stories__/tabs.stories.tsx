import { expect, userEvent, waitFor } from "storybook/test";
// Replace nextjs-vite with the name of your framework
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ingredients/tabs";

/**
 * A set of layered sections of content—known as tab panels—that are displayed
 * one at a time.
 */
const meta = {
  title: "ingredients/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: "text",
      description: "The value of the tab that should be active when initially rendered",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
  args: {
    defaultValue: "account",
    orientation: "horizontal",
    className: "w-96",
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the tabs.
 */
export const Default: Story = {};

// ---------------------------------------------------------------------------
// Interaction & accessibility tests
// ---------------------------------------------------------------------------

export const ShouldHaveTablistRole: Story = {
  name: "should have tablist role (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas }) => {
    // 4.1.2 — tablist role exposed
    await waitFor(() => {
      expect(canvas.getByRole("tablist")).toBeInTheDocument();
    });
  },
};

export const ShouldHaveTabRoles: Story = {
  name: "should have tab roles with correct count (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas }) => {
    // 4.1.2 — tab roles exposed
    await waitFor(() => {
      expect(canvas.getAllByRole("tab")).toHaveLength(2);
    });
  },
};

export const ShouldHaveAccessibleNames: Story = {
  name: "should have accessible names from tab text (WCAG 4.1.2, 2.5.3)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas }) => {
    // 4.1.2 / 2.5.3 — accessible names match visible text
    await waitFor(() => {
      expect(canvas.getByRole("tab", { name: "Account" })).toBeInTheDocument();
      expect(canvas.getByRole("tab", { name: "Password" })).toBeInTheDocument();
    });
  },
};

export const ShouldMeetTargetSize: Story = {
  name: "should meet minimum tab target size of 24px (WCAG 2.5.8)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas }) => {
    const tabs = canvas.getAllByRole("tab");

    // 2.5.8 — tabs at least 24px tall
    await waitFor(() => {
      for (const tab of tabs) {
        const { height } = tab.getBoundingClientRect();
        expect(height).toBeGreaterThanOrEqual(24);
      }
    });
  },
};

export const ShouldBeFocusableViaKeyboard: Story = {
  name: "should be reachable via keyboard Tab (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas }) => {
    // 2.1.1 — Tab reaches the tablist
    await userEvent.tab();
    await waitFor(() => {
      expect(canvas.getByRole("tab", { name: "Account" })).toHaveFocus();
    });
  },
};

export const ShouldNavigateViaArrowKeys: Story = {
  name: "should navigate tabs via arrow keys (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas }) => {
    // Focus first tab
    await userEvent.tab();
    await waitFor(() =>
      expect(canvas.getByRole("tab", { name: "Account" })).toHaveFocus(),
    );

    // 2.1.1 — ArrowRight moves to next tab
    await userEvent.keyboard("{ArrowRight}");
    await waitFor(() =>
      expect(canvas.getByRole("tab", { name: "Password" })).toHaveFocus(),
    );
  },
};

export const ShouldActivateViaClick: Story = {
  name: "should activate tab and expose aria-selected (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas }) => {
    const tabs = canvas.getAllByRole("tab");

    // Click second tab
    await userEvent.click(tabs[1]);

    // 4.1.2 — selected state exposed
    await waitFor(() => {
      expect(tabs[1]).toHaveAttribute("aria-selected", "true");
      expect(tabs[0]).toHaveAttribute("aria-selected", "false");
    });
  },
};

export const ShouldHaveTabpanelRole: Story = {
  name: "should have tabpanel role for selected content (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas }) => {
    // 4.1.2 — tabpanel role exposed for active panel
    await waitFor(() => {
      expect(canvas.getByRole("tabpanel")).toBeInTheDocument();
    });
  },
};
