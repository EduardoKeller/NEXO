import type { ArchetypeReferenceProfile } from "@/core/domain/archetypeReferenceProfile";
import type { BehaviorIndex } from "@/core/domain/behaviorIndex";
import type { Dimension } from "@/core/domain/dimension";
import type { ConfidenceLevel } from "@/core/types/enums";

/**
 * Contrato da Archetype Resolver (06_ASSESSMENT_ENGINE.md, Seção 9).
 * Fórmula: DEC-0003 (distância + confidence). Desempate: DEC-0009.
 *
 * `ArchetypeResolverOutput` não é o `BehaviorArchetype` completo de
 * 07_DATA_MODEL.md, Seção 12 — não inclui `matchedIndicators` (pendência
 * documental, DEC-0009) nem `summary`/`slug`/`name` (conteúdo ainda não
 * carregado). É um tipo de fronteira desta Engine, mesma categoria de
 * `ScoreEngineOutput`/`BehaviorEngineOutput`.
 *
 * Usa `BehaviorIndex.normalizedScore` (nunca `rawScore`) — é a única
 * escala compatível com `ArchetypeReferenceProfile.referenceProfile`
 * (0-100).
 */
export interface ArchetypeResolverInput {
  behaviorIndexes: BehaviorIndex[];
  archetypeProfiles: ArchetypeReferenceProfile[];
  dimensions: Dimension[];
}

export interface ArchetypeDistance {
  archetypeId: string;
  distance: number;
}

export interface ArchetypeResolverOutput {
  archetypeId: string;
  confidence: number;
  confidenceLevel: ConfidenceLevel;
  distances: ArchetypeDistance[];
}

export type ArchetypeResolver = (input: ArchetypeResolverInput) => ArchetypeResolverOutput;
