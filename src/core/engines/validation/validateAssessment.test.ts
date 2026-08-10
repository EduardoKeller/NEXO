import { describe, expect, it } from "vitest";

import { assessment as realAssessment } from "@/core/content/assessment";
import { validateAssessment } from "@/core/engines/validation/validateAssessment";
import type { Answer } from "@/core/domain/answer";
import type { Assessment } from "@/core/domain/assessment";
import { AssessmentStatus } from "@/core/types/enums";
import { DuplicateAnswerError } from "@/core/errors/DuplicateAnswerError";
import { IncompleteAssessmentError } from "@/core/errors/IncompleteAssessmentError";
import { UnknownAlternativeError } from "@/core/errors/UnknownAlternativeError";
import { UnknownQuestionError } from "@/core/errors/UnknownQuestionError";

const fixtureAssessment: Assessment = {
  id: "fixture",
  slug: "fixture",
  name: "Fixture Assessment",
  description: "",
  version: "1.0",
  language: "pt-BR",
  status: AssessmentStatus.Active,
  estimatedTime: 1,
  dimensions: [],
  questions: [
    {
      id: "Q1",
      title: "Question 1",
      dimensionId: "dimension-1",
      primaryIndicatorId: "indicator-1",
      secondaryIndicatorIds: [],
      weight: 1,
      alternatives: [
        { id: "A", label: "A", score: 100, behaviorEvidence: [] },
        { id: "B", label: "B", score: 0, behaviorEvidence: [] },
      ],
    },
    {
      id: "Q2",
      title: "Question 2",
      dimensionId: "dimension-1",
      primaryIndicatorId: "indicator-2",
      secondaryIndicatorIds: [],
      weight: 1,
      alternatives: [
        { id: "C", label: "C", score: 100, behaviorEvidence: [] },
        { id: "D", label: "D", score: 0, behaviorEvidence: [] },
      ],
    },
  ],
};

function answer(questionId: string, alternativeId: string): Answer {
  return { questionId, alternativeId, answeredAt: new Date("2026-08-10T00:00:00Z") };
}

describe("validateAssessment", () => {
  it("returns valid:true for a complete and correct set of answers", () => {
    const result = validateAssessment({
      assessment: fixtureAssessment,
      answers: [answer("Q1", "A"), answer("Q2", "C")],
    });

    expect(result).toEqual({ valid: true });
  });

  it("returns IncompleteAssessmentError when a question is left unanswered", () => {
    const result = validateAssessment({
      assessment: fixtureAssessment,
      answers: [answer("Q1", "A")],
    });

    expect(result.valid).toBe(false);
    if (result.valid) return;
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toBeInstanceOf(IncompleteAssessmentError);
    expect((result.errors[0] as IncompleteAssessmentError).missingQuestionIds).toEqual(["Q2"]);
  });

  it("returns UnknownQuestionError when an answer references a question that does not exist", () => {
    const result = validateAssessment({
      assessment: fixtureAssessment,
      answers: [answer("Q1", "A"), answer("Q2", "C"), answer("QX", "A")],
    });

    expect(result.valid).toBe(false);
    if (result.valid) return;
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toBeInstanceOf(UnknownQuestionError);
    expect((result.errors[0] as UnknownQuestionError).questionId).toBe("QX");
  });

  it("returns UnknownAlternativeError when the alternative does not exist anywhere", () => {
    const result = validateAssessment({
      assessment: fixtureAssessment,
      answers: [answer("Q1", "Z"), answer("Q2", "C")],
    });

    expect(result.valid).toBe(false);
    if (result.valid) return;
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toBeInstanceOf(UnknownAlternativeError);
    expect((result.errors[0] as UnknownAlternativeError).questionId).toBe("Q1");
    expect((result.errors[0] as UnknownAlternativeError).alternativeId).toBe("Z");
  });

  it("returns UnknownAlternativeError when the alternative belongs to a different question", () => {
    const result = validateAssessment({
      assessment: fixtureAssessment,
      answers: [answer("Q1", "C"), answer("Q2", "C")],
    });

    expect(result.valid).toBe(false);
    if (result.valid) return;
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toBeInstanceOf(UnknownAlternativeError);
    expect((result.errors[0] as UnknownAlternativeError).questionId).toBe("Q1");
    expect((result.errors[0] as UnknownAlternativeError).alternativeId).toBe("C");
  });

  it("returns DuplicateAnswerError when the same question is answered more than once", () => {
    const result = validateAssessment({
      assessment: fixtureAssessment,
      answers: [answer("Q1", "A"), answer("Q1", "B"), answer("Q2", "C")],
    });

    expect(result.valid).toBe(false);
    if (result.valid) return;
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toBeInstanceOf(DuplicateAnswerError);
    expect((result.errors[0] as DuplicateAnswerError).questionId).toBe("Q1");
  });

  it("aggregates multiple simultaneous errors instead of stopping at the first", () => {
    const result = validateAssessment({
      assessment: fixtureAssessment,
      answers: [answer("QX", "A")],
    });

    expect(result.valid).toBe(false);
    if (result.valid) return;
    expect(result.errors).toHaveLength(2);
    expect(result.errors.some((error) => error instanceof UnknownQuestionError)).toBe(true);
    expect(result.errors.some((error) => error instanceof IncompleteAssessmentError)).toBe(true);
  });

  it("returns valid:true for the real MVP assessment with all 10 questions answered", () => {
    const answers = realAssessment.questions.map((question) => answer(question.id, "A"));

    const result = validateAssessment({ assessment: realAssessment, answers });

    expect(result).toEqual({ valid: true });
  });
});
