import { getAllReports } from '@/lib/reports';
import { ReportsExplorer } from '@/components/SortToggle';

export default function HomePage() {
  const reports = getAllReports();

  return (
    <div>
      <section className="mb-10 relative">
        <div className="absolute -top-2 -right-2 hidden md:block opacity-70 rotate-12">
          <div
            className="font-serif font-black text-seal/80 border-4 border-seal/80 px-4 py-2"
            style={{ transform: 'rotate(-8deg)' }}
          >
            <div className="text-xs tracking-widest">绝密 · 内部</div>
            <div className="text-2xl">飞 检 档 案</div>
          </div>
        </div>
        <div className="max-w-3xl">
          <p className="font-mono text-xs tracking-[0.3em] text-seal mb-2 uppercase">
            inspection log · 站长亲自下场
          </p>
          <h1 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-4 text-ink">
            每天一款 AI 产品，<br />
            站长替你飞行检查。
          </h1>
          <p className="text-base text-ink-soft leading-relaxed">
            站长本人亲自上手，三个真实 case，截图 + 计时 + 锐评。
            <br />
            八段式档案存照，从「身份核查」到「飞检结论」，一份不少。
            <br />
            <span className="text-seal">不抄官网话术，不写营销稿，不留情面。</span>
          </p>

          <div className="flex flex-wrap gap-3 mt-5 text-xs font-mono">
            <span className="px-3 py-1 bg-paper-soft border border-gold/40 rounded-archive">
              📡 真实使用 · 非纸上谈兵
            </span>
            <span className="px-3 py-1 bg-paper-soft border border-gold/40 rounded-archive">
              📂 八段式档案 schema
            </span>
            <span className="px-3 py-1 bg-paper-soft border border-gold/40 rounded-archive">
              🔴 飞检评级 · 绿/黄/红
            </span>
          </div>
        </div>
      </section>

      <ReportsExplorer reports={reports} />
    </div>
  );
}
