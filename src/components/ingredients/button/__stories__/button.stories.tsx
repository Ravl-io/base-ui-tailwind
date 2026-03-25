import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { useState } from "react";
import { Mail } from "lucide-react";

import { Button } from "@/components/ingredients/button";
import { A11Y_NOTES } from "@sb/a11yNotes";
import { A11yWarning } from "@sb/a11yWarning";

/**
 * Displays a button or a component that looks like a button.
 */
const meta: Meta<typeof Button> = {
  title: "ingredients/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
    size: {
      control: "select",
      options: [
        "default",
        "xs",
        "sm",
        "lg",
        "icon",
        "icon-xs",
        "icon-sm",
        "icon-lg",
      ],
      if: { arg: "variant", neq: "link" },
    },
    children: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
    isLoading: {
      control: "boolean",
      description: "Shows a loading spinner and disables the button. Button width remains stable.",
    },
    label: {
      control: "object",
      description: "Labels for screen reader announcements. label.loading is announced when isLoading is true.",
    },
  },
  parameters: {
    layout: "centered",
  },
  args: {
    variant: "default",
    size: "default",
    children: "Button",
    disabled: false,
    isLoading: false,
    label: { loading: "" },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the button, used for primary actions and commands.
 */
export const Default: Story = {};

/**
 * Use the `outline` button to reduce emphasis on secondary actions, such as
 * canceling or dismissing a dialog.
 */
export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

/**
 * Use the `ghost` button is minimalistic and subtle, for less intrusive
 * actions.
 */
export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

/**
 * Use the `secondary` button to call for less emphasized actions, styled to
 * complement the primary button while being less conspicuous.
 */
export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

/**
 * Use the `destructive` button to indicate errors, alerts, or the need for
 * immediate attention.
 */
export const Destructive: Story = {
  args: {
    variant: "destructive",
  },
};

/**
 * Use the `link` button to reduce emphasis on tertiary actions, such as
 * hyperlink or navigation, providing a text-only interactive element.
 */
export const Link: Story = {
  args: {
    variant: "link",
  },
};

/**
 * Use `isLoading` to indicate an in-progress action. The button is disabled
 * and a spinner replaces the label visually while the button width stays stable.
 */
export const Loading: Story = {
  args: {
    isLoading: true,
    label: { loading: "Submitting, please wait" },
  },
};

/**
 * Loading state works across all variants.
 */
export const LoadingOutline: Story = {
  args: {
    variant: "outline",
    isLoading: true,
    label: { loading: "Submitting, please wait" },
  },
};

/**
 * Click the button to trigger a 1 second loading state. Use a screen reader
 * to verify the loading announcement.
 */
export const InteractiveLoading: Story = {
  name: "Interactive — click to trigger loading state",
  render: () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 5000);
    };

    return (
      <Button
        isLoading={isLoading}
        onClick={handleClick}
        label={{ loading: "Loading, please wait" }}
      >
        Click here to spin
      </Button>
    );
  },
};

/**
 * Add an icon element to a button to enhance visual communication and
 * providing additional context for the action.
 */
export const WithIcon: Story = {
  render: (args) => (
    <Button {...args}>
      <Mail className="mr-2 h-4 w-4" /> Login with Email Button
    </Button>
  ),
  args: {
    ...Secondary.args,
  },
};

/**
 * Use the `sm` size for a smaller button, suitable for interfaces needing
 * compact elements without sacrificing usability.
 */
export const Small: Story = {
  args: {
    size: "sm",
  },
};

/**
 * Use the `lg` size for a larger button, offering better visibility and
 * easier interaction for users.
 */
export const Large: Story = {
  args: {
    size: "lg",
  },
};

/**
 * Use the "icon" size for a button with only an icon.
 */
export const Icon: Story = {
  args: {
    ...Secondary.args,
    size: "icon",
    title: "Mail",
    children: <Mail />,
  },
};

/**
 * Use the `icon-sm` size for a smaller icon-only button.
 */
export const IconSmall: Story = {
  args: {
    variant: "secondary",
    size: "icon-sm",
    title: "Mail",
    children: <Mail />,
  },
};

/**
 * Use the `icon-lg` size for a larger icon-only button.
 */
export const IconLarge: Story = {
  args: {
    variant: "secondary",
    size: "icon-lg",
    title: "Mail",
    children: <Mail />,
  },
};

/**
 * Add the `disabled` prop to prevent interactions with the button.
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
      <Button {...args} />
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

export const ShouldHaveButtonRole: Story = {
  name: "should have role button (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 4.1.2 — role exposed to AT
    await waitFor(() => {
      expect(canvas.getByRole("button")).toBeInTheDocument();
    });
  },
};

export const ShouldHaveAccessibleName: Story = {
  name: "should have accessible name matching visible text (WCAG 4.1.2, 2.5.3)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 4.1.2 / 2.5.3 — accessible name matches visible label
    await waitFor(() => {
      expect(
        canvas.getByRole("button", { name: /button/i }),
      ).toBeInTheDocument();
    });
  },
};

export const ShouldMeetTargetSize: Story = {
  name: "should meet minimum target size of 24px (WCAG 2.5.8)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    // 2.5.8 — target at least 24×24px
    await waitFor(() => {
      const { width, height } = button.getBoundingClientRect();
      expect(width).toBeGreaterThanOrEqual(24);
      expect(height).toBeGreaterThanOrEqual(24);
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
    await waitFor(() => {
      expect(canvas.getByRole("button")).toHaveFocus();
    });
  },
};

export const ShouldActivateViaEnterKey: Story = {
  name: "should activate via Enter key (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  args: {
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.tab();
    await waitFor(() => expect(canvas.getByRole("button")).toHaveFocus());

    // 2.1.1 — Enter activates
    await userEvent.keyboard("{Enter}");
    await waitFor(() => expect(args.onClick).toHaveBeenCalledTimes(1));
  },
};

export const ShouldActivateViaSpaceKey: Story = {
  name: "should activate via Space key (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  args: {
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.tab();
    await waitFor(() => expect(canvas.getByRole("button")).toHaveFocus());

    // 2.1.1 — Space activates
    await userEvent.keyboard(" ");
    await waitFor(() => expect(args.onClick).toHaveBeenCalledTimes(1));
  },
};

export const ShouldExposeDisabledState: Story = {
  name: "should expose disabled state and not be focusable (WCAG 4.1.2, 2.1.1)",
  tags: ["!dev", "!autodocs"],
  args: {
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    // 4.1.2 — disabled state exposed to AT
    await waitFor(() => expect(button).toHaveAttribute("aria-disabled", "true"));

    // 2.1.1 — disabled button not reachable via Tab
    await userEvent.tab();
    await waitFor(() => expect(button).not.toHaveFocus());
  },
};

export const ShouldExposeBusyState: Story = {
  name: "should expose busy state when loading (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  args: {
    isLoading: true,
    label: { loading: "Submitting, please wait" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    // 4.1.2 — busy state exposed to AT
    await waitFor(() => expect(button).toHaveAttribute("aria-busy", "true"));
  },
};