import { describe, expect, it } from "vitest";

import { missions } from "@/core/content/missions";

describe("core/content missions referential integrity", () => {
  it("has exactly 3 documented missions (05_CONTENT_LIBRARY.md, Seção 20)", () => {
    expect(missions).toHaveLength(3);
  });

  it("has no duplicate mission ids", () => {
    const ids = missions.map((mission) => mission.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
