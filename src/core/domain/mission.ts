import type { Difficulty } from "@/core/types/enums";

/**
 * 07_DATA_MODEL.md, Seção 15.
 */
export interface Mission {
  id: string;
  title: string;
  description: string;
  goal: string;
  difficulty: Difficulty;
  estimatedTime: number;
  steps: string[];
  expectedOutcome: string;
}
