import { describe, expect, it } from "vitest";

import { assessment } from "@/core/content/assessment";

import { submitAssessment } from "@/features/assessment/actions/submitAssessment";
import type { Answer } from "@/features/assessment/types/assessment";

function allAnswered(alternativeId: Answer["alternativeId"]): Answer[] {
  return assessment.questions.map((question) => ({ questionId: question.id, alternativeId }));
}

describe("submitAssessment", () => {
  it("runs the real, official Assessment through the Core pipeline and returns a valid Feature result", async () => {
    const output = await submitAssessment(allAnswered("A"));

    expect(output.valid).toBe(true);
    if (!output.valid) throw new Error("expected a valid output");

    expect(output.result.archetypeName).toEqual(expect.any(String));
    expect(output.result.archetypeName.length).toBeGreaterThan(0);
    expect(output.result.behaviorIndexes).toHaveLength(assessment.dimensions.length);
    expect(output.result.confidenceScore).toBeGreaterThanOrEqual(0);
    expect(output.result.confidenceScore).toBeLessThanOrEqual(100);
    expect(output.result.firstStep.length).toBeGreaterThan(0);
  });

  it("fills answeredAt on every answer before running Validation, so a fully answered submission never fails on completeness", async () => {
    const output = await submitAssessment(allAnswered("B"));
    expect(output.valid).toBe(true);
  });

  it("returns valid: false with serializable errors when the submission is incomplete", async () => {
    const incompleteAnswers = allAnswered("A").slice(0, -1);

    const output = await submitAssessment(incompleteAnswers);

    expect(output.valid).toBe(false);
    if (output.valid) throw new Error("expected an invalid output");

    expect(output.errors).toHaveLength(1);
    expect(output.errors[0]).toEqual({
      code: "INCOMPLETE_ASSESSMENT",
      message: expect.stringContaining("Perguntas sem resposta"),
    });
  });

  it("returns valid: false with one error per Validation failure for unknown questions/alternatives", async () => {
    const answers: Answer[] = [
      ...allAnswered("A").slice(0, -1),
      { questionId: "Q999", alternativeId: "A" },
    ];

    const output = await submitAssessment(answers);

    expect(output.valid).toBe(false);
    if (output.valid) throw new Error("expected an invalid output");

    expect(output.errors.length).toBeGreaterThan(0);
    for (const error of output.errors) {
      expect(typeof error.code).toBe("string");
      expect(typeof error.message).toBe("string");
    }
    expect(output.errors.some((error) => error.code === "UNKNOWN_QUESTION")).toBe(true);
  });

  it("never leaks Core domain objects (Assessment, DomainError instances) into the returned output", async () => {
    const output = await submitAssessment(allAnswered("C"));

    if (output.valid) {
      expect(output.result).not.toHaveProperty("assessment");
      expect(output.result).not.toHaveProperty("behaviorArchetype");
      expect(output.result).not.toHaveProperty("evolutionPlan");
    }
  });
});
