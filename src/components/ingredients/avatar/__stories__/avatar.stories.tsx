import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, waitFor, within } from "storybook/test";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ingredients/avatar";

/**
 * An image element with a fallback for representing the user.
 */

const meta = {
  title: "ingredients/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
  },
  args: {
    size: "default",
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the avatar.
 */
export const Default: Story = {};

// ---------------------------------------------------------------------------
// Interaction & accessibility tests
// ---------------------------------------------------------------------------

export const ShouldBeDecorativeByDefault: Story = {
  name: "should be decorative with empty alt by default (WCAG 1.1.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    // 1.1.1 — avatars are decorative; alt="" hides them from AT.
    // The user's name is conveyed by adjacent text, not the image.
    await waitFor(
      () => {
        const img = canvasElement.querySelector("img[data-slot=avatar-image]");
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("alt", "");
      },
      { timeout: 5000 },
    );
  },
};

export const ShouldShowFallbackWhenImageFails: Story = {
  name: "should show fallback text when image fails to load (WCAG 1.1.1)",
  tags: ["!dev", "!autodocs"],
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://invalid-url-that-will-fail.example/broken.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1.1.1 — text alternative visible when image fails
    await waitFor(
      () => {
        expect(canvas.getByText("CN")).toBeInTheDocument();
      },
      { timeout: 5000 },
    );
  },
};
