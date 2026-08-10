import type { Alternative } from "@/core/domain/alternative";

/**
 * 07_DATA_MODEL.md, Seção 6.
 */
export interface Question {
  id: string;
  title: string;
  description?: string;
  dimensionId: string;
  primaryIndicatorId: string;
  secondaryIndicatorIds: string[];
  weight: number;
  alternatives: Alternative[];
}
