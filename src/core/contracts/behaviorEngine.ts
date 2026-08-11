import type { IndicatorScore } from "@/core/contracts/scoreEngine";
import type { BehaviorIndex } from "@/core/domain/behaviorIndex";
import type { Dimension } from "@/core/domain/dimension";
import type { Indicator } from "@/core/domain/indicator";

/**
 * Contrato do Behavior Engine (06_ASSESSMENT_ENGINE.md, Seção 7).
 * Fórmula oficial: DEC-0008 (13_DECISION_LOG.md).
 *
 * Assume `indicatorScores` já calculado pela Score Engine — o Behavior
 * Engine nunca chama outra Engine diretamente (12B_ARCHITECTURE_PATTERNS.md,
 * Seção 12); a orquestração entre Engines é responsabilidade de uma
 * camada externa, ainda não implementada nesta Sprint.
 *
 * Recebe apenas `dimensions`/`indicators` (não `Assessment` completo,
 * nem `questions`) — é exatamente o que a fórmula de DEC-0008 precisa.
 */
export interface BehaviorEngineInput {
  indicatorScores: IndicatorScore[];
  dimensions: Dimension[];
  indicators: Indicator[];
}

export interface BehaviorEngineOutput {
  behaviorIndexes: BehaviorIndex[];
}

export type BehaviorEngine = (input: BehaviorEngineInput) => BehaviorEngineOutput;
