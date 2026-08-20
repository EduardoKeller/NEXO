import { describe, expect, it } from "vitest";

import { archetypeProfiles as realArchetypeProfiles } from "@/core/content/archetypeProfiles";
import { archetypeReferenceProfiles as realArchetypeReferenceProfiles } from "@/core/content/archetypeReferenceProfiles";
import { assessment as realAssessment } from "@/core/content/assessment";
import { dimensions as realDimensions } from "@/core/content/dimensions";
import { indicators as realIndicators } from "@/core/content/indicators";
import { insights as realInsights } from "@/core/content/insights";
import { missions as realMissions } from "@/core/content/missions";
import { resources as realResources } from "@/core/content/resources";
import { archetypeEvolutionContent as realArchetypeEvolutionContent } from "@/core/content/archetypeEvolutionContent";
import type { ArchetypeResolverOutput } from "@/core/contracts/archetypeResolver";
import { buildAssessmentResult } from "@/core/engines/resultBuilder/buildAssessmentResult";
import { resolveArchetype } from "@/core/engines/archetype/resolveArchetype";
import { buildEvolutionPlan } from "@/core/engines/evolution/buildEvolutionPlan";
import { calculateBehaviorIndexes } from "@/core/engines/behavior/calculateBehaviorIndexes";
import { scoreAssessment } from "@/core/engines/scoring/scoreAssessment";
import { selectInsights } from "@/core/engines/insight/selectInsights";
import type { Answer } from "@/core/domain/answer";
import type { Assessment } from "@/core/domain/assessment";
import type { ArchetypeProfile } from "@/core/domain/archetypeProfile";
import type { ArchetypeReferenceProfile } from "@/core/domain/archetypeReferenceProfile";
import type { BehaviorIndex } from "@/core/domain/behaviorIndex";
import type { EvolutionPlan } from "@/core/domain/evolutionPlan";
import type { Insight } from "@/core/domain/insight";
import type { Mission } from "@/core/domain/mission";
import type { Resource } from "@/core/domain/resource";
import {
  AssessmentStatus,
  ConfidenceLevel,
  Difficulty,
  Language,
  Priority,
  ResourceType,
} from "@/core/types/enums";

function fixtureAssessment(): Assessment {
  return {
    id: "fixture",
    slug: "fixture",
    name: "Fixture",
    description: "",
    version: "1.0",
    language: Language.ptBR,
    status: AssessmentStatus.Active,
    estimatedTime: 1,
    dimensions: [],
    questions: [],
  };
}

function fixtureBehaviorIndex(dimensionId: string): BehaviorIndex {
  return {
    id: `behavior_index_${dimensionId}`,
    dimensionId,
    rawScore: 50,
    normalizedScore: 50,
    confidence: 100,
  };
}

function fixtureArchetypeResolverOutput(
  archetypeId: string,
  confidence = 80,
): ArchetypeResolverOutput {
  return {
    archetypeId,
    confidence,
    confidenceLevel: ConfidenceLevel.High,
    distances: [{ archetypeId, distance: 10 }],
  };
}

function fixtureReferenceProfile(archetypeId: string): ArchetypeReferenceProfile {
  return {
    id: archetypeId,
    slug: `${archetypeId}-slug`,
    name: `${archetypeId} name`,
    referenceProfile: { dim: 50 },
  };
}

function fixtureProfile(archetypeId: string): ArchetypeProfile {
  return {
    archetypeId,
    summary: `${archetypeId} summary`,
    description: `${archetypeId} description`,
    strengths: [`${archetypeId} strength`],
    attentionPoints: [`${archetypeId} attention`],
  };
}

function fixtureEvolutionPlan(missions: string[], resources: string[]): EvolutionPlan {
  return {
    id: "evolution_plan_fixture",
    firstStep: "Primeiro passo.",
    habits: ["Hábito."],
    missions,
    resources,
    estimatedDuration: 7,
    difficulty: Difficulty.Easy,
  };
}

function fixtureMission(id: string): Mission {
  return {
    id,
    title: id,
    description: "",
    goal: id,
    difficulty: Difficulty.Easy,
    estimatedTime: 5,
    steps: [],
    expectedOutcome: id,
  };
}

