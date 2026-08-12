/**
 * 07_DATA_MODEL.md, Seção 12.
 * `matchedIndicators` = `predominantIndicatorIds` da Insight Engine
 * nesta versão (DEC-0012, resolvendo a pendência de DEC-0009).
 */
export interface BehaviorArchetype {
  id: string;
  slug: string;
  name: string;
  summary: string;
  confidence: number;
  matchedIndicators: string[];
}
