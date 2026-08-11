import type { ArchetypeReferenceProfile } from "@/core/domain/archetypeReferenceProfile";

/**
 * 05_CONTENT_LIBRARY.md, Seção 17 (Archetype Library).
 * `reference_profile` já é 100% oficial — calibração v1.0 aprovada em
 * DEC-0003, não faz parte da calibração v0.1 (DEC-0007).
 */
export const archetypeReferenceProfiles: ArchetypeReferenceProfile[] = [
  {
    id: "executor_under_pressure",
    slug: "executor-under-pressure",
    name: "Executor Sob Pressão",
    referenceProfile: {
      initiative: 20,
      planning: 50,
      pressure: 80,
      distraction: 50,
      consistency: 20,
    },
  },
  {
    id: "strategic_refiner",
    slug: "strategic-refiner",
    name: "Refinador Estratégico",
    referenceProfile: {
      initiative: 20,
      planning: 80,
      pressure: 50,
      distraction: 50,
      consistency: 50,
    },
  },
  {
    id: "analytical_explorer",
    slug: "analytical-explorer",
    name: "Explorador Analítico",
    referenceProfile: {
      initiative: 20,
      planning: 50,
      pressure: 50,
      distraction: 20,
      consistency: 50,
    },
  },
  {
    id: "priority_accumulator",
    slug: "priority-accumulator",
    name: "Acumulador de Prioridades",
    referenceProfile: {
      initiative: 80,
      planning: 20,
      pressure: 50,
      distraction: 20,
      consistency: 20,
    },
  },
];
