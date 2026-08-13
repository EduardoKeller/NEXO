import { existsSync } from "node:fs";
import path from "node:path";

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

import { assessment } from "@/core/content/assessment";

import { submitAssessment } from "@/features/assessment/actions/submitAssessment";
import { useAssessmentFlow } from "@/features/assessment/hooks/useAssessmentFlow";
import type { Answer, AssessmentResult } from "@/features/assessment/types/assessment";

vi.mock("@/features/assessment/actions/submitAssessment", () => ({
  submitAssessment: vi.fn(),
}));

const submitAssessmentMock = vi.mocked(submitAssessment);

const FAKE_RESULT: AssessmentResult = {
  archetypeName: "Executor Sob Pressão",
  archetypeSummary: "Resumo.",
  confidenceScore: 78,
  behaviorIndexes: [{ dimension: "initiative", label: "Iniciativa", value: 20 }],
  strengths: ["Agilidade."],
  attentionPoints: ["Estresse frequente."],
  insights: [],
  evolutionPlan: {
    firstStep: "Criar prazos intermediários.",
    habits: [],
    missions: [],
    resources: [],
    difficulty: "Easy",
    estimatedDuration: 7,
  },
};

/**
 * Harness mínimo de renderHook (sem @testing-library/react, indisponível no projeto).
 * Monta o hook dentro de um componente descartável e expõe seu retorno mais recente.
 */
function renderHook<T>(callback: () => T) {
  const result = { current: undefined as T };
  let root: Root;
  const container = document.createElement("div");

  function TestComponent() {
    result.current = callback();
    return null;
  }

  act(() => {
    root = createRoot(container);
    root.render(<TestComponent />);
  });

  return {
    result,
    unmount: () => act(() => root.unmount()),
  };
}

describe("useAssessmentFlow", () => {
  let unmount: () => void;

  afterEach(() => {
    unmount?.();
    submitAssessmentMock.mockReset();
  });

  function setup() {
    const hook = renderHook(() => useAssessmentFlow());
    unmount = hook.unmount;
    return hook.result;
  }

  /** Answers every question except the last one, leaving the flow at the final question. */
  function answerUpToLastQuestion(result: { current: ReturnType<typeof useAssessmentFlow> }) {
    for (let index = 0; index < assessment.questions.length - 1; index += 1) {
      act(() => result.current.selectAlternative("A"));
      act(() => result.current.goToNextQuestion());
    }
    act(() => result.current.selectAlternative("A"));
  }

  it("starts at the start stage with zero progress", () => {
    const result = setup();

    expect(result.current.stage).toBe("start");
    expect(result.current.progress).toBe(0);
    expect(result.current.totalQuestions).toBe(assessment.questions.length);
  });

  it("moves to the first question when started", () => {
    const result = setup();

    act(() => result.current.start());

    expect(result.current.stage).toBe("question");
    expect(result.current.currentQuestion?.id).toBe(assessment.questions[0].id);
    expect(result.current.selectedAlternativeId).toBeNull();
  });

  it("tracks the selected alternative for the current question", () => {
    const result = setup();

    act(() => result.current.start());
    act(() => result.current.selectAlternative("B"));

    expect(result.current.selectedAlternativeId).toBe("B");
  });

  it("advances to the next question and resets the selected alternative", () => {
    const result = setup();

    act(() => result.current.start());
    act(() => result.current.selectAlternative("A"));
    act(() => result.current.goToNextQuestion());

    expect(result.current.currentQuestionIndex).toBe(1);
    expect(result.current.currentQuestion?.id).toBe(assessment.questions[1].id);
    expect(result.current.selectedAlternativeId).toBeNull();
    expect(result.current.progress).toBeGreaterThan(0);
  });

  it("submits the collected answers to the Server Action only after the last question", () => {
    submitAssessmentMock.mockResolvedValue({ valid: true, result: FAKE_RESULT });
    const result = setup();

    act(() => result.current.start());
    answerUpToLastQuestion(result);

    expect(submitAssessmentMock).not.toHaveBeenCalled();

    act(() => result.current.goToNextQuestion());

    expect(submitAssessmentMock).toHaveBeenCalledTimes(1);
    const [sentAnswers] = submitAssessmentMock.mock.calls[0] as [Answer[]];
    expect(sentAnswers).toHaveLength(assessment.questions.length);
    expect(sentAnswers.map((answer) => answer.questionId)).toEqual(
      assessment.questions.map((question) => question.id),
    );
  });

  it("shows a pending/submitting stage while the Server Action call is in flight", async () => {
    let resolveSubmit: (output: Awaited<ReturnType<typeof submitAssessment>>) => void = () => {};
    submitAssessmentMock.mockReturnValue(
      new Promise((resolve) => {
        resolveSubmit = resolve;
      }),
    );

    const result = setup();
    act(() => result.current.start());
    answerUpToLastQuestion(result);
    act(() => result.current.goToNextQuestion());

    expect(result.current.stage).toBe("submitting");
    expect(result.current.progress).toBe(100);
    expect(result.current.result).toBeNull();

    await act(async () => {
      resolveSubmit({ valid: true, result: FAKE_RESULT });
    });

    expect(result.current.stage).toBe("result");
  });

  it("moves to the result stage only when the Server Action returns a valid result", async () => {
    submitAssessmentMock.mockResolvedValue({ valid: true, result: FAKE_RESULT });
    const result = setup();

    act(() => result.current.start());
    answerUpToLastQuestion(result);
    await act(async () => {
      result.current.goToNextQuestion();
    });

    expect(result.current.stage).toBe("result");
    expect(result.current.result).toEqual(FAKE_RESULT);
    expect(result.current.error).toBeNull();
  });

  it("stays out of the result stage and exposes an error when the Server Action reports valid: false", async () => {
    submitAssessmentMock.mockResolvedValue({
      valid: false,
      errors: [{ code: "INCOMPLETE_ASSESSMENT", message: "Perguntas sem resposta: Q010" }],
    });
    const result = setup();

    act(() => result.current.start());
    answerUpToLastQuestion(result);
    await act(async () => {
      result.current.goToNextQuestion();
    });

    expect(result.current.stage).toBe("question");
    expect(result.current.result).toBeNull();
    expect(result.current.error).toBe("Perguntas sem resposta: Q010");
  });

  it("surfaces a generic error and stays out of the result stage when the Server Action call rejects", async () => {
    submitAssessmentMock.mockRejectedValue(new Error("network down"));
    const result = setup();

    act(() => result.current.start());
    answerUpToLastQuestion(result);
    await act(async () => {
      result.current.goToNextQuestion();
    });

    expect(result.current.stage).toBe("question");
    expect(result.current.result).toBeNull();
    expect(result.current.error).not.toBeNull();
  });

  it("resets to the start stage on restart", () => {
    const result = setup();

    act(() => result.current.start());
    act(() => result.current.selectAlternative("A"));
    act(() => result.current.restart());

    expect(result.current.stage).toBe("start");
    expect(result.current.currentQuestionIndex).toBe(0);
  });

  it("no longer ships the mock constants used before the Core integration", () => {
    const constantsDir = path.resolve(process.cwd(), "src/features/assessment/constants");

    expect(existsSync(path.join(constantsDir, "mockQuestions.ts"))).toBe(false);
    expect(existsSync(path.join(constantsDir, "mockResult.ts"))).toBe(false);
  });
});
