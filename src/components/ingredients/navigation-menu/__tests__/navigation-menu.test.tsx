import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuIndicator,
} from "../index";

describe("NavigationMenu", () => {
  it("should render with links", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/">Home</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});

describe("NavigationMenuTrigger", () => {
  it("should render with chevron icon", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
            <NavigationMenuContent>Content</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );
    expect(screen.getByText("Menu")).toBeInTheDocument();
  });
});

describe("NavigationMenuIndicator", () => {
  it("should render", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/">Home</NavigationMenuLink>
            <NavigationMenuIndicator data-testid="indicator" />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );
    expect(screen.getByTestId("indicator")).toBeInTheDocument();
  });
});
