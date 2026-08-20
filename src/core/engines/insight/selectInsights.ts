import type {
  InsightEngine,
  InsightEngineInput,
  InsightEngineOutput,
} from "@/core/contracts/insightEngine";
import type { Insight } from "@/core/domain/insight";
import { Priority } from "@/core/types/enums";

/** DEC-0010 — calibração provisória, sujeita a revisão. */
const PREDOMINANT_THRESHOLD = 20;
const NEUTRAL_MIDPOINT = 50;

const PRIORITY_RANK: Record<Priority, number> = {
  [Priority.Critical]: 0,
  [Priority.High]: 1,
  [Priority.Medium]: 2,
  [Priority.Low]: 3,
};

/**
 * Insight Engine (06_ASSESSMENT_ENGINE.md, Seção 10).
 * Fórmula de "Indicador Predominante": DEC-0010.
 *
 * normalizedIndicatorScore = IndicatorScore.score / Dimension.weight
 * Indicador Predominante ⟺ |normalizedIndicatorScore − 50| ≥ 20
 *
 * Seleciona, dentre `insightLibrary`, os Insights cujo `indicatorId`
 * está entre os indicadores predominantes do usuário, ordenados por
 * `priority` (Critical > High > Medium > Low). Indicadores sem Insight
 * correspondente na Library simplesmente não geram um Insight — não é
 * um erro (DEC-0010).
 */
export const selectInsights: InsightEngine = ({
  indicatorScores,
  indicators,
  dimensions,
  insightLibrary,
}: InsightEngineInput): InsightEngineOutput => {
  const indicatorById = new Map(indicators.map((indicator) => [indicator.id, indicator]));
  const dimensionWeightById = new Map(
    dimensions.map((dimension) => [dimension.id, dimension.weight]),
  );

  const predominantIndicatorIds: string[] = [];

  for (const indicatorScore of indicatorScores) {
    const indicator = indicatorById.get(indicatorScore.indicatorId);
    if (!indicator) continue;

    const dimensionWeight = dimensionWeightById.get(indicator.dimensionId);
    if (dimensionWeight === undefined || dimensionWeight === 0) continue;

    const normalizedIndicatorScore = indicatorScore.score / dimensionWeight;
    if (Math.abs(normalizedIndicatorScore - NEUTRAL_MIDPOINT) >= PREDOMINANT_THRESHOLD) {
      predominantIndicatorIds.push(indicator.id);
    }
  }

  const predominantIndicatorIdSet = new Set(predominantIndicatorIds);

  const selectedInsights: Insight[] = insightLibrary
    .filter((insight) => predominantIndicatorIdSet.has(insight.indicatorId))
    .sort((a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]);

  return { insights: selectedInsights, predominantIndicatorIds };
};
