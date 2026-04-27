import type { Metadata } from 'next';
import Link from 'next/link';
import { StationSeal } from '@/components/Stamp';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'AI 天津站站长吴敬中飞行检查',
  description: '每日一款 AI 产品深度飞检 · 站长亲自下场实测 · 八段式档案存照',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700;900&family=Noto+Sans+SC:wght@400;500;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <header className="border-b-2 border-double border-seal/60 bg-paper-soft/80 backdrop-blur sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-5">
            <Link href="/" className="flex items-center gap-3 group">
              <StationSeal size={50} />
              <div>
                <h1 className="text-lg md:text-xl font-bold text-ink leading-tight">
                  AI 天津站站长吴敬中飞行检查
                </h1>
                <p className="font-mono text-[10px] tracking-[0.25em] text-ink-muted uppercase mt-0.5">
                  · daily AI product flight inspection ·
                </p>
              </div>
            </Link>
            <nav className="ml-auto flex items-center gap-5 text-sm font-serif">
              <Link href="/" className="hover:text-seal transition-colors">
                档案库
              </Link>
              <Link href="/about" className="hover:text-seal transition-colors">
                飞检手册
              </Link>
              <a
                href="https://github.com/sherconan/ai-tianjin-station"
                className="hover:text-seal transition-colors font-mono text-xs"
                target="_blank"
                rel="noreferrer"
              >
                source
              </a>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">{children}</main>

        <footer className="mt-16 border-t border-gold/40 bg-paper-deep/40">
          <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-ink-muted font-mono">
            <span>
              中央军统 · 天津站 · 站长直辖飞检处 ·{' '}
              <span className="text-seal">绝密 · 内部传阅</span>
            </span>
            <span>© 2026 ·「我吴敬中今天又来飞检」</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
