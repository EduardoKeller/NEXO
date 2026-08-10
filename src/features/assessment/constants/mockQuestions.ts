import type { Question } from "@/features/assessment/types/assessment";

/**
 * Mock temporário da Question Library (05_CONTENT_LIBRARY.md, Seção 16).
 * Substituído pela integração real com a Content Library na Fase 6 (07E_IMPLEMENTATION_GUIDE.md).
 */
export const mockQuestions: Question[] = [
  {
    id: "Q001",
    dimension: "initiative",
    title: "Quando você recebe uma tarefa importante, qual costuma ser sua primeira reação?",
    alternatives: [
      { id: "A", label: "Começo o quanto antes." },
      { id: "B", label: "Planejo bastante antes de iniciar." },
      { id: "C", label: "Espero sentir mais urgência." },
      { id: "D", label: "Acabo iniciando outras tarefas antes." },
    ],
  },
  {
    id: "Q002",
    dimension: "planning",
    title: "Quando possui várias tarefas, normalmente você...",
    alternatives: [
      { id: "A", label: "Defino prioridades e sigo uma ordem." },
      { id: "B", label: "Vou resolvendo conforme aparecem." },
      { id: "C", label: "Começo pela mais simples." },
      { id: "D", label: "Tenho dificuldade para decidir por onde começar." },
    ],
  },
  {
    id: "Q003",
    dimension: "pressure",
    title: "Como você reage quando o prazo está próximo?",
    alternatives: [
      { id: "A", label: "Meu desempenho melhora." },
      { id: "B", label: "Fico mais ansioso." },
      { id: "C", label: "Procuro reorganizar tudo." },
      { id: "D", label: "Acabo adiando ainda mais." },
    ],
  },
  {
    id: "Q004",
    dimension: "distraction",
    title: "Enquanto trabalha ou estuda...",
    alternatives: [
      { id: "A", label: "Consigo manter foco facilmente." },
      { id: "B", label: "Interrupções desviam minha atenção." },
      { id: "C", label: "Alterno frequentemente entre tarefas." },
      { id: "D", label: "Preciso de muito esforço para voltar ao foco." },
    ],
  },
  {
    id: "Q005",
    dimension: "consistency",
    title: "Quando cria um novo hábito...",
    alternatives: [
      { id: "A", label: "Costumo mantê-lo." },
      { id: "B", label: "Perco a constância após alguns dias." },
      { id: "C", label: "Esqueço rapidamente." },
      { id: "D", label: "Dependo muito da motivação." },
    ],
  },
  {
    id: "Q006",
    dimension: "initiative",
    title: "Ao enfrentar uma tarefa desconhecida...",
    alternatives: [
      { id: "A", label: "Começo experimentando." },
      { id: "B", label: "Pesquiso bastante antes." },
      { id: "C", label: "Espero mais informações." },
      { id: "D", label: "Evito iniciar." },
    ],
  },
  {
    id: "Q007",
    dimension: "planning",
    title: "Antes de executar uma atividade importante...",
    alternatives: [
      { id: "A", label: "Faço um plano simples." },
      { id: "B", label: "Planejo detalhadamente." },
      { id: "C", label: "Improviso durante a execução." },
      { id: "D", label: "Inicio sem planejamento." },
    ],
  },
  {
    id: "Q008",
    dimension: "pressure",
    title: "Quando surgem mudanças inesperadas...",
    alternatives: [
      { id: "A", label: "Adapto-me rapidamente." },
      { id: "B", label: "Preciso reorganizar tudo." },
      { id: "C", label: "Fico sobrecarregado." },
      { id: "D", label: "Demoro para reagir." },
    ],
  },
  {
    id: "Q009",
    dimension: "distraction",
    title: "Ao ser interrompido...",
    alternatives: [
      { id: "A", label: "Retorno facilmente." },
      { id: "B", label: "Levo algum tempo para voltar." },
      { id: "C", label: "Acabo iniciando outra atividade." },
      { id: "D", label: "Perco completamente o ritmo." },
    ],
  },
  {
    id: "Q010",
    dimension: "consistency",
    title: "Quando inicia um projeto...",
    alternatives: [
      { id: "A", label: "Costumo concluí-lo." },
      { id: "B", label: "Concluo apenas quando existe cobrança." },
      { id: "C", label: "Abandono alguns projetos." },
      { id: "D", label: "Começo muitos ao mesmo tempo." },
    ],
  },
];
