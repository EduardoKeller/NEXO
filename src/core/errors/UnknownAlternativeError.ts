import { DomainError } from "@/core/errors/DomainError";

/**
 * Uma resposta referenciando uma alternativa que não pertence à
 * pergunta é uma entrada inválida (06_ASSESSMENT_ENGINE.md, Seção 16).
 */
export class UnknownAlternativeError extends DomainError {
  readonly code = "UNKNOWN_ALTERNATIVE";

  constructor(
    public readonly questionId: string,
    public readonly alternativeId: string,
  ) {
    super(`Alternativa desconhecida "${alternativeId}" para a pergunta ${questionId}`);
  }
}
