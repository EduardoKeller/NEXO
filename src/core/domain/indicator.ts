/**
 * 07_DATA_MODEL.md, Seção 10.
 */
export interface Indicator {
  id: string;
  slug: string;
  dimensionId: string;
  name: string;
  description: string;
  weight: number;
}
