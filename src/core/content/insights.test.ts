import { describe, expect, it } from "vitest";

import { indicators } from "@/core/content/indicators";
import { insights } from "@/core/content/insights";

describe("core/content insights referential integrity", () => {
  it("has exactly 3 documented insights (5_CONTENT_LIBRARY.md, Seção 18)", () => {
    expect(insights).toHaveLength(3);
  });

  it("every insight.indicatorId references an indicator that exists", () => {
    const indicatorIds = new Set(indicators.map((indicator) => indicator.id));

    for (const insight of insights) {
      expect(indicatorIds.has(insight.indicatorId)).toBe(true);
    }
  });

  it("has no two insights for the same indicator", () => {
    const indicatorIds = insights.map((insight) => insight.indicatorId);
    expect(new Set(indicatorIds).size).toBe(indicatorIds.length);
  });
});
