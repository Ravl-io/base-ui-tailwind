import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../index";

describe("Select", () => {
  describe("SelectTrigger", () => {
    describe("size prop", () => {
      it("should default data-size to 'default'", () => {
        render(
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Pick one" />
            </SelectTrigger>
          </Select>,
        );

        expect(document.querySelector('[data-slot="select-trigger"]')).toHaveAttribute("data-size", "default");
      });

      it("should set data-size to sm when size prop is sm", () => {
        render(
          <Select>
            <SelectTrigger size="sm">
              <SelectValue placeholder="Pick one" />
            </SelectTrigger>
          </Select>,
        );

        expect(document.querySelector('[data-slot="select-trigger"]')).toHaveAttribute("data-size", "sm");
      });
    });
  });

  it("should render content in portal when open", () => {
    render(
      <Select open>
        <SelectTrigger>
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>,
    );

    expect(document.body.querySelector('[data-slot="select-content"]')).toBeInTheDocument();
  });
});
