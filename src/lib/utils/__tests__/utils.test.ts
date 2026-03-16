import { describe, it, expect } from "vitest";
import { cn } from "../utils";

describe("cn", () => {
  describe("merging classes", () => {
    it("should merge multiple class strings", () => {
      expect(cn("foo", "bar")).toBe("foo bar");
    });

    it("should handle a single class", () => {
      expect(cn("foo")).toBe("foo");
    });

    it("should return empty string when called with no arguments", () => {
      expect(cn()).toBe("");
    });
  });

  describe("conditional classes", () => {
    it("should ignore falsy values", () => {
      const condition = false;
      expect(cn("foo", condition && "bar", "baz")).toBe("foo baz");
    });

    it("should ignore undefined values", () => {
      expect(cn("foo", undefined, "baz")).toBe("foo baz");
    });

    it("should ignore null values", () => {
      expect(cn("foo", null, "baz")).toBe("foo baz");
    });
  });

  describe("tailwind conflict resolution", () => {
    it("should resolve padding conflicts by keeping the last value", () => {
      expect(cn("px-4", "px-2")).toBe("px-2");
    });

    it("should resolve margin conflicts by keeping the last value", () => {
      expect(cn("mt-4", "mt-8")).toBe("mt-8");
    });

    it("should not remove non-conflicting tailwind classes", () => {
      expect(cn("px-4", "py-2")).toBe("px-4 py-2");
    });
  });
});
