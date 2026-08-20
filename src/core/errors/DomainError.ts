/**
 * Base para erros de domínio da NEXO. Nunca usar `throw new Error()`
 * genérico (09B_CODE_STYLE.md, Tratamento de Erros).
 */
export abstract class DomainError extends Error {
  abstract readonly code: string;
}
