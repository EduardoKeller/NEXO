import { alternativeScoreV0_1, questionWeightV0_1 } from "@/core/content/calibrationV0_1";
import type { Alternative } from "@/core/domain/alternative";
import type { Question } from "@/core/domain/question";

/**
 * 05_CONTENT_LIBRARY.md, Seção 16 (Question Library).
 *
 * `alternatives[].score` é calibração provisória v0.1 (DEC-0007) para
 * as 10 perguntas — nenhuma alternativa possui score oficialmente
 * documentado ainda. `weight` é oficial apenas em Q001 (já documentado
 * antes desta calibração); Q002-Q010 usam `questionWeightV0_1`.
 *
 * `behaviorEvidence` é mantido como `[]` em todas as alternativas: o
 * campo é obrigatório em Alternative (07_DATA_MODEL.md, Seção 7), mas
 * nenhum conteúdo foi documentado para ele em 05_CONTENT_LIBRARY.md —
 * não é inventado nesta PR.
 */
function alternatives(labels: [string, string, string, string]): Alternative[] {
  const ids = ["A", "B", "C", "D"] as const;
  return ids.map((id, index) => ({
    id,
    label: labels[index],
    score: alternativeScoreV0_1[id],
    behaviorEvidence: [],
  }));
}

export const questions: Question[] = [
  {
    id: "Q001",
    title: "Quando você recebe uma tarefa importante, qual costuma ser sua primeira reação?",
    dimensionId: "initiative",
    primaryIndicatorId: "initiative_start",
    secondaryIndicatorIds: ["consistency_completion"],
    weight: 1.0,
    alternatives: alternatives([
      "Começo o quanto antes.",
      "Planejo bastante antes de iniciar.",
      "Espero sentir mais urgência.",
      "Acabo iniciando outras tarefas antes.",
    ]),
  },
  {
    id: "Q002",
    title: "Quando possui várias tarefas, normalmente você...",
    dimensionId: "planning",
    primaryIndicatorId: "planning_prioritization",
    secondaryIndicatorIds: [],
    weight: questionWeightV0_1,
    alternatives: alternatives([
      "Defino prioridades e sigo uma ordem.",
      "Vou resolvendo conforme aparecem.",
      "Começo pela mais simples.",
      "Tenho dificuldade para decidir por onde começar.",
    ]),
  },
  {
    id: "Q003",
    title: "Como você reage quando o prazo está próximo?",
    dimensionId: "pressure",
    primaryIndicatorId: "pressure_deadlines",
    secondaryIndicatorIds: [],
    weight: questionWeightV0_1,
    alternatives: alternatives([
      "Meu desempenho melhora.",
      "Fico mais ansioso.",
      "Procuro reorganizar tudo.",
      "Acabo adiando ainda mais.",
    ]),
  },
  {
    id: "Q004",
    title: "Enquanto trabalha ou estuda...",
    dimensionId: "distraction",
    primaryIndicatorId: "distraction_focus",
    secondaryIndicatorIds: [],
    weight: questionWeightV0_1,
    alternatives: alternatives([
      "Consigo manter foco facilmente.",
      "Interrupções desviam minha atenção.",
      "Alterno frequentemente entre tarefas.",
      "Preciso de muito esforço para voltar ao foco.",
    ]),
  },
  {
    id: "Q005",
    title: "Quando cria um novo hábito...",
    dimensionId: "consistency",
    primaryIndicatorId: "consistency_routine",
    secondaryIndicatorIds: [],
    weight: questionWeightV0_1,
    alternatives: alternatives([
      "Costumo mantê-lo.",
      "Perco a constância após alguns dias.",
      "Esqueço rapidamente.",
      "Dependo muito da motivação.",
    ]),
  },
  {
    id: "Q006",
    title: "Ao enfrentar uma tarefa desconhecida...",
    dimensionId: "initiative",
    primaryIndicatorId: "initiative_decision",
    secondaryIndicatorIds: [],
    weight: questionWeightV0_1,
    alternatives: alternatives([
      "Começo experimentando.",
      "Pesquiso bastante antes.",
      "Espero mais informações.",
      "Evito iniciar.",
    ]),
  },
  {
    id: "Q007",
    title: "Antes de executar uma atividade importante...",
    dimensionId: "planning",
    primaryIndicatorId: "planning_preparation",
    secondaryIndicatorIds: [],
    weight: questionWeightV0_1,
    alternatives: alternatives([
      "Faço um plano simples.",
      "Planejo detalhadamente.",
      "Improviso durante a execução.",
      "Inicio sem planejamento.",
    ]),
  },
  {
    id: "Q008",
    title: "Quando surgem mudanças inesperadas...",
    dimensionId: "pressure",
    primaryIndicatorId: "pressure_stress",
    secondaryIndicatorIds: [],
    weight: questionWeightV0_1,
    alternatives: alternatives([
      "Adapto-me rapidamente.",
      "Preciso reorganizar tudo.",
      "Fico sobrecarregado.",
      "Demoro para reagir.",
    ]),
  },
  {
    id: "Q009",
    title: "Ao ser interrompido...",
    dimensionId: "distraction",
    primaryIndicatorId: "distraction_interruptions",
    secondaryIndicatorIds: [],
    weight: questionWeightV0_1,
    alternatives: alternatives([
      "Retorno facilmente.",
      "Levo algum tempo para voltar.",
      "Acabo iniciando outra atividade.",
      "Perco completamente o ritmo.",
    ]),
  },
  {
    id: "Q010",
    title: "Quando inicia um projeto...",
    dimensionId: "consistency",
    primaryIndicatorId: "consistency_completion",
    secondaryIndicatorIds: [],
    weight: questionWeightV0_1,
    alternatives: alternatives([
      "Costumo concluí-lo.",
      "Concluo apenas quando existe cobrança.",
      "Abandono alguns projetos.",
      "Começo muitos ao mesmo tempo.",
    ]),
  },
];
