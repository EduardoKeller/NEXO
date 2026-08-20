import type { IndicatorScore } from "@/core/contracts/scoreEngine";
import type { Dimension } from "@/core/domain/dimension";
import type { Indicator } from "@/core/domain/indicator";
import type { Insight } from "@/core/domain/insight";

/**
 * Contrato da Insight Engine (06_ASSESSMENT_ENGINE.md, Seção 10).
 * Fórmula de "Indicador Predominante": DEC-0010.
 *
 * `archetypeId` é recebido fielmente ao contrato documentado
 * ("Recebe: Arquétipo; Índices; Indicadores predominantes"), mas não
 * filtra a seleção nesta versão — nenhuma regra operacional de uso do
 * Arquétipo na seleção de Insights está documentada (DEC-0010).
 *
 * `strengths`/`attentionPoints` não são produzidos aqui — vêm do
 * conteúdo do Arquétipo vencedor, resolvido no Result Builder
 * (DEC-0010).
 */
export interface InsightEngineInput {
  archetypeId: string;
  indicatorScores: IndicatorScore[];
  indicators: Indicator[];
  dimensions: Dimension[];
  insightLibrary: Insight[];
}

export interface InsightEngineOutput {
  insights: Insight[];
  predominantIndicatorIds: string[];
}

export type InsightEngine = (input: InsightEngineInput) => InsightEngineOutput;
