import { describe, expect, it } from "vitest";

import { archetypeProfiles } from "@/core/content/archetypeProfiles";
import { archetypeReferenceProfiles } from "@/core/content/archetypeReferenceProfiles";

describe("core/content archetypeProfiles referential integrity", () => {
  it("has exactly one profile per official archetype", () => {
    expect(archetypeProfiles).toHaveLength(4);
    expect(archetypeProfiles.map((profile) => profile.archetypeId).sort()).toEqual(
      archetypeReferenceProfiles.map((archetype) => archetype.id).sort(),
    );
  });

  it("every archetype has non-empty summary and description", () => {
    for (const profile of archetypeProfiles) {
      expect(profile.summary.length).toBeGreaterThan(0);
      expect(profile.description.length).toBeGreaterThan(0);
    }
  });

  it("every archetype has at least one strength and one attention point", () => {
    for (const profile of archetypeProfiles) {
      expect(profile.strengths.length).toBeGreaterThan(0);
      expect(profile.attentionPoints.length).toBeGreaterThan(0);
    }
  });
});
