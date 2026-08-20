import { describe, expect, it } from "vitest";

describe("Vitest infrastructure", () => {
  it("executes assertions and reports results", () => {
    expect(1 + 1).toBe(2);
  });

  it("runs in a jsdom environment", () => {
    expect(typeof document).toBe("object");
    expect(typeof window).toBe("object");
  });
});
