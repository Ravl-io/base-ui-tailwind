import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Select } from "@/components/recipes/forms/select";
import type { SelectProps } from "@/components/recipes/forms/select";
import { A11Y_NOTES } from "@sb/a11yNotes";
import { A11yWarning } from "@sb/a11yWarning";

const options = [
  { value: "engineer", label: "Software Engineer" },
  { value: "designer", label: "Product Designer" },
  { value: "manager", label: "Product Manager" },
  { value: "analyst", label: "Business Analyst" },
  { value: "qa", label: "QA Engineer", disabled: true },
];

/**
 * A form select field with label, helper text, and error state support.
 */
const meta = {
  title: "recipes/forms/Select",
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      description: "Unique identifier, drives all aria ID derivation",
    },
    label: {
      control: "text",
      description: "Label text for the select",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text shown when no option is selected",
    },
    helperText: {
      control: "text",
      description: "Helper text displayed below the select",
    },
    error: {
      control: "text",
      description: "Error message displayed below the select",
    },
    options: {
      control: "object",
      description: "Array of { value, label, disabled? } objects to populate the select",
    },
    classes: {
      control: "object",
      description: "Style overrides for individual slots within the component",
    },
  },
  args: {
    id: "role",
    label: "Role",
    placeholder: "Select a role",
    helperText: "",
    error: "",
    options,
    classes: {},
  },
  render: (args) => <Select {...args} />,
} satisfies Meta<Omit<SelectProps, "children">>;

export default meta;

type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Visual stories
// ---------------------------------------------------------------------------

/**
 * Default select with a label.
 */
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Job application">
  <Form.Select
    id="role"
    label="Role"
    placeholder="Select a role"
    options={[
      { value: "engineer", label: "Software Engineer" },
      { value: "designer", label: "Product Designer" },
      { value: "manager", label: "Product Manager" },
      { value: "analyst", label: "Business Analyst" },
    ]}
  />
</Form>
        `,
      },
    },
  },
};

/**
 * Select with helper text providing additional context.
 */
export const WithHelperText: Story = {
  args: {
    helperText: "Choose the role that best describes your position.",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Job application">
  <Form.Select
    id="role"
    label="Role"
    placeholder="Select a role"
    helperText="Choose the role that best describes your position."
    options={[
      { value: "engineer", label: "Software Engineer" },
      { value: "designer", label: "Product Designer" },
      { value: "manager", label: "Product Manager" },
      { value: "analyst", label: "Business Analyst" },
    ]}
  />
</Form>
        `,
      },
    },
  },
};

/**
 * Select in an error state with an error message.
 */
export const WithError: Story = {
  args: {
    error: "Please select a role.",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Job application">
  <Form.Select
    id="role"
    label="Role"
    placeholder="Select a role"
    error="Please select a role."
    options={[
      { value: "engineer", label: "Software Engineer" },
      { value: "designer", label: "Product Designer" },
      { value: "manager", label: "Product Manager" },
      { value: "analyst", label: "Business Analyst" },
    ]}
  />
</Form>
        `,
      },
    },
  },
};

/**
 * Select with both helper text and an error.
 */
export const WithHelperTextAndError: Story = {
  args: {
    helperText: "Choose the role that best describes your position.",
    error: "Please select a role.",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Job application">
  <Form.Select
    id="role"
    label="Role"
    placeholder="Select a role"
    helperText="Choose the role that best describes your position."
    error="Please select a role."
    options={[
      { value: "engineer", label: "Software Engineer" },
      { value: "designer", label: "Product Designer" },
      { value: "manager", label: "Product Manager" },
      { value: "analyst", label: "Business Analyst" },
    ]}
  />
</Form>
        `,
      },
    },
  },
};

/**
 * Select with a disabled option.
 *
 * Disabled options are not recommended without clear instructions on how to
 * enable them. See the accessibility guidance rendered below the story.
 */
