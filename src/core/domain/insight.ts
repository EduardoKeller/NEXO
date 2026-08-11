import type { Priority } from "@/core/types/enums";

/**
 * 07_DATA_MODEL.md, Seção 13.
 */
export interface Insight {
  id: string;
  indicatorId: string;
  priority: Priority;
  title: string;
  description: string;
  recommendation: string;
}
