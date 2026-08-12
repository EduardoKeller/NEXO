import { describe, expect, it } from "vitest";

import { archetypeEvolutionContent as realArchetypeEvolutionContent } from "@/core/content/archetypeEvolutionContent";
import { missions as realMissions } from "@/core/content/missions";
import { resources as realResources } from "@/core/content/resources";
import { buildEvolutionPlan } from "@/core/engines/evolution/buildEvolutionPlan";
import type { ArchetypeEvolutionContent } from "@/core/domain/archetypeEvolutionContent";
import type { BehaviorIndex } from "@/core/domain/behaviorIndex";
import type { Insight } from "@/core/domain/insight";
import type { Mission } from "@/core/domain/mission";
import type { Resource } from "@/core/domain/resource";
import { Difficulty, Priority, ResourceType } from "@/core/types/enums";

function mission(id: string): Mission {
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

function resource(id: string): Resource {
  return {
    id,
    type: ResourceType.Article,
    title: id,
    description: "",
    estimatedTime: 5,
    tags: [],
  };
}

function behaviorIndex(dimensionId: string): BehaviorIndex {
  return {
    id: `behavior_index_${dimensionId}`,
    dimensionId,
    rawScore: 50,
    normalizedScore: 50,
    confidence: 100,
  };
}

function insight(id: string): Insight {
  return {
    id,
    indicatorId: "any",
    priority: Priority.High,
    title: id,
    description: id,
    recommendation: id,
  };
}

const FULL_CONTENT: ArchetypeEvolutionContent = {
  archetypeId: "full",
  firstStep: "Faça a primeira coisa.",
  recommendedHabits: ["Hábito 1.", "Hábito 2."],
  recommendedMissionIds: ["mission_valid"],
  recommendedResourceIds: ["resource_valid"],
};

const EMPTY_CONTENT: ArchetypeEvolutionContent = {
  archetypeId: "empty",
  firstStep: "Só o primeiro passo.",
  recommendedHabits: [],
  recommendedMissionIds: [],
  recommendedResourceIds: [],
};

const BROKEN_REFERENCES_CONTENT: ArchetypeEvolutionContent = {
  archetypeId: "broken",
  firstStep: "Primeiro passo com referências quebradas.",
  recommendedHabits: ["Hábito válido."],
  recommendedMissionIds: ["mission_does_not_exist"],
  recommendedResourceIds: ["resource_does_not_exist"],
};

describe("buildEvolutionPlan", () => {
  it("builds a complete plan when the archetype has habits, missions and resources that all resolve", () => {
    const { evolutionPlan } = buildEvolutionPlan({
      archetypeId: "full",
      archetypeEvolutionContent: [FULL_CONTENT],
      missionLibrary: [mission("mission_valid")],
      resourceLibrary: [resource("resource_valid")],
      behaviorIndexes: [],
      insights: [],
    });

    expect(evolutionPlan.firstStep).toBe("Faça a primeira coisa.");
    expect(evolutionPlan.habits).toEqual(["Hábito 1.", "Hábito 2."]);
    expect(evolutionPlan.missions).toEqual(["mission_valid"]);
    expect(evolutionPlan.resources).toEqual(["resource_valid"]);
  });

  it("produces empty habits/missions/resources for an archetype without evolution content, keeping only firstStep", () => {
    const { evolutionPlan } = buildEvolutionPlan({
      archetypeId: "empty",
      archetypeEvolutionContent: [EMPTY_CONTENT],
      missionLibrary: [],
      resourceLibrary: [],
      behaviorIndexes: [],
      insights: [],
    });

    expect(evolutionPlan.firstStep).toBe("Só o primeiro passo.");
    expect(evolutionPlan.habits).toEqual([]);
    expect(evolutionPlan.missions).toEqual([]);
    expect(evolutionPlan.resources).toEqual([]);
  });

  it("silently filters out mission/resource ids that do not exist in the library", () => {
    const { evolutionPlan } = buildEvolutionPlan({
      archetypeId: "broken",
      archetypeEvolutionContent: [BROKEN_REFERENCES_CONTENT],
      missionLibrary: [mission("some_other_mission")],
      resourceLibrary: [resource("some_other_resource")],
      behaviorIndexes: [],
      insights: [],
    });

    // hábito (texto livre) não depende de lookup, permanece
    expect(evolutionPlan.habits).toEqual(["Hábito válido."]);
    // missão/recurso referenciados não existem -> filtrados, sem erro
    expect(evolutionPlan.missions).toEqual([]);
    expect(evolutionPlan.resources).toEqual([]);
  });

  it("selects exclusively by the winning archetype: behaviorIndexes and insights never change the output", () => {
    const base = {
      archetypeId: "full",
      archetypeEvolutionContent: [FULL_CONTENT],
      missionLibrary: [mission("mission_valid")],
      resourceLibrary: [resource("resource_valid")],
    };

    const resultWithEmptyInputs = buildEvolutionPlan({
      ...base,
      behaviorIndexes: [],
      insights: [],
    });
    const resultWithPopulatedInputs = buildEvolutionPlan({
      ...base,
      behaviorIndexes: [behaviorIndex("initiative"), behaviorIndex("consistency")],
      insights: [insight("insight_a"), insight("insight_b")],
    });

    expect(resultWithEmptyInputs).toEqual(resultWithPopulatedInputs);
  });

  it("preserves firstStep exactly as documented for the archetype", () => {
    const { evolutionPlan } = buildEvolutionPlan({
      archetypeId: "full",
      archetypeEvolutionContent: [FULL_CONTENT],
      missionLibrary: [],
      resourceLibrary: [],
      behaviorIndexes: [],
      insights: [],
    });

    expect(evolutionPlan.firstStep).toBe(FULL_CONTENT.firstStep);
  });

  it("never includes exercise or checklist fields (strictly 07_DATA_MODEL.md, per DEC-0011)", () => {
    const { evolutionPlan } = buildEvolutionPlan({
      archetypeId: "full",
      archetypeEvolutionContent: [FULL_CONTENT],
      missionLibrary: [mission("mission_valid")],
      resourceLibrary: [resource("resource_valid")],
      behaviorIndexes: [],
      insights: [],
    });

    expect(Object.keys(evolutionPlan).sort()).toEqual(
      [
        "id",
        "firstStep",
        "habits",
        "missions",
        "resources",
        "estimatedDuration",
        "difficulty",
      ].sort(),
    );
    expect(evolutionPlan).not.toHaveProperty("exercise");
    expect(evolutionPlan).not.toHaveProperty("checklist");
  });

  it("always uses the MVP-fixed difficulty (Easy) and duration (7 days)", () => {
    const { evolutionPlan } = buildEvolutionPlan({
      archetypeId: "empty",
      archetypeEvolutionContent: [EMPTY_CONTENT],
      missionLibrary: [],
      resourceLibrary: [],
      behaviorIndexes: [],
      insights: [],
    });

    expect(evolutionPlan.difficulty).toBe(Difficulty.Easy);
    expect(evolutionPlan.estimatedDuration).toBe(7);
  });

  it("defensively returns an empty plan when archetypeId matches no known archetype (invalid input)", () => {
    const { evolutionPlan } = buildEvolutionPlan({
      archetypeId: "unknown_archetype",
      archetypeEvolutionContent: [FULL_CONTENT, EMPTY_CONTENT],
      missionLibrary: [mission("mission_valid")],
      resourceLibrary: [resource("resource_valid")],
      behaviorIndexes: [],
      insights: [],
    });

    expect(evolutionPlan.firstStep).toBe("");
    expect(evolutionPlan.habits).toEqual([]);
    expect(evolutionPlan.missions).toEqual([]);
    expect(evolutionPlan.resources).toEqual([]);
  });

  it("handles empty mission/resource libraries without crashing (boundary)", () => {
    const { evolutionPlan } = buildEvolutionPlan({
      archetypeId: "full",
      archetypeEvolutionContent: [FULL_CONTENT],
      missionLibrary: [],
      resourceLibrary: [],
      behaviorIndexes: [],
      insights: [],
    });

    expect(evolutionPlan.missions).toEqual([]);
    expect(evolutionPlan.resources).toEqual([]);
  });

  it("runs end-to-end with the real MVP content for all 4 archetypes", () => {
    for (const archetype of realArchetypeEvolutionContent) {
      const { evolutionPlan } = buildEvolutionPlan({
        archetypeId: archetype.archetypeId,
        archetypeEvolutionContent: realArchetypeEvolutionContent,
        missionLibrary: realMissions,
        resourceLibrary: realResources,
        behaviorIndexes: [],
        insights: [],
      });

      expect(evolutionPlan.firstStep).toBe(archetype.firstStep);
      expect(evolutionPlan.difficulty).toBe(Difficulty.Easy);
      expect(evolutionPlan.estimatedDuration).toBe(7);
    }

    // Executor Sob Pressão: hábitos existem (texto livre), mas as
    // referências de missão/recurso são quebradas -> filtradas.
    const { evolutionPlan: executorPlan } = buildEvolutionPlan({
      archetypeId: "executor_under_pressure",
      archetypeEvolutionContent: realArchetypeEvolutionContent,
      missionLibrary: realMissions,
      resourceLibrary: realResources,
      behaviorIndexes: [],
      insights: [],
    });
    expect(executorPlan.habits).toEqual(["Planejamento diário.", "Revisão semanal."]);
    expect(executorPlan.missions).toEqual([]);
    expect(executorPlan.resources).toEqual([]);

    // Refinador Estratégico: sem hábitos/missões/recursos documentados.
    const { evolutionPlan: refinerPlan } = buildEvolutionPlan({
      archetypeId: "strategic_refiner",
      archetypeEvolutionContent: realArchetypeEvolutionContent,
      missionLibrary: realMissions,
      resourceLibrary: realResources,
      behaviorIndexes: [],
      insights: [],
    });
    expect(refinerPlan.habits).toEqual([]);
    expect(refinerPlan.missions).toEqual([]);
    expect(refinerPlan.resources).toEqual([]);
  });
});
