import { describe, expect, it } from "vitest";

import { assessment as realAssessment } from "@/core/content/assessment";
import { dimensions as realDimensions } from "@/core/content/dimensions";
import { indicators as realIndicators } from "@/core/content/indicators";
import type { IndicatorScore } from "@/core/contracts/scoreEngine";
import { calculateBehaviorIndexes } from "@/core/engines/behavior/calculateBehaviorIndexes";
import { scoreAssessment } from "@/core/engines/scoring/scoreAssessment";
import type { Answer } from "@/core/domain/answer";
import type { Dimension } from "@/core/domain/dimension";
import type { Indicator } from "@/core/domain/indicator";

const fixtureDimension: Dimension = {
  id: "dim-1",
  slug: "dim-1",
  name: "Dim 1",
  description: "",
  weight: 2,
  indicatorIds: ["ind-1", "ind-2"],
};

const fixtureIndicators: Indicator[] = [
  { id: "ind-1", slug: "ind-1", dimensionId: "dim-1", name: "Ind 1", description: "", weight: 1 },
  { id: "ind-2", slug: "ind-2", dimensionId: "dim-1", name: "Ind 2", description: "", weight: 3 },
];

function indicatorScore(indicatorId: string, score: number): IndicatorScore {
  return { indicatorId, score };
}

describe("calculateBehaviorIndexes", () => {
  it("computes rawScore as the weighted average of its indicators, and normalizedScore = rawScore / Dimension.weight", () => {
    const result = calculateBehaviorIndexes({
      dimensions: [fixtureDimension],
      indicators: fixtureIndicators,
      indicatorScores: [indicatorScore("ind-1", 40), indicatorScore("ind-2", 80)],
    });

    // rawScore = (40*1 + 80*3) / (1+3) = 280/4 = 70
    // normalizedScore = 70 / 2 = 35
    expect(result.behaviorIndexes).toHaveLength(1);
    expect(result.behaviorIndexes[0]).toEqual({
      id: "behavior_index_dim-1",
      dimensionId: "dim-1",
      rawScore: 70,
      normalizedScore: 35,
      confidence: 100,
    });
  });

  it("never mixes Dimension.weight into the aggregation step itself (only into normalization)", () => {
    const result = calculateBehaviorIndexes({
      dimensions: [{ ...fixtureDimension, weight: 1 }],
      indicators: fixtureIndicators,
      indicatorScores: [indicatorScore("ind-1", 40), indicatorScore("ind-2", 80)],
    });

    // rawScore continua 70 independente de Dimension.weight; só normalizedScore muda.
    expect(result.behaviorIndexes[0].rawScore).toBe(70);
    expect(result.behaviorIndexes[0].normalizedScore).toBe(70);
  });

  it("returns rawScore 0 (not NaN) when no indicator score is available for the dimension (boundary)", () => {
    const result = calculateBehaviorIndexes({
      dimensions: [fixtureDimension],
      indicators: fixtureIndicators,
      indicatorScores: [],
    });

    expect(result.behaviorIndexes[0].rawScore).toBe(0);
    expect(result.behaviorIndexes[0].normalizedScore).toBe(0);
  });

  it("returns normalizedScore 0 (not Infinity) when Dimension.weight is 0 (boundary)", () => {
    const result = calculateBehaviorIndexes({
      dimensions: [{ ...fixtureDimension, weight: 0 }],
      indicators: fixtureIndicators,
      indicatorScores: [indicatorScore("ind-1", 40), indicatorScore("ind-2", 80)],
    });

    expect(result.behaviorIndexes[0].normalizedScore).toBe(0);
  });

  it("ignores indicator scores for indicators that do not belong to any known dimension (invalid input)", () => {
    const result = calculateBehaviorIndexes({
      dimensions: [fixtureDimension],
      indicators: fixtureIndicators,
      indicatorScores: [
        indicatorScore("ind-1", 40),
        indicatorScore("ind-2", 80),
        indicatorScore("unknown-indicator", 999),
      ],
    });

    expect(result.behaviorIndexes).toHaveLength(1);
    expect(result.behaviorIndexes[0].rawScore).toBe(70);
  });

  it("ignores partial indicator coverage gracefully, averaging only over indicators with a score (invalid/partial input)", () => {
    const result = calculateBehaviorIndexes({
      dimensions: [fixtureDimension],
      indicators: fixtureIndicators,
      indicatorScores: [indicatorScore("ind-1", 40)],
    });

    // apenas ind-1 tem score: rawScore = (40*1) / 1 = 40
    expect(result.behaviorIndexes[0].rawScore).toBe(40);
  });

  it("always sets confidence to the documented placeholder (DEC-0008)", () => {
    const result = calculateBehaviorIndexes({
      dimensions: [fixtureDimension],
      indicators: fixtureIndicators,
      indicatorScores: [indicatorScore("ind-1", 40), indicatorScore("ind-2", 80)],
    });

    expect(result.behaviorIndexes[0].confidence).toBe(100);
  });

  it("produces one BehaviorIndex per Dimension for the real MVP content (5 dimensions)", () => {
    const result = calculateBehaviorIndexes({
      dimensions: realDimensions,
      indicators: realIndicators,
      indicatorScores: realIndicators.map((indicator) => indicatorScore(indicator.id, 50)),
    });

    expect(result.behaviorIndexes).toHaveLength(5);
    expect(result.behaviorIndexes.map((index) => index.dimensionId).sort()).toEqual(
      realDimensions.map((dimension) => dimension.id).sort(),
    );
  });

  it("runs end-to-end with the real MVP assessment: Score Engine output feeds directly into Behavior Engine", () => {
    function answer(questionId: string, alternativeId: string): Answer {
      return { questionId, alternativeId, answeredAt: new Date("2026-08-10T00:00:00Z") };
    }

    const answers = realAssessment.questions.map((question) => answer(question.id, "A"));
    const { indicatorScores } = scoreAssessment({ assessment: realAssessment, answers });

    const result = calculateBehaviorIndexes({
      dimensions: realDimensions,
      indicators: realIndicators,
      indicatorScores,
    });

    expect(result.behaviorIndexes).toHaveLength(5);

    // Todas as alternativas "A" = score 100. Para dimensões com peso 1.0,
    // rawScore = 100 e normalizedScore = 100 / 1.0 = 100.
    const initiative = result.behaviorIndexes.find((index) => index.dimensionId === "initiative");
    expect(initiative?.rawScore).toBe(100);
    expect(initiative?.normalizedScore).toBe(100);

    // Consistência tem peso 1.2: rawScore = 100 * 1.0(question) * 1.2(dimension) = 120;
    // normalizedScore = 120 / 1.2 = 100 (o peso é cancelado na normalização, DEC-0008).
    const consistency = result.behaviorIndexes.find((index) => index.dimensionId === "consistency");
    expect(consistency?.rawScore).toBe(120);
    expect(consistency?.normalizedScore).toBe(100);

    for (const behaviorIndex of result.behaviorIndexes) {
      expect(behaviorIndex.confidence).toBe(100);
    }
  });
});
