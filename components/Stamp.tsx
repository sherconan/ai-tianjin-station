import type { ReportRating } from '@/lib/types';
import { RATING_META } from '@/lib/types';

interface StampProps {
  rating: ReportRating;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function RatingStamp({ rating, label, size = 'md' }: StampProps) {
  const meta = RATING_META[rating];
  const sizeClass = {
    sm: 'text-[10px] px-2 py-1',
    md: 'text-xs px-3 py-1.5',
    lg: 'text-sm px-4 py-2',
  }[size];
  return (
    <span
      className={`stamp ${sizeClass}`}
      style={{ color: meta.color, backgroundColor: meta.bg, transform: 'rotate(-2deg)' }}
    >
      飞检·{label ?? meta.label}
    </span>
  );
}

export function StationSeal({ size = 60 }: { size?: number }) {
  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx="50" cy="50" r="46" fill="none" stroke="#c0392b" strokeWidth="3" />
        <circle cx="50" cy="50" r="38" fill="none" stroke="#c0392b" strokeWidth="1" />
        <text
          x="50"
          y="38"
          textAnchor="middle"
          fontSize="11"
          fill="#c0392b"
          fontWeight="bold"
          fontFamily='"Noto Serif SC", serif'
        >
          天津站
        </text>
        <text
          x="50"
          y="58"
          textAnchor="middle"
          fontSize="9"
          fill="#c0392b"
          fontFamily='"Noto Serif SC", serif'
        >
          飞行检查
        </text>
        <text
          x="50"
          y="74"
          textAnchor="middle"
          fontSize="7"
          fill="#c0392b"
          fontFamily='"Noto Serif SC", serif'
          letterSpacing="2"
        >
          ★ 站长 ★
        </text>
      </svg>
    </div>
  );
}
