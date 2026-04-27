'use client';

import { useState, useMemo } from 'react';
import type { Report, ProductCategory } from '@/lib/types';
import { CATEGORY_LABEL } from '@/lib/types';
import { ReportCard } from './ReportCard';

type SortMode = 'timeline' | 'category';
type CategoryFilter = 'all' | ProductCategory;

export function ReportsExplorer({ reports }: { reports: Report[] }) {
  const [sort, setSort] = useState<SortMode>('timeline');
  const [filter, setFilter] = useState<CategoryFilter>('all');

  const filtered = useMemo(
    () => (filter === 'all' ? reports : reports.filter((r) => r.category === filter)),
    [reports, filter]
  );

  const grouped = useMemo(() => {
    if (sort === 'timeline') {
      const byMonth = new Map<string, Report[]>();
      filtered.forEach((r) => {
        const m = r.inspectedAt.slice(0, 7);
        if (!byMonth.has(m)) byMonth.set(m, []);
        byMonth.get(m)!.push(r);
      });
      return Array.from(byMonth.entries()).map(([k, v]) => ({
        title: `${k.slice(0, 4)} 年 ${k.slice(5)} 月`,
        items: v,
      }));
    }
    const byCat = new Map<ProductCategory, Report[]>();
    filtered.forEach((r) => {
      if (!byCat.has(r.category)) byCat.set(r.category, []);
      byCat.get(r.category)!.push(r);
    });
    return Array.from(byCat.entries()).map(([k, v]) => ({
      title: CATEGORY_LABEL[k],
      items: v,
    }));
  }, [filtered, sort]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-8 pb-4 border-b border-dashed border-gold/40">
        <span className="font-mono text-xs tracking-widest text-ink-muted uppercase">
          排序
        </span>
        <div className="inline-flex rounded-archive overflow-hidden border border-gold/50">
          {(['timeline', 'category'] as SortMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setSort(m)}
              className={`px-3 py-1.5 text-sm font-serif transition-colors ${
                sort === m
                  ? 'bg-seal text-paper-soft'
                  : 'bg-paper-soft text-ink hover:bg-paper-deep'
              }`}
            >
              {m === 'timeline' ? '时间线' : '分类聚合'}
            </button>
          ))}
        </div>

        <span className="font-mono text-xs tracking-widest text-ink-muted uppercase ml-4">
          类别
        </span>
        <div className="inline-flex rounded-archive overflow-hidden border border-gold/50">
          {(['all', 'ai-native', 'ai-enhanced'] as CategoryFilter[]).map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-3 py-1.5 text-sm font-serif transition-colors ${
                filter === c
                  ? 'bg-ink text-paper-soft'
                  : 'bg-paper-soft text-ink hover:bg-paper-deep'
              }`}
            >
              {c === 'all' ? '全部' : CATEGORY_LABEL[c]}
            </button>
          ))}
        </div>

        <span className="ml-auto text-xs font-mono text-ink-muted">
          共 {filtered.length} 份档案
        </span>
      </div>

      {grouped.map((g) => (
        <section key={g.title} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-lg font-serif font-bold text-seal tracking-wide">
              {g.title}
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-gold/50 via-gold/20 to-transparent" />
            <span className="font-mono text-xs text-ink-muted">{g.items.length} 份</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {g.items.map((r) => (
              <ReportCard key={r.slug} report={r} />
            ))}
          </div>
        </section>
      ))}

      {filtered.length === 0 && (
        <div className="text-center py-20 text-ink-muted">
          <p className="font-serif text-lg">该分类暂无飞检档案</p>
          <p className="font-mono text-xs mt-2">站长稍后补办</p>
        </div>
      )}
    </div>
  );
}
