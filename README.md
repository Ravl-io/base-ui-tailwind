# @ravl-io/base-ui-tailwind

A **React 19** design system library built on [shadcn/ui](https://ui.shadcn.com/) patterns using [Base UI](https://base-ui.com/) primitives and **Tailwind CSS v4**.

## Installation

```bash
# Configure GitHub Packages registry for @ravl-io scope
echo "@ravl-io:registry=https://npm.pkg.github.com" >> .npmrc

# Install
pnpm add @ravl-io/base-ui-tailwind
```

> Requires a GitHub token with `packages:read` scope for authentication.

### Peer Dependencies

- `react` >= 19
- `react-dom` >= 19
- `tailwindcss` >= 4

## Usage

```tsx
// Import components
import { Button, Dialog } from "@ravl-io/base-ui-tailwind";

// Import styles (required — add to your app's entry point)
import "@ravl-io/base-ui-tailwind/styles";
```

### Form Recipes

Form recipes are composite components accessed via the `Form` namespace:

```tsx
import { Form } from "@ravl-io/base-ui-tailwind";

<Form name="signup" onSubmit={handleSubmit}>
  <Form.Input name="email" label="Email" type="email" required />
  <Form.Select name="role" label="Role" options={roles} />
  <Form.Checkbox name="terms" label="I agree to the terms" />
  <Form.RadioGroup name="plan" label="Plan" options={plans} />
</Form>
```

## Architecture

Components follow an **Ingredient/Recipe** pattern:

- **Ingredients** (`src/components/ingredients/`) — Primitive UI components. Thin wrappers around `@base-ui/react` primitives with Tailwind styling via CVA (class-variance-authority).
- **Recipes** (`src/components/recipes/`) — Composite components that compose ingredients into opinionated patterns (e.g., form components with built-in validation, labels, and error states).

### Components

- Accordion
- Alert
- Alert Dialog
- Aspect Ratio
- Avatar
- Badge
- Breadcrumb
- Button
- Button Group
- Calendar
- Card
- Carousel
- Chart
- Checkbox
- Collapsible
- Combobox
- Command
- Context Menu
- Dialog
- Drawer
- Dropdown Menu
- Empty
- Field
- Hover Card
- Input
- Input Group
- Input OTP
- Item
- Kbd
- Label
- Menubar
- Native Select
- Navigation Menu
- Pagination
- Popover
- Progress
- Radio Group
- Resizable
- Scroll Area
- Select
- Separator
- Sheet
- Sidebar
- Skeleton
- Slider
- Sonner
- Spinner
- Switch
- Table
- Tabs
- Textarea
- Toggle
- Toggle Group
- Tooltip

### Form Recipes

- `Form.Input`
- `Form.Select`
- `Form.Checkbox`
- `Form.RadioGroup`

Composite form components with built-in label, helper text, and error handling.

## Development

```bash
pnpm install
pnpm dev          # Storybook on port 6006
```

| Task | Command |
|------|---------|
| Dev (Storybook) | `pnpm dev` |
| Build library | `pnpm build` |
| Build Storybook | `pnpm build:storybook` |
| Lint | `pnpm lint` |
| Run unit tests | `pnpm test` |
| Run Storybook tests | `pnpm test:ui` |

## Testing

Two-layer testing strategy:

1. **Unit tests** — Vitest + Testing Library in jsdom. Tests component logic (conditional rendering, computed values, event handling). 80% coverage threshold.
2. **Storybook interaction tests** — Browser-based play function tests for WCAG AA 2.2 compliance and visual interaction testing.

## Accessibility

All components target **WCAG AA 2.2** compliance. Storybook interaction tests verify:

- Roles and accessible names (4.1.2)
- Keyboard operability (2.1.1)
- No focus traps (2.1.2)
- Minimum target size of 24x24px (2.5.8)
- Semantic structure (1.3.1)
- State exposure (4.1.2)

## Releasing

This project uses [Changesets](https://github.com/changesets/changesets) for versioning and publishing to GitHub Packages.

```bash
pnpm change       # Create a changeset
```

On merge to `main`, the release workflow automatically bumps the version, commits, tags, creates a GitHub release, and publishes to GitHub Packages.

## License

Private — Ravl-io.
