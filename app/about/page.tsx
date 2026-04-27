import { StationSeal } from '@/components/Stamp';

export const metadata = {
  title: '飞检手册 · 吴敬中飞行检查',
};

export default function AboutPage() {
  return (
    <article className="max-w-3xl mx-auto prose-archive">
      <header className="text-center mb-10">
        <StationSeal size={90} />
        <h1 className="text-3xl font-serif font-bold mt-4">飞检手册</h1>
        <p className="font-mono text-xs tracking-widest text-ink-muted uppercase mt-2">
          · inspection methodology ·
        </p>
      </header>

      <h2>本站缘起</h2>
      <p>
        你看《潜伏》里那个吴敬中——天津站站长，老练，谨慎，最爱"飞行检查"。
        下面办事的没一个不打怵。借这股劲儿，开了这个 AI 产品飞检站。
      </p>
      <p>
        每天一款 AI 产品，不论是 Manus 这种大模型原生的，还是 Notion 这种把 AI
        塞进老产品里的——站长亲自上手，跑三个真实 case，记录截图、计时和踩坑。然后写一份八段式档案。
      </p>

      <h2>八段式飞检 schema</h2>
      <ol>
        <li>
          <strong>飞检通告</strong> — 一句话定位 + 检查日期 + 评级图章
        </li>
        <li>
          <strong>产品身份核查</strong> — 团队、融资、所在赛道、官网
        </li>
        <li>
          <strong>实战测试</strong> — 三个真实 case：典型 / 边缘 / 刁难，全程截图
        </li>
        <li>
          <strong>核心 AI 能力拆解</strong> — 模型链路、Agent 架构、关键技术细节
        </li>
        <li>
          <strong>定价与商业模式</strong>
        </li>
        <li>
          <strong>竞品比对</strong>
        </li>
        <li>
          <strong>站长锐评</strong> — 优劣势、让站长不爽的点
        </li>
        <li>
          <strong>飞检结论</strong> — 绿/黄/红 + 给我们的产品启示
        </li>
      </ol>

      <h2>飞检评级标准</h2>
      <ul>
        <li>
          <strong style={{ color: '#3d7a3d' }}>绿章 · 通过</strong>{' '}
          — 实战可用，体验对得起价钱，站长盖章放行
        </li>
        <li>
          <strong style={{ color: '#d4a017' }}>黄章 · 观察</strong>{' '}
          — 有亮点也有硬伤，建议留观下次再查
        </li>
        <li>
          <strong style={{ color: '#a31621' }}>红章 · 不及格</strong>{' '}
          — 把营销稿写得比产品还卖力，吴站长摇头
        </li>
      </ul>

      <h2>三条红线</h2>
      <blockquote>
        <strong>不编造</strong> · 实测必须真截图，不能编 demo<br />
        <strong>不抄文案</strong> · 报告自己写，不复制官网营销话术<br />
        <strong>不留情面</strong> · 是好就是好，是坑就是坑，别藏着
      </blockquote>
    </article>
  );
}
