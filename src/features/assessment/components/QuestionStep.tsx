import { Button } from "@/shared/ui/button";
import { Progress, ProgressLabel, ProgressValue } from "@/shared/ui/progress";
import { QuestionCard } from "@/shared/ui/question-card";
import type { Answer, Question } from "@/features/assessment/types/assessment";

interface QuestionStepProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  progress: number;
  selectedAlternativeId: Answer["alternativeId"] | null;
  onSelectAlternative: (alternativeId: Answer["alternativeId"]) => void;
  onNext: () => void;
}

export function QuestionStep({
  question,
  questionNumber,
  totalQuestions,
  progress,
  selectedAlternativeId,
  onSelectAlternative,
  onNext,
}: QuestionStepProps) {
  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <Progress value={progress}>
        <ProgressLabel>
          Pergunta {questionNumber} de {totalQuestions}
        </ProgressLabel>
        <ProgressValue />
      </Progress>

      <QuestionCard
        title={question.title}
        footer={
          <Button className="ml-auto" onClick={onNext} disabled={selectedAlternativeId === null}>
            {questionNumber === totalQuestions ? "Ver Resultado" : "Próxima"}
          </Button>
        }
      >
        <div className="flex flex-col gap-2">
          {question.alternatives.map((alternative) => (
            <Button
              key={alternative.id}
              type="button"
              variant={selectedAlternativeId === alternative.id ? "default" : "outline"}
              className="h-auto justify-start px-3 py-2 text-left whitespace-normal"
              onClick={() => onSelectAlternative(alternative.id)}
            >
              {alternative.label}
            </Button>
          ))}
        </div>
      </QuestionCard>
    </div>
  );
}
