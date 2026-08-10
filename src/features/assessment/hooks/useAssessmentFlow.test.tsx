import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it } from "vitest";

import { mockQuestions } from "@/features/assessment/constants/mockQuestions";
import { useAssessmentFlow } from "@/features/assessment/hooks/useAssessmentFlow";

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
  });

  function setup() {
    const hook = renderHook(() => useAssessmentFlow());
    unmount = hook.unmount;
    return hook.result;
  }

  it("starts at the start stage with zero progress", () => {
    const result = setup();

    expect(result.current.stage).toBe("start");
    expect(result.current.progress).toBe(0);
    expect(result.current.totalQuestions).toBe(mockQuestions.length);
  });

  it("moves to the first question when started", () => {
    const result = setup();

    act(() => result.current.start());

    expect(result.current.stage).toBe("question");
    expect(result.current.currentQuestion?.id).toBe(mockQuestions[0].id);
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
    expect(result.current.currentQuestion?.id).toBe(mockQuestions[1].id);
    expect(result.current.selectedAlternativeId).toBeNull();
    expect(result.current.progress).toBeGreaterThan(0);
  });

  it("produces a mocked result after answering every question", () => {
    const result = setup();

    act(() => result.current.start());
    for (let index = 0; index < mockQuestions.length; index += 1) {
      act(() => result.current.selectAlternative("A"));
      act(() => result.current.goToNextQuestion());
    }

    expect(result.current.stage).toBe("result");
    expect(result.current.progress).toBe(100);
    expect(result.current.result).not.toBeNull();
  });

  it("resets to the start stage on restart", () => {
    const result = setup();

    act(() => result.current.start());
    act(() => result.current.selectAlternative("A"));
    act(() => result.current.restart());

    expect(result.current.stage).toBe("start");
    expect(result.current.currentQuestionIndex).toBe(0);
  });
});
