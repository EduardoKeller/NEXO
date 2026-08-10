import { DomainError } from "@/core/errors/DomainError";

/**
 * 06_ASSESSMENT_ENGINE.md, Seção 16: "Nunca confiar em dados enviados
 * pelo cliente." Uma resposta referenciando uma pergunta inexistente
 * na Assessment é uma entrada inválida, não uma pergunta sem resposta.
 */
export class UnknownQuestionError extends DomainError {
  readonly code = "UNKNOWN_QUESTION";

  constructor(public readonly questionId: string) {
    super(`Pergunta desconhecida: ${questionId}`);
  }
}
