import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Menubar, MenubarMenu, MenubarTrigger } from "../index";

describe("Menubar", () => {
  it("should render", () => {
    const { container } = render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
        </MenubarMenu>
      </Menubar>,
    );
    expect(container.innerHTML).not.toBe("");
  });
});
