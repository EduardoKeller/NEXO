/**
 * Calibração provisória v0.1 — DEC-0007 (13_DECISION_LOG.md).
 *
 * Destrava a Fase 4 (07E_IMPLEMENTATION_GUIDE.md) na ausência de valores
 * oficiais de Alternative.score, Question.weight (Q002-Q010) e
 * Indicator.weight em 05_CONTENT_LIBRARY.md. NÃO representa uma
 * calibração definitiva de negócio — sujeita a revisão/substituição
 * após validação de produto ou dados reais de uso, sem exigir nenhuma
 * alteração em core/engines/.
 */
export const calibrationVersion = "v0.1" as const;

/**
 * Score por alternativa (A-D): escala Likert uniforme e igualmente
 * espaçada, assumindo que a ordem de autoria A→D já reflete intensidade
 * decrescente de expressão do Indicador Principal da pergunta.
 */
export const alternativeScoreV0_1 = {
  A: 100,
  B: 67,
  C: 33,
  D: 0,
} as const;

/** Question.weight uniforme para Q002-Q010 (Q001 mantém 1.0, valor já oficial). */
export const questionWeightV0_1 = 1.0;

/** Indicator.weight uniforme para os 10 indicadores oficiais. */
export const indicatorWeightV0_1 = 1.0;
