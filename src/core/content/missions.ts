import type { Mission } from "@/core/domain/mission";
import { Difficulty } from "@/core/types/enums";

/**
 * 05_CONTENT_LIBRARY.md, Seção 20 (Mission Library).
 * `description` não é preenchida em nenhum dos 3 exemplos documentados
 * — campo obrigatório em 07_DATA_MODEL.md sem conteúdo disponível,
 * mantido como string vazia (mesmo tratamento de `Alternative.behaviorEvidence`).
 * `expectedOutcome` mapeia `success_criteria` (nome do campo diverge
 * entre os dois documentos, mesmo tratamento de `Alternative.score`/`rawScore`).
 */
export const missions: Mission[] = [
  {
    id: "mission_first_step",
    title: "Primeiro Movimento",
    description: "",
    goal: "Dar início a uma tarefa importante.",
    difficulty: Difficulty.Easy,
    estimatedTime: 5,
    steps: ["Escolher uma tarefa.", "Eliminar distrações.", "Trabalhar durante cinco minutos."],
    expectedOutcome: "A tarefa foi iniciada.",
  },
  {
    id: "mission_focus",
    title: "Bloco de Foco",
    description: "",
    goal: "Treinar concentração.",
    difficulty: Difficulty.Easy,
    estimatedTime: 25,
    steps: ["Ativar modo silencioso.", "Definir temporizador.", "Executar apenas uma tarefa."],
    expectedOutcome: "Completar um bloco sem interrupções.",
  },
  {
    id: "mission_priority",
    title: "Uma Prioridade",
    description: "",
    goal: "Aprender priorização.",
    difficulty: Difficulty.Easy,
    estimatedTime: 10,
    steps: [
      "Escrever todas as tarefas.",
      "Escolher apenas uma prioridade.",
      "Executá-la primeiro.",
    ],
    expectedOutcome: "A prioridade foi concluída.",
  },
];
