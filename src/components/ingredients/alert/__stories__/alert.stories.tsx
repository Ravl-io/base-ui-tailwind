import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { AlertCircle } from "lucide-react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ingredients/alert";

/**
 * Displays a callout for user attention.
 */
const meta = {
  title: "ingredients/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["default", "destructive"],
      control: { type: "radio" },
    },
  },
  args: {
    variant: "default",
  },
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;
/**
 * The default form of the alert.
 */
export const Default: Story = {};

/**
 * Use the `destructive` alert to indicate a destructive action.
 */
export const Destructive: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: "destructive",
  },
};

// ---------------------------------------------------------------------------
// Interaction & accessibility tests
// ---------------------------------------------------------------------------

export const ShouldHaveAlertRole: Story = {
  name: "should have role alert (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 4.1.2 — role exposed to AT
    await expect(canvas.getByRole("alert")).toBeInTheDocument();
  },
};

export const ShouldHaveSemanticStructure: Story = {
  name: "should have semantic structure with title and description (WCAG 1.3.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1.3.1 — title and description content is programmatically exposed
    await expect(canvas.getByText("Heads up!")).toBeInTheDocument();
    await expect(
      canvas.getByText("You can add components to your app using the cli."),
    ).toBeInTheDocument();
  },
};

export const ShouldBeAnnouncedByAT: Story = {
  name: "should be announced by AT via live region (WCAG 4.1.3)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 4.1.3 — role="alert" is an implicit aria-live="assertive" region
    const alert = canvas.getByRole("alert");
    await expect(alert).toBeInTheDocument();
  },
};
