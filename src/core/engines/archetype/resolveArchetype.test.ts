import { describe, expect, it } from "vitest";

import { archetypeReferenceProfiles } from "@/core/content/archetypeReferenceProfiles";
import { assessment as realAssessment } from "@/core/content/assessment";
import { dimensions as realDimensions } from "@/core/content/dimensions";
import { indicators as realIndicators } from "@/core/content/indicators";
import { confidenceLevelFor, resolveArchetype } from "@/core/engines/archetype/resolveArchetype";
import { calculateBehaviorIndexes } from "@/core/engines/behavior/calculateBehaviorIndexes";
import { scoreAssessment } from "@/core/engines/scoring/scoreAssessment";
import type { Answer } from "@/core/domain/answer";
import type { ArchetypeReferenceProfile } from "@/core/domain/archetypeReferenceProfile";
import type { BehaviorIndex } from "@/core/domain/behaviorIndex";
import type { Dimension } from "@/core/domain/dimension";
import type { ArchetypeResolverInput } from "@/core/contracts/archetypeResolver";
import { ConfidenceLevel } from "@/core/types/enums";

function dimension(id: string, weight: number): Dimension {
  return { id, slug: id, name: id, description: "", weight, indicatorIds: [] };
}

function behaviorIndex(dimensionId: string, normalizedScore: number): BehaviorIndex {
  return {
    id: `behavior_index_${dimensionId}`,
    dimensionId,
    rawScore: normalizedScore,
    normalizedScore,
    confidence: 100,
  };
}

function archetype(
  id: string,
  referenceProfile: Record<string, number>,
): ArchetypeReferenceProfile {
  return { id, slug: id, name: id, referenceProfile };
}

const FIVE_DIMENSIONS_WEIGHT_1 = [
  dimension("initiative", 1),
  dimension("planning", 1),
  dimension("pressure", 1),
  dimension("distraction", 1),
  dimension("consistency", 1),
];

function fixtureFor(bestDistance: number, secondBestDistance: number): ArchetypeResolverInput {
  return {
    dimensions: [dimension("a", 1)],
    behaviorIndexes: [behaviorIndex("a", 0)],
    archetypeProfiles: [
      archetype("winner", { a: bestDistance }),
      archetype("runner-up", { a: secondBestDistance }),
    ],
  };
}

const USER_ALL_50 = [
  behaviorIndex("initiative", 50),
  behaviorIndex("planning", 50),
  behaviorIndex("pressure", 50),
  behaviorIndex("distraction", 50),
  behaviorIndex("consistency", 50),
];

