/**
 * 07_DATA_MODEL.md, Seção 17. Stub nesta fase — Report Engine
 * (HTML/PDF) é Fase 5, fora de escopo (DEC-0012).
 */
export interface Report {
  id: string;
  template: string;
  language: string;
  generatedAt: Date;
  downloadUrl?: string;
}
