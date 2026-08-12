import type { ArchetypeEvolutionContent } from "@/core/domain/archetypeEvolutionContent";

/**
 * 05_CONTENT_LIBRARY.md, Seção 17 (Archetype Library).
 * Só o Arquétipo 01 tem os 4 campos preenchidos; os demais só têm
 * `first_step` — não é inventado aqui (DEC-0011). `mission_deadline` e
 * `article_deadlines` (Arquétipo 01) não existem em `missions.ts`/
 * `resources.ts` — referências quebradas, filtradas pela Engine.
 */
export const archetypeEvolutionContent: ArchetypeEvolutionContent[] = [
  {
    archetypeId: "executor_under_pressure",
    firstStep: "Criar prazos intermediários para tarefas importantes.",
    recommendedHabits: ["Planejamento diário.", "Revisão semanal."],
    recommendedMissionIds: ["mission_deadline"],
    recommendedResourceIds: ["article_deadlines"],
  },
  {
    archetypeId: "strategic_refiner",
    firstStep: "Definir um limite de tempo para o planejamento antes de começar a execução.",
    recommendedHabits: [],
    recommendedMissionIds: [],
    recommendedResourceIds: [],
  },
  {
    archetypeId: "analytical_explorer",
    firstStep: "Tomar pequenas decisões com tempo limitado.",
    recommendedHabits: [],
    recommendedMissionIds: [],
    recommendedResourceIds: [],
  },
  {
    archetypeId: "priority_accumulator",
    firstStep: "Eliminar uma prioridade antes de adicionar outra.",
    recommendedHabits: [],
    recommendedMissionIds: [],
    recommendedResourceIds: [],
  },
];
