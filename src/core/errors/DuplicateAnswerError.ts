import { DomainError } from "@/core/errors/DomainError";

/**
 * Mais de uma resposta para a mesma pergunta é uma entrada ambígua —
 * o Score Engine nunca deve decidir arbitrariamente qual resposta usar.
 */
export class DuplicateAnswerError extends DomainError {
  readonly code = "DUPLICATE_ANSWER";

  constructor(public readonly questionId: string) {
    super(`Mais de uma resposta para a pergunta ${questionId}`);
  }
}
