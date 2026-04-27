import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { getAllReports, getReportBySlug, CATEGORY_LABEL } from '@/lib/reports';
import { RatingStamp, StationSeal } from '@/components/Stamp';

export async function generateStaticParams() {
  return getAllReports().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const report = getReportBySlug(params.slug);
  if (!report) return {};
  return {
    title: `${report.product} 飞检档案 · 吴敬中飞行检查`,
    description: report.oneLiner,
  };
}

export default function ReportPage({ params }: { params: { slug: string } }) {
  const report = getReportBySlug(params.slug);
  if (!report) notFound();

  return (
    <article className="max-w-3xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-xs font-mono text-ink-muted hover:text-seal mb-6"
      >
        ← 返回档案库
      </Link>

      <header className="mb-8 pb-6 border-b-2 border-double border-seal/50 relative">
        <div className="absolute right-0 top-0 hidden md:block">
          <StationSeal size={80} />
        </div>

        <div className="font-mono text-[10px] tracking-[0.3em] text-ink-muted uppercase mb-2">
          档案编号 №{report.slug} · 检察官 {report.inspector}
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-ink mb-3 leading-tight">
          飞检档案 ·《{report.product}》
        </h1>
        <p className="text-lg text-ink-soft mb-4 leading-relaxed">{report.oneLiner}</p>

        <div className="flex flex-wrap gap-3 items-center">
          <RatingStamp rating={report.rating} label={report.ratingLabel} size="lg" />
          <span className="font-mono text-xs text-ink-muted">
            {report.inspectedAt} · {CATEGORY_LABEL[report.category]}
          </span>
          {report.homepage && (
            <a
              href={report.homepage}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-seal underline ml-auto"
            >
              产品官网 →
            </a>
          )}
        </div>

        <dl className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {report.team && (
            <div className="bg-paper-deep/40 p-2.5 rounded-archive">
              <dt className="font-mono text-ink-muted mb-1">团队</dt>
              <dd className="font-serif text-ink">{report.team}</dd>
            </div>
          )}
          {report.funding && (
            <div className="bg-paper-deep/40 p-2.5 rounded-archive">
              <dt className="font-mono text-ink-muted mb-1">融资</dt>
              <dd className="font-serif text-ink">{report.funding}</dd>
            </div>
          )}
          {report.pricing && (
            <div className="bg-paper-deep/40 p-2.5 rounded-archive">
              <dt className="font-mono text-ink-muted mb-1">定价</dt>
              <dd className="font-serif text-ink">{report.pricing}</dd>
            </div>
          )}
        </dl>
      </header>

      <div className="prose-archive">
        <MDXRemote
          source={report.body}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug],
            },
          }}
        />
      </div>

      <footer className="mt-12 pt-6 border-t-2 border-double border-seal/50 text-center">
        <div className="inline-flex flex-col items-center gap-2">
          <StationSeal size={70} />
          <p className="font-mono text-[10px] tracking-[0.2em] text-ink-muted">
            档案归档 · {report.inspectedAt}
          </p>
          <p className="font-serif text-sm text-seal italic">「凡是来天津站的，都得过这关」</p>
        </div>
      </footer>
    </article>
  );
}