describe("resolveArchetype", () => {
  it("computes the weighted euclidean distance for every candidate", () => {
    const result = resolveArchetype({
      dimensions: [dimension("a", 1), dimension("b", 2)],
      behaviorIndexes: [behaviorIndex("a", 50), behaviorIndex("b", 50)],
      archetypeProfiles: [archetype("A", { a: 50, b: 50 }), archetype("B", { a: 80, b: 20 })],
    });

    // A: sqrt(1*(50-50)^2 + 2*(50-50)^2) = 0
    // B: sqrt(1*(50-80)^2 + 2*(50-20)^2) = sqrt(900 + 1800) = sqrt(2700)
    expect(result.distances.find((d) => d.archetypeId === "A")?.distance).toBe(0);
    expect(result.distances.find((d) => d.archetypeId === "B")?.distance).toBeCloseTo(
      Math.sqrt(2700),
      6,
    );
  });

  it("selects the archetype with the smallest distance when there is no tie", () => {
    const result = resolveArchetype({
      dimensions: [dimension("a", 1)],
      behaviorIndexes: [behaviorIndex("a", 50)],
      archetypeProfiles: [archetype("close", { a: 55 }), archetype("far", { a: 0 })],
    });

    expect(result.archetypeId).toBe("close");
  });

  it("computes confidence as the relative margin between the best and second-best distance (DEC-0003)", () => {
    const result = resolveArchetype({
      dimensions: [dimension("a", 1)],
      behaviorIndexes: [behaviorIndex("a", 0)],
      archetypeProfiles: [archetype("near", { a: 10 }), archetype("far", { a: 30 })],
    });

    // best=10, secondBest=30 -> confidence = round(100*(1 - 10/40)) = 75
    expect(result.confidence).toBe(75);
  });

  it("returns confidence 100 (boundary) when best distance is 0 and there is a clear second place", () => {
    const result = resolveArchetype({
      dimensions: [dimension("a", 1)],
      behaviorIndexes: [behaviorIndex("a", 50)],
      archetypeProfiles: [archetype("exact", { a: 50 }), archetype("off", { a: 90 })],
    });

    expect(result.confidence).toBe(100);
  });

  it("returns confidence 100 (boundary, defensive) when both best and second-best distance are 0", () => {
    const result = resolveArchetype({
      dimensions: [dimension("a", 1)],
      behaviorIndexes: [behaviorIndex("a", 50)],
      archetypeProfiles: [archetype("exact-1", { a: 50 }), archetype("exact-2", { a: 50 })],
    });

    expect(result.confidence).toBe(100);
    expect(Number.isNaN(result.confidence)).toBe(false);
  });

  it("returns confidence 50 (boundary) when two archetypes tie for the smallest distance", () => {
    // Em um empate real (distância1 = distância2), a razão
    // best/(best+secondBest) é sempre 0.5, então confidence = 50 —
    // nunca 0. É por isso que o critério de desempate 1 (Confidence
    // Score) nunca discrimina entre candidatos empatados (DEC-0009):
    // o valor é sempre o mesmo (50) para qualquer um deles.
    const result = resolveArchetype({
      dimensions: [dimension("a", 1)],
      behaviorIndexes: [behaviorIndex("a", 50)],
      archetypeProfiles: [archetype("tied-1", { a: 60 }), archetype("tied-2", { a: 40 })],
    });

    expect(result.confidence).toBe(50);
    expect(result.confidenceLevel).toBe(ConfidenceLevel.Medium);
  });

  it("computes confidenceLevel for the achievable range produced by resolveArchetype (50-100)", () => {
    expect(resolveArchetype(fixtureFor(10, 30)).confidenceLevel).toBe(ConfidenceLevel.High); // 75
    expect(resolveArchetype(fixtureFor(1, 3)).confidenceLevel).toBe(ConfidenceLevel.High); // 75
    expect(resolveArchetype(fixtureFor(0, 10)).confidenceLevel).toBe(ConfidenceLevel.VeryHigh); // 100
  });

  it.each([
    [0, ConfidenceLevel.VeryLow],
    [20, ConfidenceLevel.VeryLow],
    [21, ConfidenceLevel.Low],
    [40, ConfidenceLevel.Low],
    [41, ConfidenceLevel.Medium],
    [50, ConfidenceLevel.Medium],
    [60, ConfidenceLevel.Medium],
    [61, ConfidenceLevel.High],
    [80, ConfidenceLevel.High],
    [81, ConfidenceLevel.VeryHigh],
    [100, ConfidenceLevel.VeryHigh],
  ])(
    "confidenceLevelFor maps the full official 0-100 range: %i -> %s",
    (confidenceValue, expectedLevel) => {
      // Testado diretamente (não via resolveArchetype): a fórmula de
      // DEC-0003 só produz confidence no intervalo [50, 100] em uso
      // normal (a segunda menor distância nunca é menor que a menor),
      // então VeryLow/Low/parte de Medium nunca ocorrem na prática —
      // mas a função de mapeamento precisa implementar a tabela
      // oficial completa (07_DATA_MODEL.md, Seção 12) de qualquer forma.
      expect(confidenceLevelFor(confidenceValue)).toBe(expectedLevel);
    },
  );

  it("tie-break criterion 2: prefers the candidate with higher reference_profile.consistency when tied on distance", () => {
    const result = resolveArchetype({
      dimensions: FIVE_DIMENSIONS_WEIGHT_1,
      behaviorIndexes: USER_ALL_50,
      archetypeProfiles: [
        archetype("higher-consistency", {
          initiative: 50,
          planning: 50,
          pressure: 50,
          distraction: 50,
          consistency: 60,
        }),
        archetype("lower-consistency", {
          initiative: 50,
          planning: 50,
          pressure: 60,
          distraction: 50,
          consistency: 50,
        }),
      ],
    });

    // Ambos com distância 10 (diferença de 10 em uma única dimensão de peso 1).
    expect(result.archetypeId).toBe("higher-consistency");
  });

  it("tie-break criterion 3: falls through to reference_profile.planning when distance and consistency both tie", () => {
    const result = resolveArchetype({
      dimensions: FIVE_DIMENSIONS_WEIGHT_1,
      behaviorIndexes: USER_ALL_50,
      archetypeProfiles: [
        archetype("higher-planning", {
          initiative: 50,
          planning: 60,
          pressure: 50,
          distraction: 50,
          consistency: 55,
        }),
        archetype("lower-planning", {
          initiative: 50,
          planning: 50,
          pressure: 60,
          distraction: 50,
          consistency: 55,
        }),
      ],
    });

    // Distância² = 100 + 25 = 125 para ambos; consistency empatada em 55.
    expect(result.archetypeId).toBe("higher-planning");
  });

  it("tie-break criterion 5: falls through to the fixed priority order when distance, consistency and planning all tie", () => {
    const result = resolveArchetype({
      dimensions: FIVE_DIMENSIONS_WEIGHT_1,
      behaviorIndexes: USER_ALL_50,
      archetypeProfiles: [
        archetype("executor_under_pressure", {
          initiative: 50,
          planning: 50,
          pressure: 60,
          distraction: 50,
          consistency: 50,
        }),
        archetype("analytical_explorer", {
          initiative: 60,
          planning: 50,
          pressure: 50,
          distraction: 50,
          consistency: 50,
        }),
      ],
    });

    // Prioridade oficial: analytical_explorer vem antes de executor_under_pressure.
    expect(result.archetypeId).toBe("analytical_explorer");
  });

  it("does not apply the predominant-indicators criterion (pending per DEC-0009)", () => {
    // Duas execuções idênticas em distância/consistency/planning só se
    // diferenciam pela prioridade fixa (critério 5), nunca por uma
    // contagem de indicadores predominantes (critério 4, pulado).
    const result = resolveArchetype({
      dimensions: FIVE_DIMENSIONS_WEIGHT_1,
      behaviorIndexes: USER_ALL_50,
      archetypeProfiles: [
        archetype("priority_accumulator", {
          initiative: 60,
          planning: 50,
          pressure: 50,
          distraction: 50,
          consistency: 50,
        }),
        archetype("executor_under_pressure", {
          initiative: 50,
          planning: 50,
          pressure: 60,
          distraction: 50,
          consistency: 50,
        }),
      ],
    });

    expect(result.archetypeId).toBe("executor_under_pressure");
  });

  it("handles a single archetype candidate (no second-best) without crashing (boundary)", () => {
    const result = resolveArchetype({
      dimensions: [dimension("a", 1)],
      behaviorIndexes: [behaviorIndex("a", 0)],
      archetypeProfiles: [archetype("only-candidate", { a: 10 })],
    });

    expect(result.archetypeId).toBe("only-candidate");
    // Sem segundo colocado, secondBestDistance cai para bestDistance (10),
    // produzindo o mesmo confidence=50 de um empate real.
    expect(result.confidence).toBe(50);
    expect(Number.isNaN(result.confidence)).toBe(false);
  });

  it("defaults a dimension's user score to 0 when there is no matching BehaviorIndex (invalid/partial input)", () => {
    const result = resolveArchetype({
      dimensions: [dimension("a", 1), dimension("b", 1)],
      behaviorIndexes: [behaviorIndex("a", 50)], // falta o BehaviorIndex de "b"
      archetypeProfiles: [archetype("candidate", { a: 50, b: 30 })],
    });

    // userValue("b") cai para 0 (fallback defensivo): distancia² = (50-50)^2 + 1*(0-30)^2 = 900
    expect(result.distances[0].distance).toBeCloseTo(30, 6);
  });

  it("defaults a dimension's weight to 0 when there is no matching Dimension (invalid/partial input)", () => {
    const result = resolveArchetype({
      dimensions: [dimension("a", 1)], // falta a Dimension "b"
      behaviorIndexes: [behaviorIndex("a", 50), behaviorIndex("b", 0)],
      archetypeProfiles: [archetype("candidate", { a: 50, b: 30 })],
    });

    // weight("b") cai para 0 (fallback defensivo): a diferença em "b" não conta na distância.
    expect(result.distances[0].distance).toBe(0);
  });

  it("includes the distance to every candidate archetype in the output (transparency)", () => {
    const result = resolveArchetype({
      dimensions: [dimension("a", 1)],
      behaviorIndexes: [behaviorIndex("a", 50)],
      archetypeProfiles: [
        archetype("A", { a: 50 }),
        archetype("B", { a: 0 }),
        archetype("C", { a: 100 }),
      ],
    });

    expect(result.distances).toHaveLength(3);
    expect(result.distances.map((d) => d.archetypeId).sort()).toEqual(["A", "B", "C"]);
  });

  it("runs end-to-end with the real MVP content and pipeline (Score -> Behavior -> Archetype)", () => {
    function answer(questionId: string, alternativeId: string): Answer {
      return { questionId, alternativeId, answeredAt: new Date("2026-08-11T00:00:00Z") };
    }

    const answers = realAssessment.questions.map((question) => answer(question.id, "C"));
    const { indicatorScores } = scoreAssessment({ assessment: realAssessment, answers });
    const { behaviorIndexes } = calculateBehaviorIndexes({
      indicatorScores,
      dimensions: realDimensions,
      indicators: realIndicators,
    });

    const result = resolveArchetype({
      behaviorIndexes,
      archetypeProfiles: archetypeReferenceProfiles,
      dimensions: realDimensions,
    });

    expect(archetypeReferenceProfiles.map((a) => a.id)).toContain(result.archetypeId);
    expect(result.confidence).toBeGreaterThanOrEqual(0);
    expect(result.confidence).toBeLessThanOrEqual(100);
    expect(result.distances).toHaveLength(4);
  });
});
