import type { AssessmentResult } from "@/features/assessment/types/assessment";

/**
 * Mock temporário do Result Builder (06_ASSESSMENT_ENGINE.md, Seção 13).
 * Baseado no Arquétipo "Executor Sob Pressão" (05_CONTENT_LIBRARY.md, Seção 17).
 * Substituído pelo resultado real da Assessment Engine na Fase 4.
 */
export const mockResult: AssessmentResult = {
  archetypeName: "Executor Sob Pressão",
  archetypeSummary:
    "Você tende a produzir melhor quando existe um prazo definido ou uma sensação de urgência.",
  confidenceScore: 78,
  behaviorIndexes: [
    { dimension: "initiative", label: "Iniciativa", value: 20 },
    { dimension: "planning", label: "Planejamento", value: 50 },
    { dimension: "pressure", label: "Gestão da Pressão", value: 80 },
    { dimension: "distraction", label: "Gestão da Distração", value: 50 },
    { dimension: "consistency", label: "Consistência", value: 20 },
  ],
  strengths: ["Agilidade.", "Boa resposta em momentos críticos.", "Capacidade de adaptação."],
  attentionPoints: ["Dependência de urgência.", "Acúmulo de tarefas.", "Estresse frequente."],
  firstStep: "Criar prazos intermediários para tarefas importantes.",
};