export const WithDisabledOption: Story = {
  args: {
    helperText: "QA Engineer is currently unavailable.",
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Select {...args} />
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
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Job application">
  <Form.Select
    id="role"
    label="Role"
    placeholder="Select a role"
    helperText="QA Engineer is currently unavailable."
    options={[
      { value: "engineer", label: "Software Engineer" },
      { value: "designer", label: "Product Designer" },
      { value: "manager", label: "Product Manager" },
      { value: "analyst", label: "Business Analyst" },
      { value: "qa", label: "QA Engineer", disabled: true },
    ]}
  />
</Form>
        `,
      },
    },
  },
};

/**
 * Select with style overrides via classes prop.
 */
export const WithClassNameOverrides: Story = {
  args: {
    classes: {
      label: "text-blue-600",
      trigger: "border-blue-400",
      helperText: "text-blue-400",
    },
    helperText: "Choose the role that best describes your position.",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Form onSubmit={handleSubmit} labels={{ submit: "Submit" }} name="Job application">
  <Form.Select
    id="role"
    label="Role"
    placeholder="Select a role"
    helperText="Choose the role that best describes your position."
    classes={{
      label: "text-blue-600",
      trigger: "border-blue-400",
      helperText: "text-blue-400",
    }}
    options={[
      { value: "engineer", label: "Software Engineer" },
      { value: "designer", label: "Product Designer" },
      { value: "manager", label: "Product Manager" },
      { value: "analyst", label: "Business Analyst" },
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

export const ShouldRenderLabelAssociatedToTrigger: Story = {
  name: "should have label correctly associated to trigger (WCAG 1.3.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1.3.1 — trigger programmatically labelled, not just visually adjacent
    await waitFor(() => {
      const trigger = canvas.getByRole("combobox");
      expect(trigger).toHaveAttribute("id", "role");
      expect(canvasElement.querySelector('label[for="role"]')).toBeInTheDocument();
    });
  },
};

export const ShouldHaveAccessibleName: Story = {
  name: "should have accessible name matching visible label (WCAG 2.5.3, 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 2.5.3 — visible label text is contained in the accessible name
    // 4.1.2 — name exposed to AT
    await waitFor(() => {
      expect(canvas.getByRole("combobox")).toHaveAccessibleName("Role");
    });
  },
};

export const ShouldMeetTargetSize: Story = {
  name: "should meet minimum trigger target size of 24x24px (WCAG 2.5.8)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 2.5.8 — minimum 24×24 CSS pixels on the trigger
    await waitFor(() => {
      const { width, height } = canvas.getByRole("combobox").getBoundingClientRect();
      expect(width).toBeGreaterThanOrEqual(24);
      expect(height).toBeGreaterThanOrEqual(24);
    });
  },
};

export const ShouldOpenOnClick: Story = {
  name: "should open listbox on trigger click and expose options (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("combobox"));

    // 4.1.2 — listbox rendered in portal, query from document body
    const body = within(document.body);
    await waitFor(() => {
      expect(body.getByRole("listbox")).toBeInTheDocument();
      expect(body.getByRole("option", { name: "Software Engineer" })).toBeInTheDocument();
      expect(body.getByRole("option", { name: "Product Designer" })).toBeInTheDocument();
      expect(body.getByRole("option", { name: "Product Manager" })).toBeInTheDocument();
      expect(body.getByRole("option", { name: "Business Analyst" })).toBeInTheDocument();
    });
  },
};

export const ShouldOpenOnKeyboard: Story = {
  name: "should open listbox via keyboard and be navigable (WCAG 2.1.1)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 2.1.1 — trigger reachable via Tab
    await userEvent.tab();
    await waitFor(() => {
      expect(canvas.getByRole("combobox")).toHaveFocus();
    });

    // 2.1.1 — Space opens listbox
    await userEvent.keyboard(" ");

    // listbox rendered in portal
    const body = within(document.body);
    await waitFor(() => {
      expect(body.getByRole("listbox")).toBeInTheDocument();
    });

    // 2.1.1 — arrow keys navigate options
    await userEvent.keyboard("{ArrowDown}");
    await waitFor(() => {
      expect(body.getByRole("option", { name: "Software Engineer" })).toBeInTheDocument();
    });

    await userEvent.keyboard("{ArrowDown}");
    await waitFor(() => {
      expect(body.getByRole("option", { name: "Product Designer" })).toBeInTheDocument();
    });

    // 2.1.1 — Escape closes the listbox
    await userEvent.keyboard("{Escape}");
    await waitFor(() => {
      expect(body.queryByRole("listbox")).not.toBeInTheDocument();
    });
  },
};

export const ShouldSelectOptionAndCloseListbox: Story = {
  name: "should select an option, reflect value in trigger, and close listbox (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  args: {
    options: [
      { value: "engineer", label: "Software Engineer" },
      { value: "designer", label: "Product Designer" },
      { value: "manager", label: "Product Manager" },
      { value: "analyst", label: "Business Analyst" },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox");

    await userEvent.click(trigger);

    const body = within(document.body);
    await waitFor(() => {
      expect(body.getByRole("listbox")).toBeInTheDocument();
    });

    await userEvent.click(body.getByRole("option", { name: "Product Designer" }));

    // 4.1.2 — listbox closes after selection
    await waitFor(() => {
      expect(body.queryByRole("listbox")).not.toBeInTheDocument();
    });

    // 4.1.2 — selected value reflected in trigger text content
    await waitFor(() => {
      expect(trigger.textContent).toContain("designer");
    });
  },
};

export const ShouldRenderHelperText: Story = {
  name: "should render helper text associated to trigger via aria-describedby (WCAG 1.3.1, 3.3.2)",
  tags: ["!dev", "!autodocs"],
  args: {
    helperText: "Choose the role that best describes your position.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1.3.1 — helper text programmatically linked
    // 3.3.2 — helper text rendered and non-empty
    await waitFor(() => {
      expect(canvas.getByRole("combobox")).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("role-helper"),
      );
      expect(
        canvas.getByText("Choose the role that best describes your position."),
      ).toBeInTheDocument();
      expect(canvasElement.querySelector("#role-helper")).not.toBeEmptyDOMElement();
    });
  },
};

export const ShouldRenderErrorMessage: Story = {
  name: "should render error message and set aria-invalid on trigger (WCAG 3.3.1, 4.1.2, 1.3.1)",
  tags: ["!dev", "!autodocs"],
  args: {
    error: "Please select a role.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 4.1.2 — aria-invalid exposed to AT
    // 3.3.1 — error conveyed in text, not colour alone
    // 1.3.1 — error programmatically linked via aria-describedby
    await waitFor(() => {
      expect(canvas.getByRole("combobox")).toHaveAttribute("aria-invalid", "true");
      expect(canvas.getByRole("combobox")).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("role-error"),
      );
      expect(canvas.getByText("Please select a role.")).toBeInTheDocument();
      expect(canvasElement.querySelector("#role-error")).not.toBeEmptyDOMElement();
    });
  },
};

export const ShouldLinkBothHelperAndError: Story = {
  name: "should link both helper text and error via aria-describedby (WCAG 1.3.1)",
  tags: ["!dev", "!autodocs"],
  args: {
    helperText: "Choose the role that best describes your position.",
    error: "Please select a role.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1.3.1 — both IDs present in aria-describedby
    await waitFor(() => {
      const describedBy =
        canvas.getByRole("combobox").getAttribute("aria-describedby") ?? "";
      expect(describedBy).toContain("role-helper");
      expect(describedBy).toContain("role-error");
      expect(canvasElement.querySelector("#role-helper")).not.toBeEmptyDOMElement();
      expect(canvasElement.querySelector("#role-error")).not.toBeEmptyDOMElement();
    });
  },
};

export const ShouldExposeDisabledOption: Story = {
  name: "should expose disabled option state to AT and prevent selection (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("combobox"));

    // listbox rendered in portal
    const body = within(document.body);
    await waitFor(() => {
      expect(body.getByRole("listbox")).toBeInTheDocument();
    });

    const disabledOption = body.getByRole("option", { name: "QA Engineer" });

    // 4.1.2 — disabled state exposed via aria-disabled
    await waitFor(() => {
      expect(disabledOption).toHaveAttribute("aria-disabled", "true");
    });

    // Clicking a disabled option must not select it or close the listbox
    await userEvent.click(disabledOption, { pointerEventsCheck: 0 });
    await waitFor(() => {
      expect(body.getByRole("listbox")).toBeInTheDocument();
      expect(canvas.getByRole("combobox")).not.toHaveTextContent("QA Engineer");
    });
  },
};

export const ShouldNotBreakA11yWithClassNameOverrides: Story = {
  name: "should not break accessible name or structure with classes overrides (WCAG 4.1.2)",
  tags: ["!dev", "!autodocs"],
  args: {
    helperText: "Choose the role that best describes your position.",
    classes: {
      label: "text-blue-600",
      trigger: "border-blue-400",
      helperText: "text-blue-400",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 4.1.2 — style overrides must not break accessible name or structure
    await waitFor(() => {
      expect(canvas.getByRole("combobox")).toHaveAccessibleName("Role");
      expect(canvas.getByRole("combobox")).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("role-helper"),
      );
      expect(canvas.getByText("Role")).toHaveClass("text-blue-600");
      expect(
        canvas.getByText("Choose the role that best describes your position."),
      ).toHaveClass("text-blue-400");
    });
  },
};