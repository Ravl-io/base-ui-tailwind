import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "../index";

describe("NavigationMenu", () => {
  it("should render", () => {
    const { container } = render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/">Home</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );
    expect(container.innerHTML).not.toBe("");
  });
});
