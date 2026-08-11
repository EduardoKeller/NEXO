import { describe, expect, it } from "vitest";

import { archetypeReferenceProfiles } from "@/core/content/archetypeReferenceProfiles";
import { dimensions } from "@/core/content/dimensions";

describe("core/content archetypeReferenceProfiles referential integrity", () => {
  it("has exactly 4 official archetypes", () => {
    expect(archetypeReferenceProfiles).toHaveLength(4);
  });

  it("every archetype's referenceProfile covers exactly the 5 official dimensions", () => {
    const dimensionIds = dimensions.map((dimension) => dimension.id).sort();

    for (const archetype of archetypeReferenceProfiles) {
      expect(Object.keys(archetype.referenceProfile).sort()).toEqual(dimensionIds);
    }
  });

  it("keeps every reference value within the official 0-100 range", () => {
    for (const archetype of archetypeReferenceProfiles) {
      for (const value of Object.values(archetype.referenceProfile)) {
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(100);
      }
    }
  });
});
