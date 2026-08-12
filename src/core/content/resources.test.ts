import { describe, expect, it } from "vitest";

import { resources } from "@/core/content/resources";

describe("core/content resources referential integrity", () => {
  it("has exactly 1 documented resource (05_CONTENT_LIBRARY.md, Seção 21)", () => {
    expect(resources).toHaveLength(1);
  });

  it("has no duplicate resource ids", () => {
    const ids = resources.map((resource) => resource.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
