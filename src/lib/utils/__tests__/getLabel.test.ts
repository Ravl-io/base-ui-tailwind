import { describe, it, expect } from "vitest";
import { getLabel } from "../getLabel";

describe("getLabel", () => {
  describe("when value is provided", () => {
    it("should return the value", () => {
      expect(getLabel("Hello", "Fallback")).toBe("Hello");
    });

    it("should return an empty string value over the fallback", () => {
      expect(getLabel("", "Fallback")).toBe("");
    });
  });

  describe("when value is undefined", () => {
    it("should return the fallback", () => {
      expect(getLabel(undefined, "Fallback")).toBe("Fallback");
    });
  });
});
