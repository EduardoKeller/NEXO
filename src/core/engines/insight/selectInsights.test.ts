import { describe, expect, it } from "vitest";

import { assessment as realAssessment } from "@/core/content/assessment";
import { dimensions as realDimensions } from "@/core/content/dimensions";
import { indicators as realIndicators } from "@/core/content/indicators";
import { insights as realInsights } from "@/core/content/insights";
import type { IndicatorScore } from "@/core/contracts/scoreEngine";
import { scoreAssessment } from "@/core/engines/scoring/scoreAssessment";
import { selectInsights } from "@/core/engines/insight/selectInsights";
import type { Answer } from "@/core/domain/answer";
import type { Dimension } from "@/core/domain/dimension";
import type { Indicator } from "@/core/domain/indicator";
import type { Insight } from "@/core/domain/insight";
import { Priority } from "@/core/types/enums";

function dimension(id: string, weight: number): Dimension {
  return { id, slug: id, name: id, description: "", weight, indicatorIds: [] };
}

function indicator(id: string, dimensionId: string): Indicator {
  return { id, slug: id, dimensionId, name: id, description: "", weight: 1 };
}

function indicatorScore(indicatorId: string, score: number): IndicatorScore {
  return { indicatorId, score };
}

function insight(id: string, indicatorId: string, priority: Priority): Insight {
  return {
    id,
    indicatorId,
    priority,
    title: id,
    description: id,
    recommendation: id,
  };
}

const DIM = dimension("dim-1", 1);
const IND_A = indicator("ind-a", "dim-1");
const IND_B = indicator("ind-b", "dim-1");

