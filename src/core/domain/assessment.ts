import type { Dimension } from "@/core/domain/dimension";
import type { Question } from "@/core/domain/question";
import type { AssessmentStatus } from "@/core/types/enums";

/**
 * 07_DATA_MODEL.md, Seção 5.
 *
 * `status` usa `AssessmentStatus` (Seção 27), não o `Status` genérico
 * declarado no corpo original da Seção 5 — correção de tipagem: o
 * dado real da Content Library (`status: Active`) só existe em
 * `AssessmentStatus`, e a própria Seção 27 descreve esse enum como
 * "o estado de uma Assessment".
 */
export interface Assessment {
  id: string;
  slug: string;
  name: string;
  description: string;
  version: string;
  language: string;
  status: AssessmentStatus;
  estimatedTime: number;
  questions: Question[];
  dimensions: Dimension[];
}
