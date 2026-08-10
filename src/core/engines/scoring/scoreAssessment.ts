import type {
  IndicatorScore,
  QuestionScore,
  ScoreEngine,
  ScoreEngineInput,
  ScoreEngineOutput,
} from "@/core/contracts/scoreEngine";
import type { Answer } from "@/core/domain/answer";

/**
 * Score Engine (06_ASSESSMENT_ENGINE.md, Seção 6).
 *
 * Fórmula oficial (04_BUSINESS_RULES.md, Seção 9):
 * score = Alternative.score × Question.weight × Dimension.weight
 *
 * Nenhum valor é fixado no código — todo `score`/`weight` vem de
 * `core/content/` (Alternative.score e Question.weight de Q002–Q010
 * carregam calibração v0.1, via `core/content/calibrationV0_1.ts`;
 * Dimension.weight e o `weight` de Q001 já eram oficiais).
 *
 * `score por indicador` = score da pergunta cujo `primaryIndicatorId`
 * corresponde a esse indicador (relação 1:1 nos dados atuais,
 * garantida pelo teste de integridade em `core/content/content.test.ts`).
 */
export const scoreAssessment: ScoreEngine = ({
  assessment,
  answers,
}: ScoreEngineInput): ScoreEngineOutput => {
  const questionsById = new Map(assessment.questions.map((question) => [question.id, question]));
  const dimensionsById = new Map(
    assessment.dimensions.map((dimension) => [dimension.id, dimension]),
  );

  const latestAnswerByQuestionId = new Map<string, Answer>();
  for (const answer of answers) {
    latestAnswerByQuestionId.set(answer.questionId, answer);
  }

  const questionScores: QuestionScore[] = [];
  const indicatorScores: IndicatorScore[] = [];

  for (const [questionId, answer] of latestAnswerByQuestionId) {
    const question = questionsById.get(questionId);
    if (!question) continue;

    const alternative = question.alternatives.find((item) => item.id === answer.alternativeId);
    if (!alternative) continue;

    const dimension = dimensionsById.get(question.dimensionId);
    if (!dimension) continue;

    const score = alternative.score * question.weight * dimension.weight;
    questionScores.push({ questionId: question.id, score });
    indicatorScores.push({ indicatorId: question.primaryIndicatorId, score });
  }

  return { questionScores, indicatorScores };
};
