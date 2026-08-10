import { describe, expect, it } from "vitest";

import { dimensions } from "@/core/content/dimensions";
import { indicators } from "@/core/content/indicators";
import { questions } from "@/core/content/questions";

describe("core/content referential integrity", () => {
  it("has 5 dimensions and 10 indicators", () => {
    expect(dimensions).toHaveLength(5);
    expect(indicators).toHaveLength(10);
  });

  it("has 10 questions, each with exactly 4 alternatives", () => {
    expect(questions).toHaveLength(10);
    for (const question of questions) {
      expect(question.alternatives).toHaveLength(4);
      expect(question.alternatives.map((alternative) => alternative.id)).toEqual([
        "A",
        "B",
        "C",
        "D",
      ]);
    }
  });

  it("every indicator references a dimension that exists", () => {
    const dimensionIds = new Set(dimensions.map((dimension) => dimension.id));
    for (const indicator of indicators) {
      expect(dimensionIds.has(indicator.dimensionId)).toBe(true);
    }
  });

  it("every dimension.indicatorIds points to an indicator that exists and belongs to it", () => {
    const indicatorsById = new Map(indicators.map((indicator) => [indicator.id, indicator]));
    for (const dimension of dimensions) {
      for (const indicatorId of dimension.indicatorIds) {
        const indicator = indicatorsById.get(indicatorId);
        expect(indicator).toBeDefined();
        expect(indicator?.dimensionId).toBe(dimension.id);
      }
    }
  });

  it("every question references a dimension and a primary indicator that exist and match", () => {
    const dimensionIds = new Set(dimensions.map((dimension) => dimension.id));
    const indicatorsById = new Map(indicators.map((indicator) => [indicator.id, indicator]));
    for (const question of questions) {
      expect(dimensionIds.has(question.dimensionId)).toBe(true);
      const primaryIndicator = indicatorsById.get(question.primaryIndicatorId);
      expect(primaryIndicator).toBeDefined();
      expect(primaryIndicator?.dimensionId).toBe(question.dimensionId);
    }
  });

  it("every indicator is covered by exactly one question as primary indicator", () => {
    const coveredIndicatorIds = questions.map((question) => question.primaryIndicatorId);
    const indicatorIds = indicators.map((indicator) => indicator.id);
    expect([...coveredIndicatorIds].sort()).toEqual([...indicatorIds].sort());
  });

  it("keeps alternative scores within the official 0-100 range", () => {
    for (const question of questions) {
      for (const alternative of question.alternatives) {
        expect(alternative.score).toBeGreaterThanOrEqual(0);
        expect(alternative.score).toBeLessThanOrEqual(100);
      }
    }
  });
});
