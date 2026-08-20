import type { ArchetypeResolverOutput } from "@/core/contracts/archetypeResolver";
import type { ArchetypeProfile } from "@/core/domain/archetypeProfile";
import type { ArchetypeReferenceProfile } from "@/core/domain/archetypeReferenceProfile";
import type { Assessment } from "@/core/domain/assessment";
import type { AssessmentResult } from "@/core/domain/assessmentResult";
import type { BehaviorIndex } from "@/core/domain/behaviorIndex";
import type { EvolutionPlan } from "@/core/domain/evolutionPlan";
import type { Insight } from "@/core/domain/insight";
import type { Mission } from "@/core/domain/mission";
import type { Resource } from "@/core/domain/resource";

/**
 * Contrato do Result Builder (06_ASSESSMENT_ENGINE.md, Seção 13).
 * Escopo e regras: DEC-0012.
 *
 * Recebe exclusivamente outputs já calculados pelas Engines
 * anteriores (Validation, Score, Behavior, Archetype, Insight,
 * Evolution) — é um Factory/aggregator puro (12B_ARCHITECTURE_PATTERNS.md,
 * Seção 9), nunca recalcula fórmula ou regra de negócio de nenhuma
 * Engine.
 */
export interface ResultBuilderInput {
  assessment: Assessment;
  behaviorIndexes: BehaviorIndex[];
  archetypeResolverOutput: ArchetypeResolverOutput;
  archetypeReferenceProfiles: ArchetypeReferenceProfile[];
  archetypeProfiles: ArchetypeProfile[];
  insights: Insight[];
  predominantIndicatorIds: string[];
  evolutionPlan: EvolutionPlan;
  missionLibrary: Mission[];
  resourceLibrary: Resource[];
}

export interface ResultBuilderOutput {
  assessmentResult: AssessmentResult;
}

export type ResultBuilder = (input: ResultBuilderInput) => ResultBuilderOutput;
