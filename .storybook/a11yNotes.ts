// .storybook/a11y-notes.ts

export const A11Y_NOTES = {
  DISABLED_NOT_RECOMMENDED: {
    /** Plain text for rendering in the Canvas via A11yWarning */
    text: "Disabled controls are not recommended without clear instructions on how to enable them. They are exempt from colour contrast requirements (WCAG 1.4.3) and are unreachable by keyboard users. Prefer leaving the control enabled and surfacing a validation error on submit, or showing inline helper text explaining what action enables the control.",
    /** Markdown for the Docs page description */
    markdown: `
> ⚠️ **Disabled states are not recommended without clear instructions.**
>
> Disabled controls are exempt from colour contrast requirements (WCAG 1.4.3), making them difficult or impossible to perceive for users with low vision. They are also unreachable by keyboard (WCAG 2.1.1 exemption), meaning keyboard and AT users receive no context about why the control is unavailable or how to enable it.
>
> **Prefer instead:**
> - Leaving the control enabled and surfacing a validation error on submit
> - Showing an inline explanation of why the control is disabled and what action enables it (satisfies WCAG 3.3.2 Labels or Instructions)
> - Using \`aria-disabled="true"\` with \`tabIndex={0}\` if the control must appear disabled but remain discoverable by keyboard users
>
> If a disabled state is unavoidable, always pair it with visible, proximate helper text explaining how the user can enable the control.
    `.trim(),
  },
} as const;