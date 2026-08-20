import { describe, expect, it } from "vitest";

import { archetypeReferenceProfiles } from "@/core/content/archetypeReferenceProfiles";
import { assessment as realAssessment } from "@/core/content/assessment";
import type { Answer } from "@/core/domain/answer";
import { DomainError } from "@/core/errors/DomainError";
import { IncompleteAssessmentError } from "@/core/errors/IncompleteAssessmentError";
import { UnknownAlternativeError } from "@/core/errors/UnknownAlternativeError";
import { UnknownQuestionError } from "@/core/errors/UnknownQuestionError";
import { runAssessment } from "@/core/engines/assessment/runAssessment";

const ANSWERED_AT = new Date("2026-08-12T00:00:00Z");

function answer(questionId: string, alternativeId: string): Answer {
  return { questionId, alternativeId, answeredAt: ANSWERED_AT };
}

function allAnswered(alternativeId: string): Answer[] {
  return realAssessment.questions.map((question) => answer(question.id, alternativeId));
}

describe("runAssessment", () => {
  it("runs the full pipeline with valid answers and returns a complete AssessmentResult", () => {
    const result = runAssessment({ assessment: realAssessment, answers: allAnswered("A") });

    expect(result.valid).toBe(true);
    if (!result.valid) throw new Error("expected valid result");

    const { assessmentResult } = result;
    expect(assessmentResult.assessment).toBe(realAssessment);
    expect(assessmentResult.behaviorIndexes).toHaveLength(5);
    expect(archetypeReferenceProfiles.map((a) => a.id)).toContain(
      assessmentResult.behaviorArchetype.id,
    );
    expect(Array.isArray(assessmentResult.behaviorArchetype.matchedIndicators)).toBe(true);
    expect(assessmentResult.report.template).toBe("assessment-default-v1");
    expect(assessmentResult.generatedAt).toBeInstanceOf(Date);
    expect(assessmentResult).not.toHaveProperty("confidenceScore");
  });

  it("stops the pipeline and returns DomainError[] when Validation reports valid: false, without producing a result", () => {
    const incompleteAnswers = allAnswered("A").slice(0, -1);

    const result = runAssessment({ assessment: realAssessment, answers: incompleteAnswers });

    expect(result.valid).toBe(false);
    if (result.valid) throw new Error("expected invalid result");

    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toBeInstanceOf(IncompleteAssessmentError);
    expect(result.errors[0]).toBeInstanceOf(DomainError);
    expect(result).not.toHaveProperty("assessmentResult");
  });

  it("accumulates every Validation error (unknown question, unknown alternative, incomplete) and still stops the pipeline", () => {
    const answers: Answer[] = [
      ...allAnswered("A").slice(0, -2),
      answer("Q999", "A"),
      answer(realAssessment.questions[realAssessment.questions.length - 1].id, "Z"),
    ];

    const result = runAssessment({ assessment: realAssessment, answers });

    expect(result.valid).toBe(false);
    if (result.valid) throw new Error("expected invalid result");

    expect(result.errors.some((error) => error instanceof UnknownQuestionError)).toBe(true);
    expect(result.errors.some((error) => error instanceof UnknownAlternativeError)).toBe(true);
    expect(result.errors.some((error) => error instanceof IncompleteAssessmentError)).toBe(true);
  });

  it("runs end-to-end with a mixed-answer scenario using the real MVP content", () => {
    const alternativesById = ["A", "B", "C", "D"];
    const mixedAnswers = realAssessment.questions.map((question, index) =>
      answer(question.id, alternativesById[index % alternativesById.length]),
    );

    const result = runAssessment({ assessment: realAssessment, answers: mixedAnswers });

    expect(result.valid).toBe(true);
    if (!result.valid) throw new Error("expected valid result");

    const { assessmentResult } = result;
    expect(assessmentResult.behaviorIndexes).toHaveLength(5);
    for (const behaviorIndex of assessmentResult.behaviorIndexes) {
      expect(behaviorIndex.normalizedScore).toBeGreaterThanOrEqual(0);
      expect(behaviorIndex.normalizedScore).toBeLessThanOrEqual(100);
    }
    expect(archetypeReferenceProfiles.map((a) => a.id)).toContain(
      assessmentResult.behaviorArchetype.id,
    );
    expect(assessmentResult.behaviorArchetype.confidence).toBeGreaterThanOrEqual(0);
    expect(assessmentResult.behaviorArchetype.confidence).toBeLessThanOrEqual(100);
    expect(assessmentResult.behaviorArchetype.matchedIndicators).toEqual(
      expect.arrayContaining(assessmentResult.insights.map((insight) => insight.indicatorId)),
    );
  });

  it("does not mutate the assessment or the answers it receives", () => {
    const answers = allAnswered("B");
    const snapshotBefore = JSON.stringify({ assessment: realAssessment, answers });

    runAssessment({ assessment: realAssessment, answers });

    const snapshotAfter = JSON.stringify({ assessment: realAssessment, answers });
    expect(snapshotAfter).toBe(snapshotBefore);
  });

  it("is deterministic: the same input produces the same AssessmentResult (except generatedAt)", () => {
    const answers = allAnswered("C");

    const first = runAssessment({ assessment: realAssessment, answers });
    const second = runAssessment({ assessment: realAssessment, answers });

    if (!first.valid || !second.valid) throw new Error("expected valid results");

    const strip = (result: typeof first.assessmentResult) => ({
      ...result,
      generatedAt: null,
      report: { ...result.report, generatedAt: null },
    });

    expect(strip(first.assessmentResult)).toEqual(strip(second.assessmentResult));
  });
});
