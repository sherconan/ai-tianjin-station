import Link from 'next/link';
import { StationSeal } from '@/components/Stamp';

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <StationSeal size={120} />
      <h1 className="text-3xl font-serif font-bold mt-6 text-ink">档案未归档</h1>
      <p className="text-ink-muted mt-2 font-mono text-sm">该 slug 在天津站没有备案</p>
      <Link href="/" className="inline-block mt-6 text-seal underline font-serif">
        ← 回档案库
      </Link>
    </div>
  );
}
