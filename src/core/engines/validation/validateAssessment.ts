import type {
  ValidationEngine,
  ValidationEngineInput,
  ValidationEngineOutput,
} from "@/core/contracts/validationEngine";
import type { DomainError } from "@/core/errors/DomainError";
import { DuplicateAnswerError } from "@/core/errors/DuplicateAnswerError";
import { IncompleteAssessmentError } from "@/core/errors/IncompleteAssessmentError";
import { UnknownAlternativeError } from "@/core/errors/UnknownAlternativeError";
import { UnknownQuestionError } from "@/core/errors/UnknownQuestionError";

/**
 * Validation Engine (06_ASSESSMENT_ENGINE.md, Seção 5).
 *
 * Valida, nesta ordem: referência de pergunta, referência de
 * alternativa dentro da pergunta correta, ausência de respostas
 * duplicadas e completude (todas as perguntas respondidas —
 * 04_BUSINESS_RULES.md, Seção 18). Acumula todos os erros encontrados
 * em vez de parar no primeiro, para que o resultado seja útil à
 * camada de orquestração.
 *
 * Nunca lança exceção para controle de fluxo — retorna sempre um
 * resultado explícito, conforme `ValidationEngineOutput`.
 */
export const validateAssessment: ValidationEngine = ({
  assessment,
  answers,
}: ValidationEngineInput): ValidationEngineOutput => {
  const errors: DomainError[] = [];

  const questionsById = new Map(assessment.questions.map((question) => [question.id, question]));
  const answerCountByQuestionId = new Map<string, number>();
  const answeredQuestionIds = new Set<string>();

  for (const answer of answers) {
    answerCountByQuestionId.set(
      answer.questionId,
      (answerCountByQuestionId.get(answer.questionId) ?? 0) + 1,
    );

    const question = questionsById.get(answer.questionId);
    if (!question) {
      errors.push(new UnknownQuestionError(answer.questionId));
      continue;
    }

    answeredQuestionIds.add(question.id);

    const alternativeExists = question.alternatives.some(
      (alternative) => alternative.id === answer.alternativeId,
    );
    if (!alternativeExists) {
      errors.push(new UnknownAlternativeError(question.id, answer.alternativeId));
    }
  }

  for (const [questionId, count] of answerCountByQuestionId) {
    if (count > 1) {
      errors.push(new DuplicateAnswerError(questionId));
    }
  }

  const missingQuestionIds = assessment.questions
    .map((question) => question.id)
    .filter((id) => !answeredQuestionIds.has(id));

  if (missingQuestionIds.length > 0) {
    errors.push(new IncompleteAssessmentError(missingQuestionIds));
  }

  return errors.length === 0 ? { valid: true } : { valid: false, errors };
};
