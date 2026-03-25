import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, waitFor, within } from "storybook/test";
import { ArrowRightSquare } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ingredients/breadcrumb";

/**
 * Displays the path to the current resource using a hierarchy of links.
 */
const meta = {
  title: "ingredients/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  argTypes: {
    "aria-label": {
      control: "text",
      description: "Accessible label for the breadcrumb navigation landmark",
    },
  },
  args: {
    "aria-label": "breadcrumb",
  },
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Displays the path of links to the current resource.
 */
export const Default: Story = {};

/**
 * Displays the path with a custom icon for the separator.
 */
// ---------------------------------------------------------------------------
// Interaction & accessibility tests
// ---------------------------------------------------------------------------

export const ShouldHaveNavLandmark: Story = {
  name: "should have navigation landmark with aria-label (WCAG 1.3.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1.3.1 — nav with aria-label="breadcrumb"
    await waitFor(() => {
      expect(canvas.getByRole("navigation")).toHaveAccessibleName("breadcrumb");
    });
  },
};

export const ShouldHaveOrderedListStructure: Story = {
  name: "should have ordered list structure (WCAG 1.3.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1.3.1 — ol > li semantic structure
    await waitFor(() => {
      expect(canvas.getByRole("list")).toBeInTheDocument();
      expect(canvas.getAllByRole("listitem").length).toBeGreaterThan(0);
    });
  },
};

export const ShouldMarkCurrentPageWithAriaCurrent: Story = {
  name: "should mark current page with aria-current (WCAG 1.3.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1.3.1 — aria-current="page" on current breadcrumb
    await waitFor(() => {
      const currentPage = canvas.getByText("Breadcrumb");
      expect(currentPage).toHaveAttribute("aria-current", "page");
    });
  },
};

export const ShouldMeetItemTargetSize: Story = {
  name: "should meet minimum item target size of 24px (WCAG 2.5.8)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      const links = canvasElement.querySelectorAll("[data-slot=breadcrumb-link]");
      const pages = canvasElement.querySelectorAll("[data-slot=breadcrumb-page]");
      const items = [...links, ...pages];
      expect(items.length).toBeGreaterThan(0);
      for (const item of items) {
        const { height } = item.getBoundingClientRect();
        expect(height).toBeGreaterThanOrEqual(24);
      }
    });
  },
};

export const ShouldHideSeparatorsFromAT: Story = {
  name: "should hide separators from AT (WCAG 1.3.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    // 1.3.1 — separators hidden via aria-hidden
    await waitFor(() => {
      const separators = canvasElement.querySelectorAll("[data-slot='breadcrumb-separator']");
      expect(separators.length).toBeGreaterThan(0);
      for (const sep of separators) {
        expect(sep).toHaveAttribute("aria-hidden", "true");
      }
    });
  },
};

/**
 * Displays the path with a custom icon for the separator.
 */
export const WithCustomSeparator: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ArrowRightSquare />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink>Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ArrowRightSquare />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};
