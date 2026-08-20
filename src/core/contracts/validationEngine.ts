import type { Answer } from "@/core/domain/answer";
import type { Assessment } from "@/core/domain/assessment";
import type { DomainError } from "@/core/errors/DomainError";

/**
 * Contrato da Validation Engine (06_ASSESSMENT_ENGINE.md, Seção 5).
 * Segue o padrão obrigatório Input → Validation → Processing → Output
 * (12B_ARCHITECTURE_PATTERNS.md, Seção 12) e o princípio de Pure
 * Functions (mesma Seção 8): a Engine nunca lança exceção para
 * controle de fluxo — retorna um resultado explícito, permitindo que a
 * camada de orquestração decida o que fazer com falhas de validação.
 */
export interface ValidationEngineInput {
  assessment: Assessment;
  answers: Answer[];
}

export type ValidationEngineOutput = { valid: true } | { valid: false; errors: DomainError[] };

export type ValidationEngine = (input: ValidationEngineInput) => ValidationEngineOutput;
