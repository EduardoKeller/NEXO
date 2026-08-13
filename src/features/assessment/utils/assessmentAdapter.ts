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
  EvolutionMission as FeatureEvolutionMission,
  EvolutionPlan as FeatureEvolutionPlan,
  EvolutionResource as FeatureEvolutionResource,
  Insight as FeatureInsight,
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

function toFeatureInsights(insights: CoreAssessmentResult["insights"]): FeatureInsight[] {
  return insights.map((insight) => ({
    id: insight.id,
    indicatorId: insight.indicatorId,
    priority: insight.priority,
    title: insight.title,
    description: insight.description,
    recommendation: insight.recommendation,
  }));
}

function toFeatureMissions(missions: CoreAssessmentResult["missions"]): FeatureEvolutionMission[] {
  return missions.map((mission) => ({
    id: mission.id,
    title: mission.title,
    goal: mission.goal,
    difficulty: mission.difficulty,
    estimatedTime: mission.estimatedTime,
  }));
}

function toFeatureResources(
  resources: CoreAssessmentResult["resources"],
): FeatureEvolutionResource[] {
  return resources.map((resource) => ({
    id: resource.id,
    type: resource.type,
    title: resource.title,
    estimatedTime: resource.estimatedTime,
    ...(resource.url !== undefined ? { url: resource.url } : {}),
  }));
}

function toFeatureEvolutionPlan(result: CoreAssessmentResult): FeatureEvolutionPlan {
  return {
    firstStep: result.evolutionPlan.firstStep,
    habits: result.evolutionPlan.habits,
    missions: toFeatureMissions(result.missions),
    resources: toFeatureResources(result.resources),
    difficulty: result.evolutionPlan.difficulty,
    estimatedDuration: result.evolutionPlan.estimatedDuration,
  };
}

export function toFeatureResult(result: CoreAssessmentResult): FeatureAssessmentResult {
  return {
    archetypeName: result.behaviorArchetype.name,
    archetypeSummary: result.behaviorArchetype.summary,
    confidenceScore: result.behaviorArchetype.confidence,
    behaviorIndexes: toFeatureBehaviorIndexes(result.behaviorIndexes),
    strengths: result.strengths,
    attentionPoints: result.attentionPoints,
    insights: toFeatureInsights(result.insights),
    evolutionPlan: toFeatureEvolutionPlan(result),
  };
}

export function toFeatureErrors(errors: DomainError[]): AssessmentSubmissionError[] {
  return errors.map((error) => ({ code: error.code, message: error.message }));
}
