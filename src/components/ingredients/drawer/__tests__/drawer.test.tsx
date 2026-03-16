import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Drawer, DrawerTrigger } from "../index";

describe("Drawer", () => {
  it("should render", () => {
    const { container } = render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
      </Drawer>,
    );
    expect(container.innerHTML).not.toBe("");
  });
});
