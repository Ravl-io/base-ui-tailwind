# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `@ravl/base-ui-tailwind`, a **React 19** design system library built on **shadcn/ui** patterns using **Base UI** primitives (from `@base-ui/react`) and **Tailwind CSS v4**. It is a component library (not an app) — the entry point is `src/index.ts` which re-exports all components, hooks, and utilities.

**Every component must have:**
1. A Storybook story file in `__stories__/` with visual stories (`tags: ["autodocs"]`)
2. Interaction/accessibility test stories validating **WCAG AA 2.2** compliance (`tags: ["!dev", "!autodocs"]`)

Unit tests (Jest/Vitest) are planned but not yet implemented — Storybook `play` function tests are the current testing strategy.

## Commands

| Task | Command |
|------|---------|
| Dev (Storybook) | `pnpm dev` (port 6006) |
| Build library | `pnpm build` |
| Build Storybook | `pnpm build:storybook` |
| Lint | `pnpm lint` |
| Lint fix | `pnpm lint:fix` |
| Run all tests | `pnpm test` |
| Run single test file | `pnpm vitest run src/components/ingredients/button/__stories__/button.stories.tsx` |
| Run tests matching name | `pnpm vitest run -t "should have button role"` |

Tests run via **Vitest** in a **Playwright Chromium** browser environment. Storybook story `play` functions are the test runner (via `@storybook/addon-vitest`).

## Architecture

### Component Layers (Ingredient/Recipe Pattern)

- **`src/components/ingredients/`** — Primitive UI components (accordion, button, dialog, etc.). Thin wrappers around `@base-ui/react` primitives with Tailwind styling via `class-variance-authority` (CVA). These are standalone building blocks — originally from shadcn/ui.
- **`src/components/recipes/forms/`** — Composite form components (Input, Select, Checkbox, RadioGroup) that compose ingredient primitives with `Form` wrapper. The `Form` component uses `Object.assign` pattern: `Form.Input`, `Form.Select`, `Form.Checkbox`, `Form.RadioGroup`.
- **`src/components/recipes/`** — Future home for additional opinionated composites (e.g., Modal) that enforce WCAG AA 2.2 requirements on top of ingredient primitives.
- **`src/lib/utils/`** — Shared utilities. `cn()` merges Tailwind classes via `clsx` + `tailwind-merge`.
- **`src/hooks/`** — Shared hooks (e.g., `useMobile`).

### Path Aliases

- `@/*` → `./src/*` (components, hooks, lib)
- `@sb/*` → `./.storybook/*` (Storybook helpers like `a11yNotes.ts`, `a11yWarning.tsx`)

### Storybook

Stories live in `__stories__/` directories adjacent to each component (e.g., `src/components/ingredients/button/__stories__/button.stories.tsx`). The framework is `@storybook/react-vite`.

**Story categories:**
1. **Visual stories** — rendered in Canvas and Docs. Use `tags: ["autodocs"]` on meta.
2. **Interaction/accessibility test stories** — hidden from dev/docs with `tags: ["!dev", "!autodocs"]`. These use `play` functions for automated WCAG AA 2.2 testing.

### Accessibility Testing Pattern

Each component's stories include WCAG AA 2.2 compliance tests following this convention:

- **Export name**: PascalCase describing the assertion (e.g., `ShouldHaveButtonRole`)
- **`name`**: Human-readable with WCAG clause reference (e.g., `"should have role button (WCAG 4.1.2)"`)
- **`tags`**: `["!dev", "!autodocs"]` to exclude from visual rendering
- **`play`**: Async function using `expect`, `userEvent`, `waitFor`, `within` from `storybook/test`
- **WCAG areas tested**: role (4.1.2), accessible name (4.1.2/2.5.3), target size >= 24px (2.5.8), keyboard operability (2.1.1), state exposure (4.1.2), no focus trap (2.1.2), semantic structure (1.3.1)
- **Minimum target size**: All interactive elements (buttons, toggles, links, triggers) must be at least **24x24 CSS pixels** per WCAG 2.5.8. Test stories verify this with `getBoundingClientRect()`.

For disabled state stories, use `A11yWarning` component from `@sb/a11yWarning` and `A11Y_NOTES.DISABLED_NOT_RECOMMENDED` from `@sb/a11yNotes` for both Canvas warning and Docs description.

Portal-based components (dialog, popover, tooltip, select, dropdown-menu) render outside the Storybook canvas — use `within(canvasElement.ownerDocument.body)` to query them.

### Storybook A11y Addon

The `@storybook/addon-a11y` is configured in `.storybook/preview.ts` to run axe-core checks against WCAG 2.0 A/AA, 2.1 A/AA, and 2.2 AA tags with color-contrast enabled.

## Conventions

- Package manager: **pnpm**
- Components use `data-slot` attributes for styling and test targeting (e.g., `data-slot="button"`)
- CVA (`class-variance-authority`) for variant/size prop-driven styling
- Base UI primitives provide ARIA semantics; components add Tailwind styling on top
- IDs follow pattern: `${componentId}-label`, `${componentId}-helper`, `${componentId}-error`
- Form components use `aria-describedby` to link helper text and error messages, `aria-invalid` for error state
- ESLint enforces semicolons and trailing commas in multiline
