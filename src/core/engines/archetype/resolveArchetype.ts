import type {
  ArchetypeDistance,
  ArchetypeResolver,
  ArchetypeResolverInput,
  ArchetypeResolverOutput,
} from "@/core/contracts/archetypeResolver";
import type { ArchetypeReferenceProfile } from "@/core/domain/archetypeReferenceProfile";
import { ConfidenceLevel } from "@/core/types/enums";

/** Tolerância para tratar duas distâncias de ponto flutuante como empatadas. */
const DISTANCE_TIE_EPSILON = 1e-9;

/**
 * Prioridade oficial de desempate (04_BUSINESS_RULES.md, Seção 16,
 * critério 5), usada apenas como último recurso.
 */
const TIE_BREAK_PRIORITY_ORDER = [
  "strategic_refiner",
  "analytical_explorer",
  "executor_under_pressure",
  "priority_accumulator",
];

function euclideanDistance(
  userNormalizedScoreByDimensionId: Map<string, number>,
  dimensionWeightById: Map<string, number>,
  referenceProfile: Record<string, number>,
): number {
  let sumOfSquares = 0;
  for (const [dimensionId, referenceValue] of Object.entries(referenceProfile)) {
    const userValue = userNormalizedScoreByDimensionId.get(dimensionId) ?? 0;
    const weight = dimensionWeightById.get(dimensionId) ?? 0;
    sumOfSquares += weight * (userValue - referenceValue) ** 2;
  }
  return Math.sqrt(sumOfSquares);
}

/**
 * Exportada para testes: `resolveArchetype` só produz confidence no
 * intervalo [50, 100] (a segunda menor distância é sempre >= a menor,
 * por definição), então `VeryLow`/`Low`/parte de `Medium` nunca são
 * alcançados pela Engine em uso normal — testados diretamente aqui.
 */
export function confidenceLevelFor(confidence: number): ConfidenceLevel {
  if (confidence <= 20) return ConfidenceLevel.VeryLow;
  if (confidence <= 40) return ConfidenceLevel.Low;
  if (confidence <= 60) return ConfidenceLevel.Medium;
  if (confidence <= 80) return ConfidenceLevel.High;
  return ConfidenceLevel.VeryHigh;
}

/**
 * Aplica os critérios de desempate de 04_BUSINESS_RULES.md, Seção 16,
 * conforme reinterpretados em DEC-0009: critério 1 (Confidence Score)
 * é um no-op documentado (nunca decide, pois a segunda menor distância
 * em um empate real é a do próprio arquétipo empatado); critérios 2-3
 * comparam `reference_profile` do arquétipo candidato; critério 4
 * (Indicadores predominantes) é pulado — pendente de definição oficial;
 * critério 5 é a prioridade fixa, aplicada por último.
 */
function breakTie(tiedCandidates: ArchetypeReferenceProfile[]): ArchetypeReferenceProfile {
  if (tiedCandidates.length === 1) return tiedCandidates[0];

  const byConsistency = maxBy(
    tiedCandidates,
    (candidate) => candidate.referenceProfile.consistency ?? 0,
  );
  if (byConsistency.length === 1) return byConsistency[0];

  const byPlanning = maxBy(byConsistency, (candidate) => candidate.referenceProfile.planning ?? 0);
  if (byPlanning.length === 1) return byPlanning[0];

  for (const archetypeId of TIE_BREAK_PRIORITY_ORDER) {
    const match = byPlanning.find((candidate) => candidate.id === archetypeId);
    if (match) return match;
  }

  return byPlanning[0];
}

function maxBy<T>(items: T[], selector: (item: T) => number): T[] {
  const maxValue = Math.max(...items.map(selector));
  return items.filter((item) => Math.abs(selector(item) - maxValue) < DISTANCE_TIE_EPSILON);
}

/**
 * Archetype Resolver (06_ASSESSMENT_ENGINE.md, Seção 9).
 * Fórmula: DEC-0003. Desempate: DEC-0009.
 *
 * `matchedIndicators` não é produzido nesta etapa — pendência
 * documental registrada em DEC-0009 ("Indicador predominante" nunca
 * foi definido em nenhum documento).
 */
export const resolveArchetype: ArchetypeResolver = ({
  behaviorIndexes,
  archetypeProfiles,
  dimensions,
}: ArchetypeResolverInput): ArchetypeResolverOutput => {
  const userNormalizedScoreByDimensionId = new Map(
    behaviorIndexes.map((index) => [index.dimensionId, index.normalizedScore]),
  );
  const dimensionWeightById = new Map(
    dimensions.map((dimension) => [dimension.id, dimension.weight]),
  );

  const distances: ArchetypeDistance[] = archetypeProfiles.map((archetype) => ({
    archetypeId: archetype.id,
    distance: euclideanDistance(
      userNormalizedScoreByDimensionId,
      dimensionWeightById,
      archetype.referenceProfile,
    ),
  }));

  const sortedDistances = [...distances].sort((a, b) => a.distance - b.distance);
  const bestDistance = sortedDistances[0].distance;
  const secondBestDistance = sortedDistances[1]?.distance ?? bestDistance;

  const tiedCandidateIds = new Set(
    sortedDistances
      .filter((item) => Math.abs(item.distance - bestDistance) < DISTANCE_TIE_EPSILON)
      .map((item) => item.archetypeId),
  );
  const tiedCandidates = archetypeProfiles.filter((archetype) =>
    tiedCandidateIds.has(archetype.id),
  );

  const winner = breakTie(tiedCandidates);

  const confidenceDenominator = bestDistance + secondBestDistance;
  const confidence =
    confidenceDenominator === 0
      ? 100
      : Math.round(100 * (1 - bestDistance / confidenceDenominator));

  return {
    archetypeId: winner.id,
    confidence,
    confidenceLevel: confidenceLevelFor(confidence),
    distances,
  };
};
