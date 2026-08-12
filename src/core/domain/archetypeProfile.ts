/**
 * Conteúdo textual de cada Arquétipo (05_CONTENT_LIBRARY.md, Seção 17
 * — summary, description, strengths, attention_points). Distinto de
 * `ArchetypeReferenceProfile` (dado numérico, usado pela Archetype
 * Resolver) e de `ArchetypeEvolutionContent` (usado pela Evolution
 * Engine) — mesma entidade de conteúdo, terceiro aspecto (DEC-0012).
 */
export interface ArchetypeProfile {
  archetypeId: string;
  summary: string;
  description: string;
  strengths: string[];
  attentionPoints: string[];
}
