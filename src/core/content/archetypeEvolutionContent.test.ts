import { describe, expect, it } from "vitest";

import { archetypeEvolutionContent } from "@/core/content/archetypeEvolutionContent";
import { archetypeReferenceProfiles } from "@/core/content/archetypeReferenceProfiles";
import { missions } from "@/core/content/missions";
import { resources } from "@/core/content/resources";

describe("core/content archetypeEvolutionContent referential integrity", () => {
  it("has exactly one evolution content entry per official archetype", () => {
    expect(archetypeEvolutionContent).toHaveLength(4);
    expect(archetypeEvolutionContent.map((item) => item.archetypeId).sort()).toEqual(
      archetypeReferenceProfiles.map((archetype) => archetype.id).sort(),
    );
  });

  it("every archetype has a non-empty firstStep", () => {
    for (const item of archetypeEvolutionContent) {
      expect(item.firstStep.length).toBeGreaterThan(0);
    }
  });

  it("documents the known content gaps as of DEC-0011: only executor_under_pressure has habits/missions/resources", () => {
    const withContent = archetypeEvolutionContent.filter(
      (item) =>
        item.recommendedHabits.length > 0 ||
        item.recommendedMissionIds.length > 0 ||
        item.recommendedResourceIds.length > 0,
    );

    expect(withContent.map((item) => item.archetypeId)).toEqual(["executor_under_pressure"]);
  });

  it("documents the known broken references as of DEC-0011: mission_deadline and article_deadlines do not exist", () => {
    const missionIds = new Set(missions.map((mission) => mission.id));
    const resourceIds = new Set(resources.map((resource) => resource.id));

    expect(missionIds.has("mission_deadline")).toBe(false);
    expect(resourceIds.has("article_deadlines")).toBe(false);
  });
});
