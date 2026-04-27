import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Report, ReportFrontmatter } from './types';

const REPORTS_DIR = path.join(process.cwd(), 'content', 'reports');

export function getAllReports(): Report[] {
  if (!fs.existsSync(REPORTS_DIR)) return [];
  const files = fs.readdirSync(REPORTS_DIR).filter((f) => f.endsWith('.mdx'));
  const reports = files.map((file) => {
    const raw = fs.readFileSync(path.join(REPORTS_DIR, file), 'utf-8');
    const { data, content } = matter(raw);
    const slug = (data.slug as string) || file.replace(/\.mdx$/, '');
    return { ...(data as ReportFrontmatter), slug, body: content };
  });
  return reports.sort((a, b) => (a.inspectedAt < b.inspectedAt ? 1 : -1));
}

export function getReportBySlug(slug: string): Report | null {
  const all = getAllReports();
  return all.find((r) => r.slug === slug) ?? null;
}

export type { Report, ReportFrontmatter, ReportRating, ProductCategory } from './types';
export { CATEGORY_LABEL, RATING_META } from './types';
