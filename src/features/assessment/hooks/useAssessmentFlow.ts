"use client";

import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

import { assessment } from "@/core/content/assessment";
import { submitAssessment } from "@/features/assessment/actions/submitAssessment";
import type { Answer, AssessmentResult, Question } from "@/features/assessment/types/assessment";
import { toFeatureQuestions } from "@/features/assessment/utils/assessmentAdapter";

export type AssessmentStage = "start" | "question" | "submitting" | "result";

const GENERIC_SUBMIT_ERROR_MESSAGE = "Não foi possível calcular o resultado. Tente novamente.";

const questions: Question[] = toFeatureQuestions(assessment.questions);

interface UseAssessmentFlowReturn {
  stage: AssessmentStage;
  currentQuestion: Question | null;
  currentQuestionIndex: number;
  totalQuestions: number;
  progress: number;
  selectedAlternativeId: Answer["alternativeId"] | null;
  result: AssessmentResult | null;
  error: string | null;
  start: () => void;
  selectAlternative: (alternativeId: Answer["alternativeId"]) => void;
  goToNextQuestion: () => void;
  restart: () => void;
}

export function useAssessmentFlow(): UseAssessmentFlowReturn {
  const [stage, setStage] = useState<AssessmentStage>("start");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const totalQuestions = questions.length;
  const currentQuestion = stage === "question" ? questions[currentQuestionIndex] : null;

  const selectedAlternativeId = useMemo(() => {
    if (!currentQuestion) return null;
    const answer = answers.find((item) => item.questionId === currentQuestion.id);
    return answer?.alternativeId ?? null;
  }, [answers, currentQuestion]);

  const progress = useMemo(() => {
    if (stage === "result" || stage === "submitting") return 100;
    if (stage === "start") return 0;
    return Math.round((currentQuestionIndex / totalQuestions) * 100);
  }, [stage, currentQuestionIndex, totalQuestions]);

  const start = useCallback(() => {
    setStage("question");
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResult(null);
    setError(null);
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

  const submit = useCallback(async (finalAnswers: Answer[]) => {
    setStage("submitting");
    setError(null);

    try {
      const output = await submitAssessment(finalAnswers);

      if (!output.valid) {
        const message = output.errors[0]?.message ?? GENERIC_SUBMIT_ERROR_MESSAGE;
        setError(message);
        toast.error(message);
        setStage("question");
        return;
      }

      setResult(output.result);
      setStage("result");
    } catch {
      setError(GENERIC_SUBMIT_ERROR_MESSAGE);
      toast.error(GENERIC_SUBMIT_ERROR_MESSAGE);
      setStage("question");
    }
  }, []);

  const goToNextQuestion = useCallback(() => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex >= totalQuestions) {
      void submit(answers);
      return;
    }
    setCurrentQuestionIndex(nextIndex);
  }, [currentQuestionIndex, totalQuestions, answers, submit]);

  const restart = useCallback(() => {
    setStage("start");
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResult(null);
    setError(null);
  }, []);

  return {
    stage,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    progress,
    selectedAlternativeId,
    result,
    error,
    start,
    selectAlternative,
    goToNextQuestion,
    restart,
  };
}