function fixtureResource(id: string): Resource {
  return {
    id,
    type: ResourceType.Article,
    title: id,
    description: "",
    estimatedTime: 5,
    tags: [],
  };
}

function fixtureInsight(id: string): Insight {
  return {
    id,
    indicatorId: "any",
    priority: Priority.High,
    title: id,
    description: id,
    recommendation: id,
  };
}

describe("buildAssessmentResult", () => {
  it("builds a complete AssessmentResult, resolving archetype content, missions and resources", () => {
    const { assessmentResult } = buildAssessmentResult({
      assessment: fixtureAssessment(),
      behaviorIndexes: [fixtureBehaviorIndex("initiative")],
      archetypeResolverOutput: fixtureArchetypeResolverOutput("executor_under_pressure", 80),
      archetypeReferenceProfiles: [fixtureReferenceProfile("executor_under_pressure")],
      archetypeProfiles: [fixtureProfile("executor_under_pressure")],
      insights: [fixtureInsight("insight_a")],
      predominantIndicatorIds: ["initiative_start"],
      evolutionPlan: fixtureEvolutionPlan(["mission_valid"], ["resource_valid"]),
      missionLibrary: [fixtureMission("mission_valid")],
      resourceLibrary: [fixtureResource("resource_valid")],
    });

    expect(assessmentResult.behaviorArchetype.id).toBe("executor_under_pressure");
    expect(assessmentResult.behaviorArchetype.slug).toBe("executor_under_pressure-slug");
    expect(assessmentResult.behaviorArchetype.name).toBe("executor_under_pressure name");
    expect(assessmentResult.behaviorArchetype.summary).toBe("executor_under_pressure summary");
    expect(assessmentResult.behaviorArchetype.confidence).toBe(80);
    expect(assessmentResult.strengths).toEqual(["executor_under_pressure strength"]);
    expect(assessmentResult.attentionPoints).toEqual(["executor_under_pressure attention"]);
    expect(assessmentResult.missions.map((m) => m.id)).toEqual(["mission_valid"]);
    expect(assessmentResult.resources.map((r) => r.id)).toEqual(["resource_valid"]);
  });

  it("reuses predominantIndicatorIds directly as matchedIndicators, without recalculating (DEC-0012)", () => {
    const { assessmentResult } = buildAssessmentResult({
      assessment: fixtureAssessment(),
      behaviorIndexes: [],
      archetypeResolverOutput: fixtureArchetypeResolverOutput("strategic_refiner"),
      archetypeReferenceProfiles: [fixtureReferenceProfile("strategic_refiner")],
      archetypeProfiles: [fixtureProfile("strategic_refiner")],
      insights: [],
      predominantIndicatorIds: ["planning_prioritization", "consistency_completion"],
      evolutionPlan: fixtureEvolutionPlan([], []),
      missionLibrary: [],
      resourceLibrary: [],
    });

    expect(assessmentResult.behaviorArchetype.matchedIndicators).toEqual([
      "planning_prioritization",
      "consistency_completion",
    ]);
  });

  it("passes evolutionPlan through unchanged", () => {
    const plan = fixtureEvolutionPlan(["mission_valid"], []);

    const { assessmentResult } = buildAssessmentResult({
      assessment: fixtureAssessment(),
      behaviorIndexes: [],
      archetypeResolverOutput: fixtureArchetypeResolverOutput("analytical_explorer"),
      archetypeReferenceProfiles: [fixtureReferenceProfile("analytical_explorer")],
      archetypeProfiles: [fixtureProfile("analytical_explorer")],
      insights: [],
      predominantIndicatorIds: [],
      evolutionPlan: plan,
      missionLibrary: [fixtureMission("mission_valid")],
      resourceLibrary: [],
    });

    expect(assessmentResult.evolutionPlan).toEqual(plan);
  });

  it("filters out mission/resource ids from the plan that are not present in the provided libraries (partial content)", () => {
    const { assessmentResult } = buildAssessmentResult({
      assessment: fixtureAssessment(),
      behaviorIndexes: [],
      archetypeResolverOutput: fixtureArchetypeResolverOutput("priority_accumulator"),
      archetypeReferenceProfiles: [fixtureReferenceProfile("priority_accumulator")],
      archetypeProfiles: [fixtureProfile("priority_accumulator")],
      insights: [],
      predominantIndicatorIds: [],
      evolutionPlan: fixtureEvolutionPlan(
        ["mission_valid", "mission_missing"],
        ["resource_missing"],
      ),
      missionLibrary: [fixtureMission("mission_valid")],
      resourceLibrary: [],
    });

    expect(assessmentResult.missions.map((m) => m.id)).toEqual(["mission_valid"]);
    expect(assessmentResult.resources).toEqual([]);
  });

  it("stubs report with the documented default template, assessment language, and a generatedAt timestamp", () => {
    const before = new Date();
    const { assessmentResult } = buildAssessmentResult({
      assessment: { ...fixtureAssessment(), language: Language.ptBR },
      behaviorIndexes: [],
      archetypeResolverOutput: fixtureArchetypeResolverOutput("executor_under_pressure"),
      archetypeReferenceProfiles: [fixtureReferenceProfile("executor_under_pressure")],
      archetypeProfiles: [fixtureProfile("executor_under_pressure")],
      insights: [],
      predominantIndicatorIds: [],
      evolutionPlan: fixtureEvolutionPlan([], []),
      missionLibrary: [],
      resourceLibrary: [],
    });
    const after = new Date();

    expect(assessmentResult.report.template).toBe("assessment-default-v1");
    expect(assessmentResult.report.language).toBe(Language.ptBR);
    expect(assessmentResult.report.downloadUrl).toBeUndefined();
    expect(assessmentResult.report.generatedAt.getTime()).toBeGreaterThanOrEqual(before.getTime());
    expect(assessmentResult.report.generatedAt.getTime()).toBeLessThanOrEqual(after.getTime());
    expect(assessmentResult.generatedAt).toEqual(assessmentResult.report.generatedAt);
  });

  it("never includes a top-level confidenceScore field (DEC-0012)", () => {
    const { assessmentResult } = buildAssessmentResult({
      assessment: fixtureAssessment(),
      behaviorIndexes: [],
      archetypeResolverOutput: fixtureArchetypeResolverOutput("executor_under_pressure"),
      archetypeReferenceProfiles: [fixtureReferenceProfile("executor_under_pressure")],
      archetypeProfiles: [fixtureProfile("executor_under_pressure")],
      insights: [],
      predominantIndicatorIds: [],
      evolutionPlan: fixtureEvolutionPlan([], []),
      missionLibrary: [],
      resourceLibrary: [],
    });

    expect(assessmentResult).not.toHaveProperty("confidenceScore");
    expect(Object.keys(assessmentResult).sort()).toEqual(
      [
        "assessment",
        "behaviorIndexes",
        "behaviorArchetype",
        "insights",
        "strengths",
        "attentionPoints",
        "evolutionPlan",
        "missions",
        "resources",
        "report",
        "generatedAt",
      ].sort(),
    );
  });

  it("does not mutate any of its inputs", () => {
    const behaviorIndexes = [fixtureBehaviorIndex("initiative")];
    const referenceProfiles = [fixtureReferenceProfile("executor_under_pressure")];
    const profiles = [fixtureProfile("executor_under_pressure")];
    const insights = [fixtureInsight("insight_a")];
    const predominantIndicatorIds = ["initiative_start"];
    const evolutionPlan = fixtureEvolutionPlan(["mission_valid"], ["resource_valid"]);
    const missionLibrary = [fixtureMission("mission_valid")];
    const resourceLibrary = [fixtureResource("resource_valid")];
    const assessment = fixtureAssessment();

    const snapshotBefore = JSON.stringify({
      assessment,
      behaviorIndexes,
      referenceProfiles,
      profiles,
      insights,
      predominantIndicatorIds,
      evolutionPlan,
      missionLibrary,
      resourceLibrary,
    });

    buildAssessmentResult({
      assessment,
      behaviorIndexes,
      archetypeResolverOutput: fixtureArchetypeResolverOutput("executor_under_pressure"),
      archetypeReferenceProfiles: referenceProfiles,
      archetypeProfiles: profiles,
      insights,
      predominantIndicatorIds,
      evolutionPlan,
      missionLibrary,
      resourceLibrary,
    });

    const snapshotAfter = JSON.stringify({
      assessment,
      behaviorIndexes,
      referenceProfiles,
      profiles,
      insights,
      predominantIndicatorIds,
      evolutionPlan,
      missionLibrary,
      resourceLibrary,
    });

    expect(snapshotAfter).toBe(snapshotBefore);
  });

  it("handles empty/partial content gracefully: unknown archetype produces empty slug/name/summary/strengths/attentionPoints (boundary)", () => {
    const { assessmentResult } = buildAssessmentResult({
      assessment: fixtureAssessment(),
      behaviorIndexes: [],
      archetypeResolverOutput: fixtureArchetypeResolverOutput("unknown_archetype"),
      archetypeReferenceProfiles: [],
      archetypeProfiles: [],
      insights: [],
      predominantIndicatorIds: [],
      evolutionPlan: fixtureEvolutionPlan([], []),
      missionLibrary: [],
      resourceLibrary: [],
    });

    expect(assessmentResult.behaviorArchetype.id).toBe("unknown_archetype");
    expect(assessmentResult.behaviorArchetype.slug).toBe("");
    expect(assessmentResult.behaviorArchetype.name).toBe("");
    expect(assessmentResult.behaviorArchetype.summary).toBe("");
    expect(assessmentResult.strengths).toEqual([]);
    expect(assessmentResult.attentionPoints).toEqual([]);
  });

  it("runs end-to-end with the real MVP pipeline: Score -> Behavior -> Archetype -> Insight -> Evolution -> Result Builder", () => {
    function answer(questionId: string, alternativeId: string): Answer {
      return { questionId, alternativeId, answeredAt: new Date("2026-08-12T00:00:00Z") };
    }

    const answers = realAssessment.questions.map((question) => answer(question.id, "A"));
    const { indicatorScores } = scoreAssessment({ assessment: realAssessment, answers });
    const { behaviorIndexes } = calculateBehaviorIndexes({
      indicatorScores,
      dimensions: realDimensions,
      indicators: realIndicators,
    });
    const archetypeResolverOutput = resolveArchetype({
      behaviorIndexes,
      archetypeProfiles: realArchetypeReferenceProfiles,
      dimensions: realDimensions,
    });
    const { insights, predominantIndicatorIds } = selectInsights({
      archetypeId: archetypeResolverOutput.archetypeId,
      indicators: realIndicators,
      dimensions: realDimensions,
      indicatorScores,
      insightLibrary: realInsights,
    });
    const { evolutionPlan } = buildEvolutionPlan({
      archetypeId: archetypeResolverOutput.archetypeId,
      archetypeEvolutionContent: realArchetypeEvolutionContent,
      missionLibrary: realMissions,
      resourceLibrary: realResources,
      behaviorIndexes,
      insights,
    });

    const { assessmentResult } = buildAssessmentResult({
      assessment: realAssessment,
      behaviorIndexes,
      archetypeResolverOutput,
      archetypeReferenceProfiles: realArchetypeReferenceProfiles,
      archetypeProfiles: realArchetypeProfiles,
      insights,
      predominantIndicatorIds,
      evolutionPlan,
      missionLibrary: realMissions,
      resourceLibrary: realResources,
    });

    expect(assessmentResult.assessment).toBe(realAssessment);
    expect(assessmentResult.behaviorIndexes).toHaveLength(5);
    expect(realArchetypeReferenceProfiles.map((a) => a.id)).toContain(
      assessmentResult.behaviorArchetype.id,
    );
    expect(assessmentResult.behaviorArchetype.summary.length).toBeGreaterThan(0);
    expect(assessmentResult.strengths.length).toBeGreaterThan(0);
    expect(assessmentResult.attentionPoints.length).toBeGreaterThan(0);
    expect(assessmentResult.behaviorArchetype.matchedIndicators).toEqual(predominantIndicatorIds);
    expect(assessmentResult.evolutionPlan).toBe(evolutionPlan);
    expect(assessmentResult.report.template).toBe("assessment-default-v1");
    expect(assessmentResult.generatedAt).toBeInstanceOf(Date);
    expect(assessmentResult).not.toHaveProperty("confidenceScore");
  });
});
