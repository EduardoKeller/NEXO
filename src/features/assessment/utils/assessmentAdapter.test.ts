import { describe, expect, it } from "vitest";

import { dimensions } from "@/core/content/dimensions";
import { questions as coreQuestions } from "@/core/content/questions";
import type { AssessmentResult as CoreAssessmentResult } from "@/core/domain/assessmentResult";
import { DomainError } from "@/core/errors/DomainError";
import { IncompleteAssessmentError } from "@/core/errors/IncompleteAssessmentError";
import { AssessmentStatus, Difficulty, Language } from "@/core/types/enums";

import type { Answer as FeatureAnswer } from "@/features/assessment/types/assessment";
import {
  toCoreAnswers,
  toFeatureErrors,
  toFeatureQuestions,
  toFeatureResult,
} from "@/features/assessment/utils/assessmentAdapter";

function buildCoreAssessmentResult(
  overrides: Partial<CoreAssessmentResult> = {},
): CoreAssessmentResult {
  return {
    assessment: {
      id: "assessment_x",
      slug: "assessment-x",
      name: "Assessment X",
      description: "",
      version: "1.0",
      language: Language.ptBR,
      status: AssessmentStatus.Active,
      estimatedTime: 3,
      questions: [],
      dimensions,
    },
    behaviorIndexes: [
      {
        id: "behavior_index_initiative",
        dimensionId: "initiative",
        rawScore: 20,
        normalizedScore: 20,
        confidence: 100,
      },
      {
        id: "behavior_index_planning",
        dimensionId: "planning",
        rawScore: 50.4,
        normalizedScore: 50.4,
        confidence: 100,
      },
    ],
    behaviorArchetype: {
      id: "executor_under_pressure",
      slug: "executor-under-pressure",
      name: "Executor Sob Pressão",
      summary: "Resumo do arquétipo.",
      confidence: 78,
      matchedIndicators: [],
    },
    insights: [],
    strengths: ["Agilidade."],
    attentionPoints: ["Estresse frequente."],
    evolutionPlan: {
      id: "plan_1",
      firstStep: "Criar prazos intermediários.",
      habits: [],
      missions: [],
      resources: [],
      estimatedDuration: 30,
      difficulty: Difficulty.Medium,
    },
    missions: [],
    resources: [],
    report: {
      id: "report_1",
      template: "assessment-default-v1",
      language: Language.ptBR,
      generatedAt: new Date(),
    },
    generatedAt: new Date(),
    ...overrides,
  };
}

