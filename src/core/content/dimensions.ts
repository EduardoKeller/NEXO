import type { Dimension } from "@/core/domain/dimension";

/**
 * 05_CONTENT_LIBRARY.md, Seção 14 (Dimension Library).
 * Todos os valores de `weight` já eram oficialmente documentados
 * antes da calibração v0.1 (DEC-0007) — não fazem parte dela.
 */
export const dimensions: Dimension[] = [
  {
    id: "initiative",
    slug: "initiative",
    name: "Iniciativa",
    description: "Avaliar a tendência de iniciar tarefas espontaneamente.",
    weight: 1.0,
    indicatorIds: ["initiative_start", "initiative_decision"],
  },
  {
    id: "planning",
    slug: "planning",
    name: "Planejamento",
    description: "Avaliar organização e preparação antes da execução.",
    weight: 1.0,
    indicatorIds: ["planning_prioritization", "planning_preparation"],
  },
  {
    id: "pressure",
    slug: "pressure",
    name: "Gestão da Pressão",
    description: "Avaliar comportamento diante de prazos e urgências.",
    weight: 1.0,
    indicatorIds: ["pressure_deadlines", "pressure_stress"],
  },
  {
    id: "distraction",
    slug: "distraction",
    name: "Gestão da Distração",
    description: "Avaliar capacidade de manter foco.",
    weight: 1.0,
    indicatorIds: ["distraction_focus", "distraction_interruptions"],
  },
  {
    id: "consistency",
    slug: "consistency",
    name: "Consistência",
    description: "Avaliar manutenção de hábitos e execução contínua.",
    weight: 1.2,
    indicatorIds: ["consistency_routine", "consistency_completion"],
  },
];
