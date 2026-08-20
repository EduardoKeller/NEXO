import type { Difficulty } from "@/core/types/enums";

/**
 * 07_DATA_MODEL.md, Seção 14. Segue estritamente esta interface —
 * sem `exercise`/`checklist` (DEC-0011).
 */
export interface EvolutionPlan {
  id: string;
  firstStep: string;
  habits: string[];
  missions: string[];
  resources: string[];
  estimatedDuration: number;
  difficulty: Difficulty;
}
