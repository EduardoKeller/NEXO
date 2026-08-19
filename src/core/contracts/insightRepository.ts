import type { Insight } from "@/core/domain/insight";

/**
 * Contrato de leitura para Insight (12B_ARCHITECTURE_PATTERNS.md,
 * Seção 14 — Repository Pattern). Somente leitura nesta etapa.
 */
export interface InsightRepository {
  findAll(): Promise<Insight[]>;
}
