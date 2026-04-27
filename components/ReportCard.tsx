import Link from 'next/link';
import type { Report } from '@/lib/types';
import { CATEGORY_LABEL } from '@/lib/types';
import { RatingStamp } from './Stamp';

export function ReportCard({ report }: { report: Report }) {
  const date = report.inspectedAt;
  const catLabel = CATEGORY_LABEL[report.category];
  return (
    <Link
      href={`/reports/${report.slug}`}
      className="group archive-card block p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-16px_rgba(60,40,20,0.4)] hover:border-seal/50"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[10px] tracking-[0.2em] text-ink-muted uppercase">
            档案 №{report.slug.slice(0, 8)}
          </span>
          <span className="font-mono text-[10px] tracking-widest text-ink-muted">
            {date} · {catLabel}
          </span>
        </div>
        <RatingStamp rating={report.rating} label={report.ratingLabel} size="sm" />
      </div>

      {report.cover && (
        <div className="relative -mx-5 mb-3 overflow-hidden">
          <img
            src={report.cover}
            alt={report.product}
            className="w-full h-40 object-cover border-y border-gold/30 grayscale-[20%] group-hover:grayscale-0 transition-all"
          />
        </div>
      )}

      <h3 className="text-2xl font-bold text-ink mb-1 leading-tight">
        {report.product}
      </h3>
      <p className="text-sm text-ink-muted mb-3 leading-relaxed line-clamp-2">
        {report.oneLiner}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {report.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-mono px-2 py-0.5 border border-gold/40 text-ink-muted bg-paper-deep/40 rounded-archive"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-dashed border-gold/30">
        <span className="text-xs text-ink-muted font-mono">
          检察官 · {report.inspector}
        </span>
        <span className="text-xs text-seal font-bold group-hover:translate-x-1 transition-transform">
          查阅档案 →
        </span>
      </div>
    </Link>
  );
}
