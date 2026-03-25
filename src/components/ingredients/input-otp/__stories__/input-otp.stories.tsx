import { expect, fn, userEvent, waitFor } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ingredients/input-otp";

/**
 * Accessible one-time password component with copy paste functionality.
 */
const meta = {
  title: "ingredients/InputOTP",
  component: InputOTP,
  tags: ["autodocs"],
  argTypes: {
    maxLength: {
      control: "number",
      description: "Number of OTP input slots",
    },
    containerClassName: {
      control: "text",
      description: "Additional CSS class for the outer container",
    },
    disabled: {
      control: "boolean",
    },
  },
  args: {
    maxLength: 6,
    containerClassName: "",
    disabled: false,
    onChange: fn(),
    onComplete: fn(),
    pattern: REGEXP_ONLY_DIGITS_AND_CHARS,
    children: null,
    "aria-label": "One-time password",
  },
  render: (args) => (
    <InputOTP {...args} render={undefined}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof InputOTP>;

export default meta;

type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Visual stories
// ---------------------------------------------------------------------------

/**
 * The default form of the InputOTP field.
 */
export const Default: Story = {};

/**
 * Restrict input to digits only.
 */
export const OnlyNumbers: Story = {
  args: {
    pattern: REGEXP_ONLY_DIGITS,
  },
};

/**
 * Use multiple groups to separate the input slots.
 */
export const SeparatedGroup: Story = {
  render: (args) => (
    <InputOTP {...args} render={undefined}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

// ---------------------------------------------------------------------------
// Interaction & accessibility tests
// ---------------------------------------------------------------------------

export const ShouldHaveTextboxRole: Story = {
  name: "should have textbox role (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas }) => {
    // 4.1.2 — role exposed to AT
    await waitFor(() => {
      expect(canvas.getByRole("textbox")).toBeInTheDocument();
    });
  },
};

export const ShouldHaveAccessibleName: Story = {
  name: "should have accessible name from aria-label (WCAG 4.1.2, 1.3.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas }) => {
    // 4.1.2 / 1.3.1 — accessible name programmatically set via aria-label
    await waitFor(() => {
      expect(canvas.getByRole("textbox")).toHaveAccessibleName("One-time password");
    });
  },
};

export const ShouldMeetTargetSize: Story = {
  name: "should meet minimum target size of 24px (WCAG 2.5.8)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    // 2.5.8 — input-otp slots must be at least 24×24px
    await waitFor(() => {
      const slots = canvasElement.querySelectorAll("[data-slot='input-otp-slot']");
      expect(slots.length).toBeGreaterThan(0);
      for (const slot of slots) {
        const { width, height } = slot.getBoundingClientRect();
        expect(width).toBeGreaterThanOrEqual(24);
        expect(height).toBeGreaterThanOrEqual(24);
      }
    });
  },
};

export const ShouldBeFocusableViaKeyboard: Story = {
  name: "should be reachable and focusable via keyboard (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas }) => {
    // 2.1.1 — reachable via Tab
    await userEvent.tab();
    await waitFor(() => expect(canvas.getByRole("textbox")).toHaveFocus());
  },
};

export const ShouldAcceptInputViaKeyboard: Story = {
  name: "should accept input via keyboard and update value (WCAG 2.1.1, 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas }) => {
    const input = canvas.getByRole("textbox");

    await userEvent.click(input);
    await waitFor(() => expect(input).toHaveFocus());

    // 2.1.1 — keyboard input is accepted
    await userEvent.type(input, "abc123");

    // 4.1.2 — value state reflected
    await waitFor(() => expect(input).toHaveValue("abc123"));
  },
};

export const ShouldCallOnCompleteWhenFilled: Story = {
  name: "should call onComplete when all slots are filled (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ args, canvas }) => {
    const input = canvas.getByRole("textbox");

    await userEvent.click(input);
    await userEvent.type(input, "abc123");

    // 4.1.2 — completion state is communicated programmatically
    await waitFor(() => expect(args.onComplete).toHaveBeenCalledTimes(1));
  },
};

export const ShouldCallOnChangeForEachCharacter: Story = {
  name: "should call onChange for each character entered (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ args, canvas }) => {
    const input = canvas.getByRole("textbox");

    await userEvent.click(input);
    await userEvent.type(input, "mocked");

    // 4.1.2 — each value change is communicated
    await waitFor(() => expect(args.onChange).toHaveBeenCalledTimes(6));
  },
};

export const ShouldRejectNonDigitsWhenRestricted: Story = {
  name: "should reject non-digit input when digits-only pattern is set (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  args: {
    pattern: REGEXP_ONLY_DIGITS,
  },
  play: async ({ args, canvas }) => {
    const input = canvas.getByRole("textbox");

    await userEvent.click(input);

    // 4.1.2 — invalid input not accepted, onChange not called
    await userEvent.type(input, "mocked");
    await waitFor(() => expect(args.onChange).toHaveBeenCalledTimes(0));

    // Valid digits accepted
    await userEvent.type(input, "123456");
    await waitFor(() => expect(args.onChange).toHaveBeenCalledTimes(6));
    await waitFor(() => expect(args.onComplete).toHaveBeenCalledTimes(1));
  },
};

export const ShouldSupportPasteInput: Story = {
  name: "should accept pasted value (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas }) => {
    const input = canvas.getByRole("textbox");

    await userEvent.click(input);
    await waitFor(() => expect(input).toHaveFocus());

    // 2.1.1 — paste is a supported input method
    await userEvent.paste("abc123");
    await waitFor(() => expect(input).toHaveValue("abc123"));
  },
};

export const ShouldSupportBackspace: Story = {
  name: "should clear last character via Backspace (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas }) => {
    const input = canvas.getByRole("textbox");

    await userEvent.click(input);
    await userEvent.type(input, "abc");
    await waitFor(() => expect(input).toHaveValue("abc"));

    // 2.1.1 — Backspace removes last character
    await userEvent.keyboard("{Backspace}");
    await waitFor(() => expect(input).toHaveValue("ab"));
  },
};

export const ShouldHaveSeparatorRoleInSeparatedGroup: Story = {
  name: "should have separator role between groups (WCAG 1.3.1)",
  tags: ["!dev", "!autodocs"],
  render: (args) => (
    <InputOTP {...args} render={undefined}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
  play: async ({ canvasElement }) => {
    // 1.3.1 — separator role is conveyed programmatically to AT
    await waitFor(() => {
      const separator = canvasElement.querySelector("[role='separator']");
      expect(separator).toBeInTheDocument();
    });
  },
};