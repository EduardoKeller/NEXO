import { indicatorWeightV0_1 } from "@/core/content/calibrationV0_1";
import type { Indicator } from "@/core/domain/indicator";

/**
 * 05_CONTENT_LIBRARY.md, Seção 15 (Indicator Library).
 * `weight` é calibração provisória v0.1 (DEC-0007) — nenhum dos 10
 * indicadores possui peso oficialmente documentado ainda.
 */
export const indicators: Indicator[] = [
  {
    id: "initiative_start",
    slug: "initiative_start",
    dimensionId: "initiative",
    name: "Início Espontâneo",
    description: "Mede a facilidade para iniciar tarefas sem pressão externa.",
    weight: indicatorWeightV0_1,
  },
  {
    id: "initiative_decision",
    slug: "initiative_decision",
    dimensionId: "initiative",
    name: "Tomada de Decisão",
    description: "Mede a velocidade para decidir iniciar uma atividade.",
    weight: indicatorWeightV0_1,
  },
  {
    id: "planning_prioritization",
    slug: "planning_prioritization",
    dimensionId: "planning",
    name: "Priorização",
    description: "Mede capacidade de organizar prioridades.",
    weight: indicatorWeightV0_1,
  },
  {
    id: "planning_preparation",
    slug: "planning_preparation",
    dimensionId: "planning",
    name: "Preparação",
    description: "Mede planejamento antes da execução.",
    weight: indicatorWeightV0_1,
  },
  {
    id: "pressure_deadlines",
    slug: "pressure_deadlines",
    dimensionId: "pressure",
    name: "Resposta a Prazos",
    description: "Mede comportamento diante de urgências.",
    weight: indicatorWeightV0_1,
  },
  {
    id: "pressure_stress",
    slug: "pressure_stress",
    dimensionId: "pressure",
    name: "Resiliência",
    description: "Mede estabilidade durante pressão.",
    weight: indicatorWeightV0_1,
  },
  {
    id: "distraction_focus",
    slug: "distraction_focus",
    dimensionId: "distraction",
    name: "Foco",
    description: "Mede capacidade de permanecer concentrado.",
    weight: indicatorWeightV0_1,
  },
  {
    id: "distraction_interruptions",
    slug: "distraction_interruptions",
    dimensionId: "distraction",
    name: "Resistência a Interrupções",
    description: "Mede facilidade para retornar à tarefa principal.",
    weight: indicatorWeightV0_1,
  },
  {
    id: "consistency_routine",
    slug: "consistency_routine",
    dimensionId: "consistency",
    name: "Rotina",
    description: "Mede capacidade de manter hábitos.",
    weight: indicatorWeightV0_1,
  },
  {
    id: "consistency_completion",
    slug: "consistency_completion",
    dimensionId: "consistency",
    name: "Conclusão",
    description: "Mede frequência de finalização das tarefas iniciadas.",
    weight: indicatorWeightV0_1,
  },
];
