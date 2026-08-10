"use client";

import { AssessmentStart } from "@/features/assessment/components/AssessmentStart";
import { QuestionStep } from "@/features/assessment/components/QuestionStep";
import { ResultStep } from "@/features/assessment/components/ResultStep";
import { useAssessmentFlow } from "@/features/assessment/hooks/useAssessmentFlow";

export function AssessmentFlow() {
  const {
    stage,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    progress,
    selectedAlternativeId,
    result,
    start,
    selectAlternative,
    goToNextQuestion,
    restart,
  } = useAssessmentFlow();

  if (stage === "start") {
    return <AssessmentStart questionCount={totalQuestions} onStart={start} />;
  }

  if (stage === "question" && currentQuestion) {
    return (
      <QuestionStep
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
        progress={progress}
        selectedAlternativeId={selectedAlternativeId}
        onSelectAlternative={selectAlternative}
        onNext={goToNextQuestion}
      />
    );
  }

  if (stage === "result" && result) {
    return <ResultStep result={result} onRestart={restart} />;
  }

  return null;
}
