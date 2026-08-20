import type { ArchetypeEvolutionContent } from "@/core/domain/archetypeEvolutionContent";
import type { BehaviorIndex } from "@/core/domain/behaviorIndex";
import type { EvolutionPlan } from "@/core/domain/evolutionPlan";
import type { Insight } from "@/core/domain/insight";
import type { Mission } from "@/core/domain/mission";
import type { Resource } from "@/core/domain/resource";

/**
 * Contrato da Evolution Engine (06_ASSESSMENT_ENGINE.md, Seção 11).
 * Escopo e regras: DEC-0011.
 *
 * `behaviorIndexes`/`insights` são mantidos fielmente ao input
 * documentado ("Recebe: Arquétipo; Índices; Insights"), mas não
 * filtram a montagem do plano nesta versão — nenhuma regra
 * operacional de uso está documentada (mesmo padrão de `archetypeId`
 * na Insight Engine, DEC-0010).
 */
export interface EvolutionEngineInput {
  archetypeId: string;
  archetypeEvolutionContent: ArchetypeEvolutionContent[];
  missionLibrary: Mission[];
  resourceLibrary: Resource[];
  behaviorIndexes: BehaviorIndex[];
  insights: Insight[];
}

export interface EvolutionEngineOutput {
  evolutionPlan: EvolutionPlan;
}

export type EvolutionEngine = (input: EvolutionEngineInput) => EvolutionEngineOutput;
