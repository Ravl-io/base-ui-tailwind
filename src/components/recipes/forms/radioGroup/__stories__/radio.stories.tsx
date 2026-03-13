import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { RadioGroup } from "@/components/recipes/forms/radioGroup";
import type { RadioGroupProps } from "@/components/recipes/forms/radioGroup";
import { A11Y_NOTES } from "@sb/a11yNotes";
import { A11yWarning } from "@sb/a11yWarning";

const options = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "post", label: "Post", disabled: true },
];

/**
 * A radio group field with fieldset/legend structure, helper text,
 * and error state support. WCAG AA 2.2 compliant.
 */
const meta = {
  title: "recipes/forms/RadioGroup",
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      description: "Unique identifier, drives all aria ID and option ID derivation",
    },
    label: {
      control: "text",
      description: "Legend text for the radio group",
    },
    helperText: {
      control: "text",
      description: "Helper text displayed below the group",
    },
    error: {
      control: "text",
      description: "Error message displayed below the group",
    },
    classNames: {
      control: "object",
      description: "Style overrides for individual slots within the component",
    },
  },
  args: {
    id: "contact",
    label: "Preferred contact method",
    options,
  },
  render: (args) => <RadioGroup {...args} />,
} satisfies Meta<Omit<RadioGroupProps, "children">>;

export default meta;

type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Visual stories
// ---------------------------------------------------------------------------

/**
 * Default radio group with a legend.
 */
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Contact form">
  <Form.RadioGroup
    id="contact"
    label="Preferred contact method"
    options={[
      { value: "email", label: "Email" },
      { value: "phone", label: "Phone" },
      { value: "post", label: "Post" },
    ]}
  />
</Form>
        `,
      },
    },
  },
};

/**
 * Radio group with helper text providing additional context.
 */
export const WithHelperText: Story = {
  args: {
    helperText: "We will only use this to contact you about your account.",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Contact form">
  <Form.RadioGroup
    id="contact"
    label="Preferred contact method"
    helperText="We will only use this to contact you about your account."
    options={[
      { value: "email", label: "Email" },
      { value: "phone", label: "Phone" },
      { value: "post", label: "Post" },
    ]}
  />
</Form>
        `,
      },
    },
  },
};

/**
 * Radio group in an error state with an error message.
 */
export const WithError: Story = {
  args: {
    error: "Please select a contact method.",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Contact form">
  <Form.RadioGroup
    id="contact"
    label="Preferred contact method"
    error="Please select a contact method."
    options={[
      { value: "email", label: "Email" },
      { value: "phone", label: "Phone" },
      { value: "post", label: "Post" },
    ]}
  />
</Form>
        `,
      },
    },
  },
};

/**
 * Radio group with both helper text and an error.
 */
export const WithHelperTextAndError: Story = {
  args: {
    helperText: "We will only use this to contact you about your account.",
    error: "Please select a contact method.",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Contact form">
  <Form.RadioGroup
    id="contact"
    label="Preferred contact method"
    helperText="We will only use this to contact you about your account."
    error="Please select a contact method."
    options={[
      { value: "email", label: "Email" },
      { value: "phone", label: "Phone" },
      { value: "post", label: "Post" },
    ]}
  />
</Form>
        `,
      },
    },
  },
};

/**
 * Radio group with a disabled option.
 *
 * Disabled options are not recommended without clear instructions on how to
 * enable them. See the accessibility guidance rendered below the story.
 */
