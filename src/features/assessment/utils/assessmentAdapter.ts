import { dimensions } from "@/core/content/dimensions";
import type { Answer as CoreAnswer } from "@/core/domain/answer";
import type { AssessmentResult as CoreAssessmentResult } from "@/core/domain/assessmentResult";
import type { Question as CoreQuestion } from "@/core/domain/question";
import type { DomainError } from "@/core/errors/DomainError";

import type {
  Answer as FeatureAnswer,
  AssessmentResult as FeatureAssessmentResult,
  AssessmentSubmissionError,
  BehaviorIndex as FeatureBehaviorIndex,
  DimensionId,
  Question as FeatureQuestion,
  QuestionAlternative,
} from "@/features/assessment/types/assessment";

/**
 * Adapter Feature ↔ Core (12B_ARCHITECTURE_PATTERNS.md, Seção 9 —
 * Adapter/Mapper). Único ponto de tradução entre os dois modelos, para
 * que nenhum componente precise conhecer o formato do Core.
 */

export function toCoreAnswers(
  answers: FeatureAnswer[],
  answeredAt: Date = new Date(),
): CoreAnswer[] {
  return answers.map((answer) => ({
    questionId: answer.questionId,
    alternativeId: answer.alternativeId,
    answeredAt,
  }));
}

export function toFeatureQuestions(questions: CoreQuestion[]): FeatureQuestion[] {
  return questions.map((question) => ({
    id: question.id,
    dimension: question.dimensionId as DimensionId,
    title: question.title,
    alternatives: question.alternatives.map((alternative) => ({
      id: alternative.id as QuestionAlternative["id"],
      label: alternative.label,
    })),
  }));
}

function resolveDimensionName(dimensionId: string): string {
  return dimensions.find((dimension) => dimension.id === dimensionId)?.name ?? dimensionId;
}

function toFeatureBehaviorIndexes(
  behaviorIndexes: CoreAssessmentResult["behaviorIndexes"],
): FeatureBehaviorIndex[] {
  return behaviorIndexes.map((behaviorIndex) => ({
    dimension: behaviorIndex.dimensionId as DimensionId,
    label: resolveDimensionName(behaviorIndex.dimensionId),
    value: Math.round(behaviorIndex.normalizedScore),
  }));
}

export function toFeatureResult(result: CoreAssessmentResult): FeatureAssessmentResult {
  return {
    archetypeName: result.behaviorArchetype.name,
    archetypeSummary: result.behaviorArchetype.summary,
    confidenceScore: result.behaviorArchetype.confidence,
    behaviorIndexes: toFeatureBehaviorIndexes(result.behaviorIndexes),
    strengths: result.strengths,
    attentionPoints: result.attentionPoints,
    firstStep: result.evolutionPlan.firstStep,
  };
}

export function toFeatureErrors(errors: DomainError[]): AssessmentSubmissionError[] {
  return errors.map((error) => ({ code: error.code, message: error.message }));
}
