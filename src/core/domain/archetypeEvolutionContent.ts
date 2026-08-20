/**
 * Conteúdo de evolução embutido em cada entrada de Arquétipo
 * (05_CONTENT_LIBRARY.md, Seção 17 — first_step, recommended_habits,
 * recommended_missions, recommended_resources). Distinto de
 * `ArchetypeReferenceProfile` (usado pela Archetype Resolver para o
 * cálculo de distância) — mesma entidade de conteúdo, aspecto diferente.
 */
export interface ArchetypeEvolutionContent {
  archetypeId: string;
  firstStep: string;
  recommendedHabits: string[];
  recommendedMissionIds: string[];
  recommendedResourceIds: string[];
}