export const WithDisabledOption: Story = {
  args: {
    helperText: "Post is currently unavailable.",
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <RadioGroup {...args} />
      <A11yWarning message={A11Y_NOTES.DISABLED_NOT_RECOMMENDED.text} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: A11Y_NOTES.DISABLED_NOT_RECOMMENDED.markdown,
      },
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Contact form">
  <Form.RadioGroup
    id="contact"
    label="Preferred contact method"
    helperText="Post is currently unavailable."
    options={[
      { value: "email", label: "Email" },
      { value: "phone", label: "Phone" },
      { value: "post", label: "Post", disabled: true },
    ]}
  />
</Form>
        `,
      },
    },
  },
};

/**
 * Radio group with style overrides via classNames prop.
 */
export const WithClassNameOverrides: Story = {
  args: {
    helperText: "We will only use this to contact you about your account.",
    classNames: {
      legend: "text-blue-600",
      itemLabel: "text-blue-600",
      helperText: "text-blue-400",
    },
  },
  parameters: {
    docs: {
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Contact form">
  <Form.RadioGroup
    id="contact"
    label="Preferred contact method"
    helperText="We will only use this to contact you about your account."
    classNames={{
      legend: "text-blue-600",
      itemLabel: "text-blue-600",
      helperText: "text-blue-400",
    }}
    options={[
      { value: "email", label: "Email" },
      { value: "phone", label: "Phone" },
      { value: "post", label: "Post" },
    ]}
  />
</Form>
        `,
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Interaction & accessibility tests
// ---------------------------------------------------------------------------

export const ShouldRenderFieldsetWithLegend: Story = {
  name: "should render fieldset with legend for group labelling (WCAG 1.3.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    // 1.3.1 — group label conveyed via fieldset/legend, not just visually
    await waitFor(() => {
      const fieldset = canvasElement.querySelector("fieldset");
      expect(fieldset).toBeInTheDocument();
      const legend = canvasElement.querySelector("legend");
      expect(legend).toBeInTheDocument();
      expect(legend).toHaveTextContent("Preferred contact method");
    });
  },
};

export const ShouldRenderAllOptions: Story = {
  name: "should render all options with role radio and accessible names (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 4.1.2 — each option has role, name, and state exposed to AT
    await waitFor(() => {
      const radios = canvas.getAllByRole("radio");
      expect(radios).toHaveLength(3);
      expect(canvas.getByRole("radio", { name: "Email" })).toBeInTheDocument();
      expect(canvas.getByRole("radio", { name: "Phone" })).toBeInTheDocument();
      expect(canvas.getByRole("radio", { name: "Post" })).toBeInTheDocument();
    });
  },
};

export const ShouldBeKeyboardOperable: Story = {
  name: "should be keyboard operable via Tab and arrow keys (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  args: {
    options: [
      { value: "email", label: "Email" },
      { value: "phone", label: "Phone" },
      { value: "post", label: "Post" },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 2.1.1 — Tab enters the group, arrow keys navigate within it
    await userEvent.tab();

    await waitFor(() => {
      expect(canvas.getAllByRole("radio")[0]).toHaveFocus();
    });

    await userEvent.keyboard("{ArrowDown}");
    await waitFor(() => {
      expect(canvas.getByRole("radio", { name: "Phone" })).toHaveFocus();
    });

    await userEvent.keyboard("{ArrowDown}");
    await waitFor(() => {
      expect(canvas.getByRole("radio", { name: "Post" })).toHaveFocus();
    });

    await userEvent.keyboard("{ArrowUp}");
    await waitFor(() => {
      expect(canvas.getByRole("radio", { name: "Phone" })).toHaveFocus();
    });
  },
};

export const ShouldSelectOptionOnClick: Story = {
  name: "should select an option on click and reflect checked state (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  args: {
    options: [
      { value: "email", label: "Email" },
      { value: "phone", label: "Phone" },
      { value: "post", label: "Post" },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const emailRadio = canvas.getByRole("radio", { name: "Email" });
    const phoneRadio = canvas.getByRole("radio", { name: "Phone" });

    await userEvent.click(emailRadio);
    await waitFor(() => {
      expect(emailRadio).toBeChecked();
      expect(phoneRadio).not.toBeChecked();
    });

    await userEvent.click(phoneRadio);
    await waitFor(() => {
      expect(phoneRadio).toBeChecked();
      expect(emailRadio).not.toBeChecked();
    });
  },
};

