import type { Dimension } from "@/core/domain/dimension";

/**
 * Contrato de leitura para Dimension (12B_ARCHITECTURE_PATTERNS.md,
 * Seção 14 — Repository Pattern; DEC-0004 — contratos vivem em
 * core/contracts/, implementações em infrastructure/repositories/).
 * Somente leitura nesta etapa — sem create/update/delete.
 */
export interface DimensionRepository {
  findAll(): Promise<Dimension[]>;
}
