# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `@ravl/base-ui-tailwind`, a **React 19** design system library built on **shadcn/ui** patterns using **Base UI** primitives (from `@base-ui/react`) and **Tailwind CSS v4**. It is a component library (not an app) — the entry point is `src/index.ts` which re-exports all components, hooks, and utilities.

**Every component must have:**
1. A Storybook story file in `__stories__/` with visual stories (`tags: ["autodocs"]`)
2. Interaction/accessibility test stories validating **WCAG AA 2.2** compliance (`tags: ["!dev", "!autodocs"]`)

**Testing strategy has two layers:**
1. **Unit tests** (`*.test.ts`/`*.test.tsx`) — fast Node-based Vitest tests for logic, utilities, and component behavior. Run on CI.
2. **Storybook interaction tests** — browser-based `play` function tests for WCAG AA 2.2 compliance and visual interaction testing.

## Commands

| Task | Command |
|------|---------|
| Dev (Storybook) | `pnpm dev` (port 6006) |
| Build library | `pnpm build` |
| Build Storybook | `pnpm build:storybook` |
| Lint | `pnpm lint` |
| Lint fix | `pnpm lint:fix` |
| Run unit tests | `pnpm test` |
| Run unit tests (watch) | `pnpm test:watch` |
| Run single unit test | `pnpm vitest run --project unit src/components/ingredients/button/__tests__/button.test.tsx` |
| Run Storybook interaction tests | `pnpm test:ui` |

**Unit tests** run via Vitest in jsdom with `@testing-library/react` and `@testing-library/jest-dom`. Files: `src/**/*.test.{ts,tsx}`. Coverage via `@vitest/coverage-v8` with 80% thresholds (branches, functions, lines, statements). Use `fireEvent` from RTL — do **not** use `userEvent`.
**Storybook tests** run via Vitest + Playwright Chromium browser. Storybook `play` functions are the test runner (via `@storybook/addon-vitest`).

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

### Unit Testing Convention

Unit tests are **function-only** — test the logic our components add, not the libraries we consume. No snapshot tests. **Every component must have at least one test file** with a basic render test. Components with custom logic should have tests achieving 80% coverage (branches, functions, lines, statements).

- **Every component must have a test file** — at minimum a smoke test that renders the component. This ensures imports resolve and the component mounts without errors.
- **Test our code**: conditional rendering (e.g., `showCloseButton`, `withHandle`), computed values (e.g., CSS variables from props), event handling (e.g., click prevention, keyboard handlers), context providers/consumers, ID generation, utility functions
- **Don't test**: render order, prop-to-attribute passthrough with no logic (e.g., `data-variant={variant}`), CVA class generation, Base UI primitive roles/behavior, `data-slot` attribute presence, `className` forwarding, HTML element tag types (`tagName`), React prop forwarding, portal rendering, static JSX attributes, icon/SVG presence — these verify React or library behavior, not our logic
- **Use `fireEvent`** from `@testing-library/react`, not `userEvent`
- **File location**: `__tests__/` folder adjacent to component (e.g., `button/__tests__/button.test.tsx`)
- **Structure**: `describe("ComponentName", () => { describe("behavior group", () => { it("should ...") }) })`

## Conventions

- Package manager: **pnpm**
- Components use `data-slot` attributes for styling and test targeting (e.g., `data-slot="button"`)
- CVA (`class-variance-authority`) for variant/size prop-driven styling
- Base UI primitives provide ARIA semantics; components add Tailwind styling on top
- IDs follow pattern: `${componentId}-label`, `${componentId}-helper`, `${componentId}-error`
- Form components use `aria-describedby` to link helper text and error messages, `aria-invalid` for error state
- ESLint enforces semicolons and trailing commas in multiline