describe("assessmentAdapter", () => {
  describe("toCoreAnswers", () => {
    it("converts Feature Answer[] into Core Answer[], preserving questionId and alternativeId", () => {
      const featureAnswers: FeatureAnswer[] = [
        { questionId: "Q001", alternativeId: "A" },
        { questionId: "Q002", alternativeId: "C" },
      ];

      const coreAnswers = toCoreAnswers(featureAnswers, new Date("2026-08-13T00:00:00Z"));

      expect(coreAnswers).toEqual([
        { questionId: "Q001", alternativeId: "A", answeredAt: new Date("2026-08-13T00:00:00Z") },
        { questionId: "Q002", alternativeId: "C", answeredAt: new Date("2026-08-13T00:00:00Z") },
      ]);
    });

    it("fills answeredAt with the current time when none is provided", () => {
      const before = Date.now();
      const [coreAnswer] = toCoreAnswers([{ questionId: "Q001", alternativeId: "A" }]);
      const after = Date.now();

      expect(coreAnswer.answeredAt).toBeInstanceOf(Date);
      expect(coreAnswer.answeredAt.getTime()).toBeGreaterThanOrEqual(before);
      expect(coreAnswer.answeredAt.getTime()).toBeLessThanOrEqual(after);
    });

    it("stamps every answer in the batch with the same answeredAt", () => {
      const [first, second] = toCoreAnswers([
        { questionId: "Q001", alternativeId: "A" },
        { questionId: "Q002", alternativeId: "B" },
      ]);

      expect(first.answeredAt).toBe(second.answeredAt);
    });
  });

  describe("toFeatureQuestions", () => {
    it("maps Core Question[] into the Feature Question shape used by QuestionStep", () => {
      const [featureQuestion] = toFeatureQuestions(coreQuestions);
      const [coreQuestion] = coreQuestions;

      expect(featureQuestion.id).toBe(coreQuestion.id);
      expect(featureQuestion.title).toBe(coreQuestion.title);
      expect(featureQuestion.dimension).toBe(coreQuestion.dimensionId);
      expect(featureQuestion.alternatives).toEqual(
        coreQuestion.alternatives.map((alternative) => ({
          id: alternative.id,
          label: alternative.label,
        })),
      );
    });

    it("preserves question order and count", () => {
      const featureQuestions = toFeatureQuestions(coreQuestions);
      expect(featureQuestions).toHaveLength(coreQuestions.length);
      expect(featureQuestions.map((question) => question.id)).toEqual(
        coreQuestions.map((question) => question.id),
      );
    });
  });

  describe("toFeatureResult", () => {
    it("maps the Core AssessmentResult into the Feature AssessmentResult consumed by ResultStep", () => {
      const coreResult = buildCoreAssessmentResult();

      const featureResult = toFeatureResult(coreResult);

      expect(featureResult).toEqual({
        archetypeName: "Executor Sob Pressão",
        archetypeSummary: "Resumo do arquétipo.",
        confidenceScore: 78,
        behaviorIndexes: [
          { dimension: "initiative", label: "Iniciativa", value: 20 },
          { dimension: "planning", label: "Planejamento", value: 50 },
        ],
        strengths: ["Agilidade."],
        attentionPoints: ["Estresse frequente."],
        firstStep: "Criar prazos intermediários.",
      });
    });

    it("resolves the dimension name through core/content/dimensions.ts instead of hardcoding a label", () => {
      const coreResult = buildCoreAssessmentResult({
        behaviorIndexes: [
          {
            id: "behavior_index_consistency",
            dimensionId: "consistency",
            rawScore: 90,
            normalizedScore: 90,
            confidence: 100,
          },
        ],
      });

      const [behaviorIndex] = toFeatureResult(coreResult).behaviorIndexes;
      const dimension = dimensions.find((item) => item.id === "consistency");

      expect(behaviorIndex.label).toBe(dimension?.name);
    });

    it("falls back to the raw dimensionId when it is not found in the Dimension Library", () => {
      const coreResult = buildCoreAssessmentResult({
        behaviorIndexes: [
          {
            id: "behavior_index_unknown",
            dimensionId: "unknown_dimension",
            rawScore: 10,
            normalizedScore: 10,
            confidence: 100,
          },
        ],
      });

      const [behaviorIndex] = toFeatureResult(coreResult).behaviorIndexes;
      expect(behaviorIndex.label).toBe("unknown_dimension");
    });

    it("rounds the normalized score into the 0-100 progress value", () => {
      const coreResult = buildCoreAssessmentResult({
        behaviorIndexes: [
          {
            id: "behavior_index_planning",
            dimensionId: "planning",
            rawScore: 33.6,
            normalizedScore: 33.6,
            confidence: 100,
          },
        ],
      });

      const [behaviorIndex] = toFeatureResult(coreResult).behaviorIndexes;
      expect(behaviorIndex.value).toBe(34);
    });
  });

  describe("toFeatureErrors", () => {
    it("converts DomainError[] into the serializable {code, message}[] shape returned by the Server Action", () => {
      const errors = [new IncompleteAssessmentError(["Q010"])];

      const featureErrors = toFeatureErrors(errors);

      expect(featureErrors).toEqual([
        { code: "INCOMPLETE_ASSESSMENT", message: "Perguntas sem resposta: Q010" },
      ]);
    });

    it("preserves the code and message of every DomainError subclass", () => {
      class SampleError extends DomainError {
        readonly code = "SAMPLE_ERROR";
        constructor() {
          super("Sample message");
        }
      }

      expect(toFeatureErrors([new SampleError()])).toEqual([
        { code: "SAMPLE_ERROR", message: "Sample message" },
      ]);
    });
  });
});
