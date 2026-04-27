export type ReportRating = 'green' | 'yellow' | 'red';
export type ProductCategory = 'ai-native' | 'ai-enhanced';

export interface ReportFrontmatter {
  slug: string;
  title: string;
  product: string;
  oneLiner: string;
  category: ProductCategory;
  rating: ReportRating;
  ratingLabel: string;
  inspectedAt: string;
  inspector: string;
  tags: string[];
  cover?: string;
  team?: string;
  funding?: string;
  pricing?: string;
  homepage?: string;
}

export interface Report extends ReportFrontmatter {
  body: string;
}

export const CATEGORY_LABEL: Record<ProductCategory, string> = {
  'ai-native': 'AI 原生',
  'ai-enhanced': 'AI 增强',
};

export const RATING_META: Record<ReportRating, { label: string; color: string; bg: string }> = {
  green: { label: '通过', color: '#3d7a3d', bg: 'rgba(61,122,61,0.08)' },
  yellow: { label: '观察', color: '#d4a017', bg: 'rgba(212,160,23,0.10)' },
  red: { label: '不及格', color: '#a31621', bg: 'rgba(163,22,33,0.08)' },
};