export const ShouldSelectOptionViaLabelClick: Story = {
  name: "should select an option when its label is clicked (WCAG 1.3.1)",
  tags: ["!dev", "!autodocs"],
  args: {
    options: [
      { value: "email", label: "Email" },
      { value: "phone", label: "Phone" },
      { value: "post", label: "Post" },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const emailRadio = canvas.getByRole("radio", { name: "Email" });

    // 1.3.1 — label association is functional, not just structural
    await userEvent.click(canvas.getByText("Email"));
    await waitFor(() => {
      expect(emailRadio).toBeChecked();
    });
  },
};

export const ShouldRenderHelperText: Story = {
  name: "should render helper text associated to group via aria-describedby (WCAG 1.3.1, 3.3.2)",
  tags: ["!dev", "!autodocs"],
  args: {
    helperText: "We will only use this to contact you about your account.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1.3.1 — helper text programmatically linked to the group
    // 3.3.2 — helper text rendered and non-empty
    await waitFor(() => {
      const fieldset = canvasElement.querySelector("fieldset");
      expect(fieldset).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("contact-helper"),
      );
      expect(
        canvas.getByText("We will only use this to contact you about your account."),
      ).toBeInTheDocument();
      expect(canvasElement.querySelector("#contact-helper")).not.toBeEmptyDOMElement();
    });
  },
};

export const ShouldRenderErrorMessage: Story = {
  name: "should render error message and set aria-invalid on group (WCAG 3.3.1, 4.1.2, 1.3.1)",
  tags: ["!dev", "!autodocs"],
  args: {
    error: "Please select a contact method.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 4.1.2 — aria-invalid exposed to AT on the fieldset
    // 3.3.1 — error conveyed in text, not colour alone
    // 1.3.1 — error programmatically linked via aria-describedby
    await waitFor(() => {
      const fieldset = canvasElement.querySelector("fieldset");
      expect(fieldset).toHaveAttribute("aria-invalid", "true");
      expect(fieldset).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("contact-error"),
      );
      expect(canvas.getByText("Please select a contact method.")).toBeInTheDocument();
      expect(canvasElement.querySelector("#contact-error")).not.toBeEmptyDOMElement();
    });
  },
};

export const ShouldLinkBothHelperAndError: Story = {
  name: "should link both helper text and error via aria-describedby (WCAG 1.3.1)",
  tags: ["!dev", "!autodocs"],
  args: {
    helperText: "We will only use this to contact you about your account.",
    error: "Please select a contact method.",
  },
  play: async ({ canvasElement }) => {
    // 1.3.1 — both IDs present in aria-describedby
    await waitFor(() => {
      const fieldset = canvasElement.querySelector("fieldset");
      const describedBy = fieldset?.getAttribute("aria-describedby") ?? "";
      expect(describedBy).toContain("contact-helper");
      expect(describedBy).toContain("contact-error");
      expect(canvasElement.querySelector("#contact-helper")).not.toBeEmptyDOMElement();
      expect(canvasElement.querySelector("#contact-error")).not.toBeEmptyDOMElement();
    });
  },
};

export const ShouldDisableIndividualOption: Story = {
  name: "should expose disabled state on individual options (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const postRadio = canvas.getByRole("radio", { name: "Post" });

    // 4.1.2 — Base UI exposes disabled via aria-disabled on the span,
    // not the native disabled attribute
    await waitFor(() => {
      expect(postRadio).toHaveAttribute("aria-disabled", "true");
    });

    // Disabled option must not be selectable
    await userEvent.click(postRadio, { pointerEventsCheck: 0 });
    await waitFor(() => {
      expect(postRadio).not.toBeChecked();
    });
  },
};

export const ShouldNotBreakA11yWithClassNameOverrides: Story = {
  name: "should not break accessible name or structure with classNames overrides (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  args: {
    helperText: "We will only use this to contact you about your account.",
    classNames: {
      legend: "text-blue-600",
      itemLabel: "text-blue-600",
      helperText: "text-blue-400",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 4.1.2 — style overrides must not break group structure or option names
    await waitFor(() => {
      const legend = canvasElement.querySelector("legend");
      expect(legend).toHaveTextContent("Preferred contact method");
      expect(legend).toHaveClass("text-blue-600");
      expect(canvas.getByRole("radio", { name: "Email" })).toBeInTheDocument();
      expect(
        canvas.getByText("We will only use this to contact you about your account."),
      ).toHaveClass("text-blue-400");
    });
  },
};