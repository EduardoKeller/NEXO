"use client";

import { useCallback, useMemo, useState } from "react";

import { mockQuestions } from "@/features/assessment/constants/mockQuestions";
import { mockResult } from "@/features/assessment/constants/mockResult";
import type { Answer, AssessmentResult, Question } from "@/features/assessment/types/assessment";

export type AssessmentStage = "start" | "question" | "result";

interface UseAssessmentFlowReturn {
  stage: AssessmentStage;
  currentQuestion: Question | null;
  currentQuestionIndex: number;
  totalQuestions: number;
  progress: number;
  selectedAlternativeId: Answer["alternativeId"] | null;
  result: AssessmentResult | null;
  start: () => void;
  selectAlternative: (alternativeId: Answer["alternativeId"]) => void;
  goToNextQuestion: () => void;
  restart: () => void;
}

export function useAssessmentFlow(): UseAssessmentFlowReturn {
  const [stage, setStage] = useState<AssessmentStage>("start");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const totalQuestions = mockQuestions.length;
  const currentQuestion = stage === "question" ? mockQuestions[currentQuestionIndex] : null;

  const selectedAlternativeId = useMemo(() => {
    if (!currentQuestion) return null;
    const answer = answers.find((item) => item.questionId === currentQuestion.id);
    return answer?.alternativeId ?? null;
  }, [answers, currentQuestion]);

  const progress = useMemo(() => {
    if (stage === "result") return 100;
    if (stage === "start") return 0;
    return Math.round((currentQuestionIndex / totalQuestions) * 100);
  }, [stage, currentQuestionIndex, totalQuestions]);

  const start = useCallback(() => {
    setStage("question");
    setCurrentQuestionIndex(0);
    setAnswers([]);
  }, []);

  const selectAlternative = useCallback(
    (alternativeId: Answer["alternativeId"]) => {
      if (!currentQuestion) return;
      const questionId = currentQuestion.id;

      setAnswers((previous) => {
        const withoutCurrent = previous.filter((item) => item.questionId !== questionId);
        return [...withoutCurrent, { questionId, alternativeId }];
      });
    },
    [currentQuestion],
  );

  const goToNextQuestion = useCallback(() => {
    setCurrentQuestionIndex((previous) => {
      const nextIndex = previous + 1;
      if (nextIndex >= totalQuestions) {
        setStage("result");
        return previous;
      }
      return nextIndex;
    });
  }, [totalQuestions]);

  const restart = useCallback(() => {
    setStage("start");
    setCurrentQuestionIndex(0);
    setAnswers([]);
  }, []);

  return {
    stage,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    progress,
    selectedAlternativeId,
    result: stage === "result" ? mockResult : null,
    start,
    selectAlternative,
    goToNextQuestion,
    restart,
  };
}
