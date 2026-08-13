import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { ResultCard } from "@/shared/ui/result-card";
import { Progress, ProgressLabel, ProgressValue } from "@/shared/ui/progress";
import type { AssessmentResult } from "@/features/assessment/types/assessment";

interface ResultStepProps {
  result: AssessmentResult;
  onRestart: () => void;
}

export function ResultStep({ result, onRestart }: ResultStepProps) {
  return (
    <ResultCard
      title={result.archetypeName}
      summary={result.archetypeSummary}
      badge={<Badge variant="secondary">Confiança {result.confidenceScore}%</Badge>}
      footer={<Button onClick={onRestart}>Refazer Avaliação</Button>}
    >
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium">Distribuição dos Índices</p>
        {result.behaviorIndexes.map((index) => (
          <Progress key={index.dimension} value={index.value}>
            <ProgressLabel>{index.label}</ProgressLabel>
            <ProgressValue />
          </Progress>
        ))}
      </div>

      {result.insights.length > 0 ? (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium">Insights</p>
          {result.insights.map((insight) => (
            <div key={insight.id} className="flex flex-col gap-1">
              <p className="text-sm font-medium">{insight.title}</p>
              <p className="text-sm text-muted-foreground">{insight.description}</p>
              <p className="text-sm text-muted-foreground">{insight.recommendation}</p>
            </div>
          ))}
        </div>
      ) : null}

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Pontos Fortes</p>
        <ul className="list-inside list-disc text-sm text-muted-foreground">
          {result.strengths.map((strength) => (
            <li key={strength}>{strength}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Pontos de Atenção</p>
        <ul className="list-inside list-disc text-sm text-muted-foreground">
          {result.attentionPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Primeiro Passo</p>
        <p className="text-sm text-muted-foreground">{result.evolutionPlan.firstStep}</p>
      </div>

      {result.evolutionPlan.habits.length > 0 ? (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Hábitos Recomendados</p>
          <ul className="list-inside list-disc text-sm text-muted-foreground">
            {result.evolutionPlan.habits.map((habit) => (
              <li key={habit}>{habit}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {result.evolutionPlan.missions.length > 0 ? (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Missão</p>
          <ul className="list-inside list-disc text-sm text-muted-foreground">
            {result.evolutionPlan.missions.map((mission) => (
              <li key={mission.id}>{mission.title}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {result.evolutionPlan.resources.length > 0 ? (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Recursos</p>
          <ul className="list-inside list-disc text-sm text-muted-foreground">
            {result.evolutionPlan.resources.map((resource) => (
              <li key={resource.id}>{resource.title}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </ResultCard>
  );
}
