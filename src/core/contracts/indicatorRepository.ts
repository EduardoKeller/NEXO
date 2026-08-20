import type { Indicator } from "@/core/domain/indicator";

/**
 * Contrato de leitura para Indicator (12B_ARCHITECTURE_PATTERNS.md,
 * Seção 14 — Repository Pattern). Somente leitura nesta etapa.
 */
export interface IndicatorRepository {
  findAll(): Promise<Indicator[]>;
}
