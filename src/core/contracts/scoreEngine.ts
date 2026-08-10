import type { Answer } from "@/core/domain/answer";
import type { Assessment } from "@/core/domain/assessment";

/**
 * Contrato da Score Engine (06_ASSESSMENT_ENGINE.md, Seção 6).
 *
 * Assume respostas já validadas pela Validation Engine — a Score
 * Engine "nunca interpreta resultados, ela apenas calcula" (mesma
 * Seção). Respostas que referenciam pergunta ou alternativa
 * inexistente são ignoradas de forma defensiva (nunca lançam
 * exceção); respostas duplicadas para a mesma pergunta usam a última
 * ocorrência do array. Detectar e rejeitar essas condições é
 * responsabilidade exclusiva da Validation Engine.
 *
 * Não calcula score por dimensão: a agregação de indicadores em uma
 * Dimensão, ponderada por `Indicator.weight`, é responsabilidade
 * exclusiva do Behavior Engine (decisão registrada nesta etapa da
 * implementação, sem novo Decision Record — é um detalhe de
 * fronteira entre Engines, não uma decisão de negócio).
 */
export interface ScoreEngineInput {
  assessment: Assessment;
  answers: Answer[];
}

export interface QuestionScore {
  questionId: string;
  score: number;
}

export interface IndicatorScore {
  indicatorId: string;
  score: number;
}

export interface ScoreEngineOutput {
  questionScores: QuestionScore[];
  indicatorScores: IndicatorScore[];
}

export type ScoreEngine = (input: ScoreEngineInput) => ScoreEngineOutput;
