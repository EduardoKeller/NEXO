import type { ResourceType } from "@/core/types/enums";

/**
 * 07_DATA_MODEL.md, Seção 16.
 */
export interface Resource {
  id: string;
  type: ResourceType;
  title: string;
  description: string;
  estimatedTime: number;
  url?: string;
  tags: string[];
}
