import type {
  BehaviorEngine,
  BehaviorEngineInput,
  BehaviorEngineOutput,
} from "@/core/contracts/behaviorEngine";
import type { IndicatorScore } from "@/core/contracts/scoreEngine";
import type { BehaviorIndex } from "@/core/domain/behaviorIndex";

/**
 * `BehaviorIndex.confidence` não possui fórmula oficial documentada
 * (diferente de `BehaviorArchetype.confidence`, definido via DEC-0003).
 * Placeholder provisório — ver DEC-0008 (13_DECISION_LOG.md).
 */
const BEHAVIOR_INDEX_CONFIDENCE_PLACEHOLDER = 100;

/**
 * Behavior Engine (06_ASSESSMENT_ENGINE.md, Seção 7).
 * Fórmula oficial: DEC-0008 (13_DECISION_LOG.md).
 *
 * Para cada Dimensão:
 * rawScore = Σ(IndicatorScore × Indicator.weight) / Σ(Indicator.weight)
 * normalizedScore = rawScore / Dimension.weight
 *
 * Indicadores sem score disponível são ignorados de forma defensiva
 * (mesmo padrão da Score Engine) — a garantia de completude é
 * responsabilidade exclusiva da Validation Engine, nunca chamada
 * diretamente por esta Engine.
 */
export const calculateBehaviorIndexes: BehaviorEngine = ({
  indicatorScores,
  dimensions,
  indicators,
}: BehaviorEngineInput): BehaviorEngineOutput => {
  const latestScoreByIndicatorId = new Map<string, IndicatorScore>();
  for (const indicatorScore of indicatorScores) {
    latestScoreByIndicatorId.set(indicatorScore.indicatorId, indicatorScore);
  }

  const behaviorIndexes: BehaviorIndex[] = dimensions.map((dimension) => {
    const dimensionIndicators = indicators.filter(
      (indicator) => indicator.dimensionId === dimension.id,
    );

    let weightedScoreSum = 0;
    let weightSum = 0;

    for (const indicator of dimensionIndicators) {
      const indicatorScore = latestScoreByIndicatorId.get(indicator.id);
      if (!indicatorScore) continue;

      weightedScoreSum += indicatorScore.score * indicator.weight;
      weightSum += indicator.weight;
    }

    const rawScore = weightSum === 0 ? 0 : weightedScoreSum / weightSum;
    const normalizedScore = dimension.weight === 0 ? 0 : rawScore / dimension.weight;

    return {
      id: `behavior_index_${dimension.id}`,
      dimensionId: dimension.id,
      rawScore,
      normalizedScore,
      confidence: BEHAVIOR_INDEX_CONFIDENCE_PLACEHOLDER,
    };
  });

  return { behaviorIndexes };
};
