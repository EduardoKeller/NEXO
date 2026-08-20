/**
 * 07_DATA_MODEL.md, Seção 9.
 */
export interface Dimension {
  id: string;
  slug: string;
  name: string;
  description: string;
  weight: number;
  indicatorIds: string[];
}
