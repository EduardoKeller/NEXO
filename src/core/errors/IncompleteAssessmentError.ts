import { DomainError } from "@/core/errors/DomainError";

/**
 * 04_BUSINESS_RULES.md, Seção 18: "Todas as perguntas forem
 * respondidas. Nenhuma resposta poderá ficar vazia."
 */
export class IncompleteAssessmentError extends DomainError {
  readonly code = "INCOMPLETE_ASSESSMENT";

  constructor(public readonly missingQuestionIds: string[]) {
    super(`Perguntas sem resposta: ${missingQuestionIds.join(", ")}`);
  }
}
