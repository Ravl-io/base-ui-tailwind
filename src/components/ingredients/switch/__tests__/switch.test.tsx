import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("@base-ui/react/switch", () => {
  const Root = ({ children, className, ...props }: Record<string, unknown>) => (
    <button role="switch" className={className as string} {...props}>{children as React.ReactNode}</button>
  );
  const Thumb = (props: Record<string, unknown>) => <span {...props} />;
  return { Switch: { Root, Thumb } };
});

import { Switch } from "../index";

describe("Switch", () => {
  describe("size prop", () => {
    it("should default data-size to 'default'", () => {
      render(<Switch />);
      expect(screen.getByRole("switch")).toHaveAttribute("data-size", "default");
    });

    it("should set data-size='sm' when size='sm'", () => {
      render(<Switch size="sm" />);
      expect(screen.getByRole("switch")).toHaveAttribute("data-size", "sm");
    });
  });
});