describe("selectInsights", () => {
  it("selects an insight for a predominant indicator (high, boundary >= threshold)", () => {
    const result = selectInsights({
      archetypeId: "any",
      indicators: [IND_A],
      dimensions: [DIM],
      indicatorScores: [indicatorScore("ind-a", 70)], // normalized=70, |70-50|=20 >= 20
      insightLibrary: [insight("i1", "ind-a", Priority.High)],
    });

    expect(result.predominantIndicatorIds).toEqual(["ind-a"]);
    expect(result.insights.map((i) => i.id)).toEqual(["i1"]);
  });

  it("selects an insight for a predominant indicator (low, boundary >= threshold)", () => {
    const result = selectInsights({
      archetypeId: "any",
      indicators: [IND_A],
      dimensions: [DIM],
      indicatorScores: [indicatorScore("ind-a", 30)], // normalized=30, |30-50|=20 >= 20
      insightLibrary: [insight("i1", "ind-a", Priority.High)],
    });

    expect(result.predominantIndicatorIds).toEqual(["ind-a"]);
    expect(result.insights.map((i) => i.id)).toEqual(["i1"]);
  });

  it("does not select an indicator just inside the neutral zone (boundary < threshold)", () => {
    const result = selectInsights({
      archetypeId: "any",
      indicators: [IND_A],
      dimensions: [DIM],
      indicatorScores: [indicatorScore("ind-a", 31)], // |31-50|=19 < 20
      insightLibrary: [insight("i1", "ind-a", Priority.High)],
    });

    expect(result.predominantIndicatorIds).toEqual([]);
    expect(result.insights).toEqual([]);
  });

  it("cancels out Dimension.weight during normalization, same as the Behavior Engine (DEC-0008/DEC-0010)", () => {
    const heavyDimension = dimension("dim-heavy", 1.2);
    const heavyIndicator = indicator("ind-heavy", "dim-heavy");

    // score bruto já carrega o peso da Dimensão: 70 * 1.2 = 84
    const result = selectInsights({
      archetypeId: "any",
      indicators: [heavyIndicator],
      dimensions: [heavyDimension],
      indicatorScores: [indicatorScore("ind-heavy", 84)],
      insightLibrary: [insight("i1", "ind-heavy", Priority.High)],
    });

    // normalized = 84 / 1.2 = 70, |70-50|=20 >= 20 -> predominante
    expect(result.predominantIndicatorIds).toEqual(["ind-heavy"]);
  });

  it("marks an indicator as predominant even without a matching insight in the library (content gap, DEC-0010)", () => {
    const result = selectInsights({
      archetypeId: "any",
      indicators: [IND_A],
      dimensions: [DIM],
      indicatorScores: [indicatorScore("ind-a", 100)],
      insightLibrary: [], // biblioteca vazia
    });

    expect(result.predominantIndicatorIds).toEqual(["ind-a"]);
    expect(result.insights).toEqual([]);
  });

  it("sorts selected insights by priority: Critical > High > Medium > Low", () => {
    const result = selectInsights({
      archetypeId: "any",
      indicators: [IND_A, IND_B],
      dimensions: [DIM],
      indicatorScores: [indicatorScore("ind-a", 100), indicatorScore("ind-b", 0)],
      insightLibrary: [
        insight("low", "ind-b", Priority.Low),
        insight("critical", "ind-a", Priority.Critical),
      ],
    });

    expect(result.insights.map((i) => i.id)).toEqual(["critical", "low"]);
  });

  it("ignores indicator scores referencing an indicator that does not exist (invalid input)", () => {
    const result = selectInsights({
      archetypeId: "any",
      indicators: [IND_A],
      dimensions: [DIM],
      indicatorScores: [indicatorScore("unknown-indicator", 100)],
      insightLibrary: [insight("i1", "unknown-indicator", Priority.High)],
    });

    expect(result.predominantIndicatorIds).toEqual([]);
    expect(result.insights).toEqual([]);
  });

  it("ignores indicator scores whose indicator references a dimension that does not exist (invalid input)", () => {
    const orphanIndicator = indicator("ind-orphan", "dim-unknown");

    const result = selectInsights({
      archetypeId: "any",
      indicators: [orphanIndicator],
      dimensions: [DIM],
      indicatorScores: [indicatorScore("ind-orphan", 100)],
      insightLibrary: [],
    });

    expect(result.predominantIndicatorIds).toEqual([]);
  });

  it("does not divide by zero when Dimension.weight is 0 (boundary, defensive)", () => {
    const zeroWeightDimension = dimension("dim-zero", 0);
    const zeroWeightIndicator = indicator("ind-zero", "dim-zero");

    const result = selectInsights({
      archetypeId: "any",
      indicators: [zeroWeightIndicator],
      dimensions: [zeroWeightDimension],
      indicatorScores: [indicatorScore("ind-zero", 100)],
      insightLibrary: [],
    });

    expect(result.predominantIndicatorIds).toEqual([]);
    expect(Number.isNaN(result.predominantIndicatorIds.length)).toBe(false);
  });

  it("returns empty outputs for an empty set of indicator scores (boundary)", () => {
    const result = selectInsights({
      archetypeId: "any",
      indicators: [IND_A],
      dimensions: [DIM],
      indicatorScores: [],
      insightLibrary: [insight("i1", "ind-a", Priority.High)],
    });

    expect(result.predominantIndicatorIds).toEqual([]);
    expect(result.insights).toEqual([]);
  });

  it("does not use archetypeId to filter the selection (per DEC-0010, no operational rule documented)", () => {
    const base = {
      indicators: [IND_A],
      dimensions: [DIM],
      indicatorScores: [indicatorScore("ind-a", 100)],
      insightLibrary: [insight("i1", "ind-a", Priority.High)],
    };

    const resultA = selectInsights({ ...base, archetypeId: "executor_under_pressure" });
    const resultB = selectInsights({ ...base, archetypeId: "strategic_refiner" });

    expect(resultA).toEqual(resultB);
  });

  it("runs end-to-end with the real MVP content: extreme answers (A) make every indicator predominant", () => {
    function answer(questionId: string, alternativeId: string): Answer {
      return { questionId, alternativeId, answeredAt: new Date("2026-08-11T00:00:00Z") };
    }

    const answers = realAssessment.questions.map((question) => answer(question.id, "A"));
    const { indicatorScores } = scoreAssessment({ assessment: realAssessment, answers });

    const result = selectInsights({
      archetypeId: "executor_under_pressure",
      indicators: realIndicators,
      dimensions: realDimensions,
      indicatorScores,
      insightLibrary: realInsights,
    });

    expect(result.predominantIndicatorIds).toHaveLength(10);
    expect(result.insights).toHaveLength(3);
    expect(result.insights.map((i) => i.id).sort()).toEqual(
      ["insight_starting", "insight_focus", "insight_consistency"].sort(),
    );
    // Ordenado por prioridade: as duas High vêm antes da Medium.
    expect(result.insights[2].priority).toBe(Priority.Medium);
  });

  it("runs end-to-end with the real MVP content: neutral answers (B/C) select no insight (calibração v0.1)", () => {
    function answer(questionId: string, alternativeId: string): Answer {
      return { questionId, alternativeId, answeredAt: new Date("2026-08-11T00:00:00Z") };
    }

    const answers = realAssessment.questions.map((question) => answer(question.id, "B"));
    const { indicatorScores } = scoreAssessment({ assessment: realAssessment, answers });

    const result = selectInsights({
      archetypeId: "executor_under_pressure",
      indicators: realIndicators,
      dimensions: realDimensions,
      indicatorScores,
      insightLibrary: realInsights,
    });

    expect(result.predominantIndicatorIds).toEqual([]);
    expect(result.insights).toEqual([]);
  });
});
