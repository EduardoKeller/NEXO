import type {
  EvolutionEngine,
  EvolutionEngineInput,
  EvolutionEngineOutput,
} from "@/core/contracts/evolutionEngine";
import type { EvolutionPlan } from "@/core/domain/evolutionPlan";
import { Difficulty } from "@/core/types/enums";

/**
 * 05_CONTENT_LIBRARY.md, Seção 19: "O MVP utilizará apenas planos
 * Easy." / "No MVP. 7 dias." — constantes oficiais do MVP, não
 * calibração (DEC-0011).
 */
const MVP_DIFFICULTY = Difficulty.Easy;
const MVP_ESTIMATED_DURATION_DAYS = 7;

/**
 * Evolution Engine (06_ASSESSMENT_ENGINE.md, Seção 11).
 * Escopo e regras: DEC-0011.
 *
 * Monta o plano exclusivamente a partir do conteúdo de evolução do
 * Arquétipo vencedor. IDs de missão/recurso que não existem nas
 * respectivas Libraries são filtrados silenciosamente; um Arquétipo
 * sem conteúdo de evolução documentado (além de `firstStep`) produz
 * `habits`/`missions`/`resources` vazios — nenhum dos dois é um erro.
 */
export const buildEvolutionPlan: EvolutionEngine = ({
  archetypeId,
  archetypeEvolutionContent,
  missionLibrary,
  resourceLibrary,
}: EvolutionEngineInput): EvolutionEngineOutput => {
  const content = archetypeEvolutionContent.find((item) => item.archetypeId === archetypeId);

  const missionIds = new Set(missionLibrary.map((mission) => mission.id));
  const resourceIds = new Set(resourceLibrary.map((resource) => resource.id));

  const missions = (content?.recommendedMissionIds ?? []).filter((id) => missionIds.has(id));
  const resources = (content?.recommendedResourceIds ?? []).filter((id) => resourceIds.has(id));

  const evolutionPlan: EvolutionPlan = {
    id: `evolution_plan_${archetypeId}`,
    firstStep: content?.firstStep ?? "",
    habits: content?.recommendedHabits ?? [],
    missions,
    resources,
    estimatedDuration: MVP_ESTIMATED_DURATION_DAYS,
    difficulty: MVP_DIFFICULTY,
  };

  return { evolutionPlan };
};
