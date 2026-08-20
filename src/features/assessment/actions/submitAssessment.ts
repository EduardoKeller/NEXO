"use server";

import { assessment } from "@/core/content/assessment";
import { runAssessment } from "@/core/engines/assessment/runAssessment";
import {
  toCoreAnswers,
  toFeatureErrors,
  toFeatureResult,
} from "@/features/assessment/utils/assessmentAdapter";
import type { Answer, SubmitAssessmentOutput } from "@/features/assessment/types/assessment";

/**
 * Caso de uso SubmitAssessment (12B_ARCHITECTURE_PATTERNS.md, Seção 16).
 * Apenas orquestra: converte respostas via Adapter, chama a Assessment
 * Engine oficial e converte a saída de volta para o modelo da Feature.
 * Nenhuma regra de negócio vive aqui.
 */
export async function submitAssessment(answers: Answer[]): Promise<SubmitAssessmentOutput> {
  const coreAnswers = toCoreAnswers(answers);
  const output = runAssessment({ assessment, answers: coreAnswers });

  if (!output.valid) {
    return { valid: false, errors: toFeatureErrors(output.errors) };
  }

  return { valid: true, result: toFeatureResult(output.assessmentResult) };
}
