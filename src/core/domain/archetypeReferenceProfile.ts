/**
 * Tipo mínimo de conteúdo para a Archetype Resolver — apenas o que a
 * fórmula de distância (06_ASSESSMENT_ENGINE.md, Seção 9; DEC-0003)
 * precisa. Distinto da estrutura completa da Archetype Library
 * (05_CONTENT_LIBRARY.md, Seção 17 — summary, strengths, first_step
 * etc., ainda não carregados em core/content/) e de `BehaviorArchetype`
 * (07_DATA_MODEL.md, Seção 12 — saída final, não dado de referência).
 */
export interface ArchetypeReferenceProfile {
  id: string;
  slug: string;
  name: string;
  /** dimensionId -> valor de referência (0-100). */
  referenceProfile: Record<string, number>;
}
