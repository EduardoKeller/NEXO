import { describe, expect, it } from "vitest";

import { dimensions } from "@/core/content/dimensions";
import { questions as coreQuestions } from "@/core/content/questions";
import type { AssessmentResult as CoreAssessmentResult } from "@/core/domain/assessmentResult";
import { DomainError } from "@/core/errors/DomainError";
import { IncompleteAssessmentError } from "@/core/errors/IncompleteAssessmentError";
import { AssessmentStatus, Difficulty, Language, Priority, ResourceType } from "@/core/types/enums";

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
        insights: [],
        evolutionPlan: {
          firstStep: "Criar prazos intermediários.",
          habits: [],
          missions: [],
          resources: [],
          difficulty: "Medium",
          estimatedDuration: 30,
        },
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

    it("preserves every Insight field produced by the Insight Engine", () => {
      const coreResult = buildCoreAssessmentResult({
        insights: [
          {
            id: "insight_starting",
            indicatorId: "initiative_start",
            priority: Priority.High,
            title: "Você inicia melhor quando existe clareza.",
            description: "Tarefas bem definidas são iniciadas com mais facilidade.",
            recommendation: "Divida grandes tarefas em pequenas ações executáveis.",
          },
        ],
      });

      expect(toFeatureResult(coreResult).insights).toEqual([
        {
          id: "insight_starting",
          indicatorId: "initiative_start",
          priority: "High",
          title: "Você inicia melhor quando existe clareza.",
          description: "Tarefas bem definidas são iniciadas com mais facilidade.",
          recommendation: "Divida grandes tarefas em pequenas ações executáveis.",
        },
      ]);
    });

    it("keeps insights as an empty array when the Insight Engine selects none (not an error state)", () => {
      const coreResult = buildCoreAssessmentResult({ insights: [] });
      expect(toFeatureResult(coreResult).insights).toEqual([]);
    });

    it("maps evolutionPlan.firstStep, habits, difficulty and estimatedDuration from the Core EvolutionPlan", () => {
      const coreResult = buildCoreAssessmentResult({
        evolutionPlan: {
          id: "plan_x",
          firstStep: "Criar prazos intermediários para tarefas importantes.",
          habits: ["Planejamento diário.", "Revisão semanal."],
          missions: [],
          resources: [],
          estimatedDuration: 7,
          difficulty: Difficulty.Easy,
        },
      });

      const { evolutionPlan } = toFeatureResult(coreResult);

      expect(evolutionPlan.firstStep).toBe("Criar prazos intermediários para tarefas importantes.");
      expect(evolutionPlan.habits).toEqual(["Planejamento diário.", "Revisão semanal."]);
      expect(evolutionPlan.difficulty).toBe("Easy");
      expect(evolutionPlan.estimatedDuration).toBe(7);
    });

    it("keeps habits as an empty array when the winning Archetype has no recommended habit (not an error state)", () => {
      const coreResult = buildCoreAssessmentResult({
        evolutionPlan: {
          id: "plan_x",
          firstStep: "Definir um limite de tempo para o planejamento.",
          habits: [],
          missions: [],
          resources: [],
          estimatedDuration: 7,
          difficulty: Difficulty.Easy,
        },
      });

      expect(toFeatureResult(coreResult).evolutionPlan.habits).toEqual([]);
    });

    it("maps evolutionPlan.missions from the Result Builder's resolved missions[], not from the raw id list", () => {
      const coreResult = buildCoreAssessmentResult({
        missions: [
          {
            id: "mission_first_step",
            title: "Primeiro Movimento",
            description: "",
            goal: "Dar início a uma tarefa importante.",
            difficulty: Difficulty.Easy,
            estimatedTime: 5,
            steps: ["Escolher uma tarefa.", "Eliminar distrações.", "Trabalhar cinco minutos."],
            expectedOutcome: "A tarefa foi iniciada.",
          },
        ],
      });

      expect(toFeatureResult(coreResult).evolutionPlan.missions).toEqual([
        {
          id: "mission_first_step",
          title: "Primeiro Movimento",
          goal: "Dar início a uma tarefa importante.",
          difficulty: "Easy",
          estimatedTime: 5,
        },
      ]);
    });

    it("keeps missions as an empty array when no mission from the Content Library applies (not an error state)", () => {
      const coreResult = buildCoreAssessmentResult({ missions: [] });
      expect(toFeatureResult(coreResult).evolutionPlan.missions).toEqual([]);
    });

    it("maps evolutionPlan.resources from the Result Builder's resolved resources[]", () => {
      const coreResult = buildCoreAssessmentResult({
        resources: [
          {
            id: "article_small_steps",
            type: ResourceType.Article,
            title: "Como dividir grandes tarefas em pequenas ações.",
            description: "",
            estimatedTime: 6,
            tags: ["planejamento", "produtividade"],
          },
        ],
      });

      expect(toFeatureResult(coreResult).evolutionPlan.resources).toEqual([
        {
          id: "article_small_steps",
          type: "Article",
          title: "Como dividir grandes tarefas em pequenas ações.",
          estimatedTime: 6,
        },
      ]);
    });

    it("keeps resources as an empty array when no resource from the Content Library applies (not an error state)", () => {
      const coreResult = buildCoreAssessmentResult({ resources: [] });
      expect(toFeatureResult(coreResult).evolutionPlan.resources).toEqual([]);
    });

    it("preserves a resource's url when present", () => {
      const coreResult = buildCoreAssessmentResult({
        resources: [
          {
            id: "video_focus",
            type: ResourceType.Video,
            title: "Técnicas de foco.",
            description: "",
            estimatedTime: 10,
            url: "https://example.com/video",
            tags: [],
          },
        ],
      });

      expect(toFeatureResult(coreResult).evolutionPlan.resources[0]).toEqual({
        id: "video_focus",
        type: "Video",
        title: "Técnicas de foco.",
        estimatedTime: 10,
        url: "https://example.com/video",
      });
    });

    it("never leaks Core-only technical fields into the Feature result", () => {
      const coreResult = buildCoreAssessmentResult({
        missions: [
          {
            id: "mission_first_step",
            title: "Primeiro Movimento",
            description: "",
            goal: "Dar início a uma tarefa importante.",
            difficulty: Difficulty.Easy,
            estimatedTime: 5,
            steps: ["Escolher uma tarefa."],
            expectedOutcome: "A tarefa foi iniciada.",
          },
        ],
        resources: [
          {
            id: "article_small_steps",
            type: ResourceType.Article,
            title: "Como dividir grandes tarefas em pequenas ações.",
            description: "",
            estimatedTime: 6,
            tags: ["planejamento"],
          },
        ],
      });

      const featureResult = toFeatureResult(coreResult);

      expect(featureResult).not.toHaveProperty("assessment");
      expect(featureResult).not.toHaveProperty("report");
      expect(featureResult).not.toHaveProperty("generatedAt");
      expect(featureResult).not.toHaveProperty("matchedIndicators");
      expect(featureResult.evolutionPlan).not.toHaveProperty("id");
      expect(featureResult.evolutionPlan.missions[0]).not.toHaveProperty("description");
      expect(featureResult.evolutionPlan.missions[0]).not.toHaveProperty("steps");
      expect(featureResult.evolutionPlan.missions[0]).not.toHaveProperty("expectedOutcome");
      expect(featureResult.evolutionPlan.resources[0]).not.toHaveProperty("description");
      expect(featureResult.evolutionPlan.resources[0]).not.toHaveProperty("tags");
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
