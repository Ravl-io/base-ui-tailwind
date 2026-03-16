import { render } from "@testing-library/react";
import { describe, it, expect, beforeAll } from "vitest";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../index";

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("InputOTP", () => {
  it("should render", () => {
    const { container } = render(
      <InputOTP maxLength={4}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
        </InputOTPGroup>
      </InputOTP>,
    );
    expect(container.innerHTML).not.toBe("");
  });
});
