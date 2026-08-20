import { describe, expect, it } from "vitest";

import { assessment as realAssessment } from "@/core/content/assessment";
import { indicators } from "@/core/content/indicators";
import { questions } from "@/core/content/questions";
import type { Answer } from "@/core/domain/answer";
import type { Assessment } from "@/core/domain/assessment";
import { scoreAssessment } from "@/core/engines/scoring/scoreAssessment";
import { AssessmentStatus } from "@/core/types/enums";

const fixtureAssessment: Assessment = {
  id: "fixture",
  slug: "fixture",
  name: "Fixture Assessment",
  description: "",
  version: "1.0",
  language: "pt-BR",
  status: AssessmentStatus.Active,
  estimatedTime: 1,
  dimensions: [
    { id: "dim-1", slug: "dim-1", name: "Dim 1", description: "", weight: 2, indicatorIds: [] },
  ],
  questions: [
    {
      id: "Q1",
      title: "Question 1",
      dimensionId: "dim-1",
      primaryIndicatorId: "indicator-1",
      secondaryIndicatorIds: [],
      weight: 3,
      alternatives: [
        { id: "A", label: "A", score: 10, behaviorEvidence: [] },
        { id: "B", label: "B", score: 0, behaviorEvidence: [] },
      ],
    },
    {
      id: "Q2",
      title: "Question 2",
      dimensionId: "dim-1",
      primaryIndicatorId: "indicator-2",
      secondaryIndicatorIds: [],
      weight: 1,
      alternatives: [{ id: "C", label: "C", score: 50, behaviorEvidence: [] }],
    },
  ],
};

function answer(questionId: string, alternativeId: string): Answer {
  return { questionId, alternativeId, answeredAt: new Date("2026-08-10T00:00:00Z") };
}

describe("scoreAssessment", () => {
  it("computes score = Alternative.score × Question.weight × Dimension.weight", () => {
    const result = scoreAssessment({
      assessment: fixtureAssessment,
      answers: [answer("Q1", "A")],
    });

    expect(result.questionScores).toEqual([{ questionId: "Q1", score: 10 * 3 * 2 }]);
    expect(result.indicatorScores).toEqual([{ indicatorId: "indicator-1", score: 60 }]);
  });

  it("returns empty outputs for an empty set of answers (boundary)", () => {
    const result = scoreAssessment({ assessment: fixtureAssessment, answers: [] });

    expect(result.questionScores).toEqual([]);
    expect(result.indicatorScores).toEqual([]);
  });

  it("produces a score of 0 when the alternative score is 0 (boundary)", () => {
    const result = scoreAssessment({
      assessment: fixtureAssessment,
      answers: [answer("Q1", "B")],
    });

    expect(result.questionScores).toEqual([{ questionId: "Q1", score: 0 }]);
  });

  it("ignores answers referencing a question that does not exist (invalid input)", () => {
    const result = scoreAssessment({
      assessment: fixtureAssessment,
      answers: [answer("QX", "A")],
    });

    expect(result.questionScores).toEqual([]);
    expect(result.indicatorScores).toEqual([]);
  });

  it("ignores answers referencing an alternative that does not belong to the question (invalid input)", () => {
    const result = scoreAssessment({
      assessment: fixtureAssessment,
      answers: [answer("Q1", "C")],
    });

    expect(result.questionScores).toEqual([]);
    expect(result.indicatorScores).toEqual([]);
  });

  it("ignores answers whose question references a dimension that does not exist (invalid input)", () => {
    const assessmentWithUnknownDimension: Assessment = {
      ...fixtureAssessment,
      questions: [
        {
          id: "Q3",
          title: "Question 3",
          dimensionId: "dim-unknown",
          primaryIndicatorId: "indicator-3",
          secondaryIndicatorIds: [],
          weight: 1,
          alternatives: [{ id: "A", label: "A", score: 10, behaviorEvidence: [] }],
        },
      ],
    };

    const result = scoreAssessment({
      assessment: assessmentWithUnknownDimension,
      answers: [answer("Q3", "A")],
    });

    expect(result.questionScores).toEqual([]);
    expect(result.indicatorScores).toEqual([]);
  });

  it("uses the last occurrence when the same question is answered more than once (invalid input, defensive)", () => {
    const result = scoreAssessment({
      assessment: fixtureAssessment,
      answers: [answer("Q1", "A"), answer("Q1", "B")],
    });

    expect(result.questionScores).toEqual([{ questionId: "Q1", score: 0 }]);
  });

  it("never mixes Indicator.weight into the per-question score", () => {
    const result = scoreAssessment({
      assessment: fixtureAssessment,
      answers: [answer("Q2", "C")],
    });

    // score = 50 (Alternative.score) × 1 (Question.weight) × 2 (Dimension.weight) = 100
    // Se Indicator.weight fosse indevidamente aplicado aqui, o valor divergiria de 100.
    expect(result.questionScores).toEqual([{ questionId: "Q2", score: 100 }]);
  });

  it("computes question and indicator scores for the real MVP assessment (10 questions)", () => {
    const answers = realAssessment.questions.map((question) => answer(question.id, "A"));

    const result = scoreAssessment({ assessment: realAssessment, answers });

    expect(result.questionScores).toHaveLength(10);
    expect(result.indicatorScores).toHaveLength(10);
    expect(result.indicatorScores.map((item) => item.indicatorId).sort()).toEqual(
      indicators.map((indicator) => indicator.id).sort(),
    );

    // Q001: alternativa A = 100, Question.weight = 1.0 (oficial), Dimension "initiative".weight = 1.0
    const q001 = result.questionScores.find((item) => item.questionId === "Q001");
    expect(q001?.score).toBe(100 * 1.0 * 1.0);

    // Q005: alternativa A = 100, Question.weight = 1.0 (v0.1), Dimension "consistency".weight = 1.2
    const q005 = result.questionScores.find((item) => item.questionId === "Q005");
    expect(q005?.score).toBe(100 * 1.0 * 1.2);

    const questionsById = new Map(questions.map((question) => [question.id, question]));
    for (const questionScore of result.questionScores) {
      const question = questionsById.get(questionScore.questionId);
      expect(question).toBeDefined();
      const indicatorScore = result.indicatorScores.find(
        (item) => item.indicatorId === question?.primaryIndicatorId,
      );
      expect(indicatorScore?.score).toBe(questionScore.score);
    }
  });
});
