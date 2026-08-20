import { archetypeEvolutionContent } from "@/core/content/archetypeEvolutionContent";
import { archetypeProfiles } from "@/core/content/archetypeProfiles";
import { archetypeReferenceProfiles } from "@/core/content/archetypeReferenceProfiles";
import { indicators } from "@/core/content/indicators";
import { insights as insightLibrary } from "@/core/content/insights";
import { missions } from "@/core/content/missions";
import { resources } from "@/core/content/resources";
import type { Answer } from "@/core/domain/answer";
import type { Assessment } from "@/core/domain/assessment";
import type { AssessmentResult } from "@/core/domain/assessmentResult";
import { resolveArchetype } from "@/core/engines/archetype/resolveArchetype";
import { calculateBehaviorIndexes } from "@/core/engines/behavior/calculateBehaviorIndexes";
import { buildEvolutionPlan } from "@/core/engines/evolution/buildEvolutionPlan";
import { selectInsights } from "@/core/engines/insight/selectInsights";
import { buildAssessmentResult } from "@/core/engines/resultBuilder/buildAssessmentResult";
import { scoreAssessment } from "@/core/engines/scoring/scoreAssessment";
import { validateAssessment } from "@/core/engines/validation/validateAssessment";
import type { DomainError } from "@/core/errors/DomainError";

export interface RunAssessmentInput {
  assessment: Assessment;
  answers: Answer[];
}

export type RunAssessmentOutput =
  { valid: true; assessmentResult: AssessmentResult } | { valid: false; errors: DomainError[] };

/**
 * Assessment Engine — orquestrador oficial do pipeline
 * (02_ARCHITECTURE.md, Seção 11: "Assessment Engine... Orquestra todo o
 * processo"; 12B_ARCHITECTURE_PATTERNS.md, Seção 12: "Uma Engine nunca
 * chamará outra diretamente sem uma camada de orquestração").
 *
 * Executa, nesta ordem: Validation → Score → Behavior → Archetype →
 * Insight → Evolution → Result Builder. Interrompe o pipeline e retorna
 * os `DomainError[]` assim que a Validation Engine reportar
 * `valid: false`, sem executar nenhuma etapa seguinte.
 *
 * Puro composition/Factory — nunca recalcula nem reimplementa fórmula
 * de nenhuma Engine, apenas encaminha o output de uma etapa como input
 * da próxima. Resolve o conteúdo estático (indicadores, arquétipos,
 * insights, missões, recursos) diretamente de `core/content/` — Content
 * Access é responsabilidade do Core, não de Infrastructure (DEC-0004,
 * DEC-0005) — mantendo a assinatura pública restrita a
 * `Assessment + Answer[]`, como as demais Engines de entrada do
 * pipeline.
 */
export function runAssessment({ assessment, answers }: RunAssessmentInput): RunAssessmentOutput {
  const validationResult = validateAssessment({ assessment, answers });
  if (!validationResult.valid) {
    return { valid: false, errors: validationResult.errors };
  }

  const { indicatorScores } = scoreAssessment({ assessment, answers });

  const { behaviorIndexes } = calculateBehaviorIndexes({
    indicatorScores,
    dimensions: assessment.dimensions,
    indicators,
  });

  const archetypeResolverOutput = resolveArchetype({
    behaviorIndexes,
    archetypeProfiles: archetypeReferenceProfiles,
    dimensions: assessment.dimensions,
  });

  const { insights, predominantIndicatorIds } = selectInsights({
    archetypeId: archetypeResolverOutput.archetypeId,
    indicatorScores,
    indicators,
    dimensions: assessment.dimensions,
    insightLibrary,
  });

  const { evolutionPlan } = buildEvolutionPlan({
    archetypeId: archetypeResolverOutput.archetypeId,
    archetypeEvolutionContent,
    missionLibrary: missions,
    resourceLibrary: resources,
    behaviorIndexes,
    insights,
  });

  const { assessmentResult } = buildAssessmentResult({
    assessment,
    behaviorIndexes,
    archetypeResolverOutput,
    archetypeReferenceProfiles,
    archetypeProfiles,
    insights,
    predominantIndicatorIds,
    evolutionPlan,
    missionLibrary: missions,
    resourceLibrary: resources,
  });

  return { valid: true, assessmentResult };
}
