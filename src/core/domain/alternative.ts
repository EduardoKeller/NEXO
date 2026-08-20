/**
 * 07_DATA_MODEL.md, Seção 7.
 */
export interface Alternative {
  id: string;
  label: string;
  description?: string;
  score: number;
  behaviorEvidence: string[];
}
