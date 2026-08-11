import type { Insight } from "@/core/domain/insight";
import { Priority } from "@/core/types/enums";

/**
 * 05_CONTENT_LIBRARY.md, Seção 18 (Insight Library).
 *
 * Só 3 dos 10 indicadores oficiais têm Insight documentado
 * (initiative_start, distraction_focus, consistency_completion) —
 * conteúdo editorial, não inventado nesta implementação (DEC-0010).
 * Os outros 7 indicadores não produzem Insight até a Insight Library
 * ser expandida.
 */
export const insights: Insight[] = [
  {
    id: "insight_starting",
    indicatorId: "initiative_start",
    priority: Priority.High,
    title: "Você inicia melhor quando existe clareza.",
    description:
      "Os resultados indicam que tarefas bem definidas são iniciadas com mais facilidade do que atividades vagas ou muito abertas.",
    recommendation: "Divida grandes tarefas em pequenas ações executáveis.",
  },
  {
    id: "insight_focus",
    indicatorId: "distraction_focus",
    priority: Priority.Medium,
    title: "Seu foco diminui quando existem muitas interrupções.",
    description:
      "Você demonstra melhor desempenho em ambientes organizados e com poucas distrações.",
    recommendation: "Reserve blocos de tempo sem notificações para atividades importantes.",
  },
  {
    id: "insight_consistency",
    indicatorId: "consistency_completion",
    priority: Priority.High,
    title: "Você inicia mais tarefas do que conclui.",
    description:
      "Existe uma tendência de abandonar atividades antes da conclusão quando surgem novas prioridades.",
    recommendation: "Antes de iniciar uma nova tarefa, conclua pelo menos uma atividade pendente.",
  },
];
