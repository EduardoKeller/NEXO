/**
 * 07_DATA_MODEL.md, Seção 11.
 *
 * Usa `rawScore` (não `score`) e inclui `id`, seguindo 07_DATA_MODEL.md
 * como fonte autoritativa — 07B_API_CONTRACTS.md, Seção 8, diverge
 * nesses dois pontos para a mesma entidade (ver DEC-0008).
 */
export interface BehaviorIndex {
  id: string;
  dimensionId: string;
  rawScore: number;
  normalizedScore: number;
  confidence: number;
}
