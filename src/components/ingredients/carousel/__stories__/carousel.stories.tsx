import { expect, userEvent, waitFor, within } from "storybook/test";
// Replace nextjs-vite with the name of your framework
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ingredients/carousel";

/**
 * A carousel with motion and swipe built using Embla.
 */
const meta: Meta<typeof Carousel> = {
  title: "ingredients/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    className: "w-full max-w-xs",
  },
  render: (args) => (
    <Carousel {...args}>
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="bg-card flex aspect-square items-center justify-center rounded border p-6">
              <span className="text-4xl font-semibold">{index + 1}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the carousel.
 */
export const Default: Story = {};

/**
 * Use the `basis` utility class to change the size of the carousel.
 */
export const Size: Story = {
  render: (args) => (
    <Carousel {...args} className="mx-12 w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-1/3">
            <div className="bg-card flex aspect-square items-center justify-center rounded border p-6">
              <span className="text-4xl font-semibold">{index + 1}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
  args: {
    className: "mx-12 w-full max-w-xs",
  },
};

// ---------------------------------------------------------------------------
// Interaction & accessibility tests
// ---------------------------------------------------------------------------

export const ShouldHaveRegionRole: Story = {
  name: "should have region role with carousel roledescription (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      const region = canvas.getByRole("region");
      expect(region).toHaveAttribute("aria-roledescription", "carousel");
    });
  },
};

export const ShouldHaveSlideGroups: Story = {
  name: "should have group role on slides with slide roledescription (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      const slides = canvas.getAllByRole("group");
      expect(slides.length).toBeGreaterThanOrEqual(1);
      expect(slides[0]).toHaveAttribute("aria-roledescription", "slide");
    });
  },
};

export const ShouldHaveAccessibleNavButtons: Story = {
  name: "should have accessible names on navigation buttons (WCAG 4.1.2, 2.5.3)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByRole("button", { name: /previous/i })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: /next/i })).toBeInTheDocument();
    });
  },
};

export const ShouldMeetTargetSize: Story = {
  name: "should meet minimum navigation button target size of 24px (WCAG 2.5.8)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const prevBtn = canvas.getByRole("button", { name: /previous/i });
    const nextBtn = canvas.getByRole("button", { name: /next/i });

    await waitFor(() => {
      const { width: pw, height: ph } = prevBtn.getBoundingClientRect();
      expect(pw).toBeGreaterThanOrEqual(24);
      expect(ph).toBeGreaterThanOrEqual(24);

      const { width: nw, height: nh } = nextBtn.getBoundingClientRect();
      expect(nw).toBeGreaterThanOrEqual(24);
      expect(nh).toBeGreaterThanOrEqual(24);
    });
  },
};

export const ShouldBeFocusableViaKeyboard: Story = {
  name: "should focus navigation buttons via keyboard (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Tab into the carousel — should reach a navigation button
    await userEvent.tab();
    await waitFor(() => {
      const focused = canvasElement.ownerDocument.activeElement;
      expect(
        focused === canvas.getByRole("button", { name: /previous/i }) ||
        focused === canvas.getByRole("button", { name: /next/i }),
      ).toBe(true);
    });
  },
};

export const ShouldNavigate: Story = {
  name: "when clicking next/previous buttons, should navigate through slides",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas, step }) => {
    const slides = await canvas.findAllByRole("group");
    expect(slides).toHaveLength(5);
    const nextBtn = await canvas.findByRole("button", { name: /next/i });
    const prevBtn = await canvas.findByRole("button", {
      name: /previous/i,
    });

    await step("navigate to the last slide", async () => {
      for (let i = 0; i < slides.length - 1; i++) {
        await userEvent.click(nextBtn);
      }
    });

    await step("navigate back to the first slide", async () => {
      for (let i = slides.length - 1; i > 0; i--) {
        await userEvent.click(prevBtn);
      }
    });
  },
};
//
