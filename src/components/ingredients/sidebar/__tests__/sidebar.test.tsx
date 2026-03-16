import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeAll } from "vitest";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

vi.mock("@base-ui/react/merge-props", () => ({
  mergeProps: (...args: Record<string, unknown>[]) => Object.assign({}, ...args),
}));

vi.mock("@base-ui/react/use-render", () => ({
  useRender: ({ props, state }: { props: Record<string, unknown>; state: Record<string, unknown> }) => {
    const Tag = (state.slot === "sidebar-menu-button" || state.slot === "sidebar-menu-action" || state.slot === "sidebar-group-action" ? "button" : "div") as unknown as React.ElementType;
    return (
      <Tag
        data-slot={state.slot}
        data-sidebar={state.sidebar}
        className={props.className}
        {...props}
      >
        {(props as Record<string, unknown>).children as React.ReactNode}
      </Tag>
    );
  },
}));

vi.mock("@/components/ingredients/button", () => ({
  Button: ({ children, onClick, className, ...props }: Record<string, unknown>) => (
    <button onClick={onClick as React.MouseEventHandler} className={className as string} {...props}>
      {children as React.ReactNode}
    </button>
  ),
}));

vi.mock("@/components/ingredients/input", () => ({
  Input: (props: Record<string, unknown>) => <input {...props} />,
}));

vi.mock("@/components/ingredients/separator", () => ({
  Separator: (props: Record<string, unknown>) => <hr {...props} />,
}));

vi.mock("@/components/ingredients/sheet", () => ({
  Sheet: ({ children }: Record<string, unknown>) => <div>{children as React.ReactNode}</div>,
  SheetContent: ({ children }: Record<string, unknown>) => <div>{children as React.ReactNode}</div>,
  SheetDescription: ({ children }: Record<string, unknown>) => <p>{children as React.ReactNode}</p>,
  SheetHeader: ({ children }: Record<string, unknown>) => <div>{children as React.ReactNode}</div>,
  SheetTitle: ({ children }: Record<string, unknown>) => <h2>{children as React.ReactNode}</h2>,
}));

vi.mock("@/components/ingredients/skeleton", () => ({
  Skeleton: (props: Record<string, unknown>) => <div {...props} />,
}));

vi.mock("@/components/ingredients/tooltip", () => ({
  Tooltip: ({ children }: Record<string, unknown>) => <div>{children as React.ReactNode}</div>,
  TooltipContent: ({ children }: Record<string, unknown>) => <div>{children as React.ReactNode}</div>,
  TooltipTrigger: ({ children }: Record<string, unknown>) => <div>{children as React.ReactNode}</div>,
}));

import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarRail,
  SidebarMenuSkeleton,
  useSidebar,
} from "../index";

function renderWithProvider(ui: React.ReactNode, providerProps = {}) {
  return render(
    <SidebarProvider {...providerProps}>{ui}</SidebarProvider>,
  );
}

describe("SidebarProvider", () => {
  it("should set CSS custom properties for sidebar widths", () => {
    const { container } = render(<SidebarProvider>content</SidebarProvider>);
    const wrapper = container.querySelector("[data-slot='sidebar-wrapper']") as HTMLElement;
    expect(wrapper.style.getPropertyValue("--sidebar-width")).toBe("16rem");
    expect(wrapper.style.getPropertyValue("--sidebar-width-icon")).toBe("3rem");
  });
});

describe("useSidebar", () => {
  it("should throw when used outside SidebarProvider", () => {
    const Broken = () => {
      useSidebar();
      return null;
    };
    expect(() => render(<Broken />)).toThrow("useSidebar must be used within a SidebarProvider.");
  });
});

describe("Sidebar", () => {
  it("should render non-collapsible sidebar with aria-label", () => {
    renderWithProvider(<Sidebar collapsible="none">content</Sidebar>);
    expect(screen.getByLabelText("Sidebar")).toBeInTheDocument();
  });

  it("should render expanded state by default", () => {
    const { container } = renderWithProvider(<Sidebar>content</Sidebar>);
    const sidebarEl = container.querySelector("[data-slot='sidebar']");
    expect(sidebarEl).toHaveAttribute("data-state", "expanded");
  });

  it("should render collapsed state when defaultOpen=false", () => {
    const { container } = render(
      <SidebarProvider defaultOpen={false}>
        <Sidebar>content</Sidebar>
      </SidebarProvider>,
    );
    const sidebarEl = container.querySelector("[data-slot='sidebar']");
    expect(sidebarEl).toHaveAttribute("data-state", "collapsed");
  });
});

describe("SidebarTrigger", () => {
  it("should call custom onClick alongside toggle", () => {
    const onClick = vi.fn();
    renderWithProvider(<SidebarTrigger onClick={onClick} />);
    const btn = screen.getByText("Toggle Sidebar").closest("button")!;
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledOnce();
  });
});

describe("SidebarRail", () => {
  it("should render with aria-label 'Toggle Sidebar'", () => {
    renderWithProvider(<SidebarRail data-testid="rail" />);
    expect(screen.getByTestId("rail")).toHaveAttribute("aria-label", "Toggle Sidebar");
  });
});

describe("SidebarMenuSkeleton", () => {
  describe("showIcon prop", () => {
    it("should render icon skeleton when showIcon is true", () => {
      const { container } = renderWithProvider(<SidebarMenuSkeleton showIcon />);
      expect(container.querySelector("[data-sidebar='menu-skeleton-icon']")).toBeInTheDocument();
    });

    it("should not render icon skeleton by default", () => {
      const { container } = renderWithProvider(<SidebarMenuSkeleton />);
      expect(container.querySelector("[data-sidebar='menu-skeleton-icon']")).not.toBeInTheDocument();
    });
  });
});

describe("keyboard shortcut", () => {
  it("should toggle sidebar on Ctrl+b", () => {
    const { container } = render(
      <SidebarProvider>
        <Sidebar>content</Sidebar>
      </SidebarProvider>,
    );
    const sidebarEl = container.querySelector("[data-slot='sidebar']");
    expect(sidebarEl).toHaveAttribute("data-state", "expanded");

    fireEvent.keyDown(window, { key: "b", ctrlKey: true });
    const sidebarAfter = container.querySelector("[data-slot='sidebar']");
    expect(sidebarAfter).toHaveAttribute("data-state", "collapsed");
  });
});
