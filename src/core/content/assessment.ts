import { dimensions } from "@/core/content/dimensions";
import { questions } from "@/core/content/questions";
import type { Assessment } from "@/core/domain/assessment";
import { AssessmentStatus, Language } from "@/core/types/enums";

/**
 * 05_CONTENT_LIBRARY.md, Seção 13 (Assessment Oficial do MVP).
 * Único Assessment do MVP — 100% oficial, nenhum valor de calibração v0.1.
 */
export const assessment: Assessment = {
  id: "assessment_procrastination_v1",
  slug: "procrastination-assessment",
  name: "Avaliação de Padrões de Produtividade",
  description:
    "Avaliação destinada a identificar padrões comportamentais relacionados à execução, organização, planejamento e consistência.",
  version: "1.0",
  language: Language.ptBR,
  status: AssessmentStatus.Active,
  estimatedTime: 3,
  questions,
  dimensions,
};
