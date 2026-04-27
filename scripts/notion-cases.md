# Notion AI 飞检 · 三个 case 设计

> Notion AI 跟 Manus 不一样。Manus 是「给我下个总命令我自己跑」；Notion AI 是「我 already 在写东西，AI 在旁边随叫随到」。所以飞检 case 必须 **嵌在真实写作流程里**。

## Case 1（典型）· 文档总结 · /summarize

**场景**：把一段 raw 会议纪要（200-400 字）粘进新 page，用 `/summarize` 让 Notion AI 出 3 句话总结 + 行动项 list。

**飞检看什么**：
- 中文输入 → 中文输出 是否地道
- 行动项是否真的是行动项（vs 复述）
- 速度（秒级 vs 10 秒级）
- token 占用 / 配额扣多少

## Case 2（边缘）· 跨页面 Q&A · Ask AI

**场景**：在工作区根目录按 `Ask AI`，问"我之前关于 AI 工具的 takeaway 是什么"——看它能否 retrieve 已有 page。

**飞检看什么**：
- 检索覆盖度（能找到几个页面）
- 引用是否点击可达
- 是不是在乱编（没找到也硬答）
- vs Manus 主动浏览器搜索 的差异

## Case 3（刁难）· 长文生成 · Generate from prompt

**场景**：让 Notion AI 写一份「AI 产品 PRD 大纲」，给约束（章节、字数、目标用户）。

**飞检看什么**：
- 长文连贯性
- 是否遵循结构约束
- 中文写作质量（vs Claude / GPT-4）
- 出现"AI 味"模板的程度
- 一次性生成 vs 流式

## 旁路观察

- **入口位置**：/ 命令、Ask AI 按钮、空 page 提示、选中文本浮窗
- **配额提示**：免费用户的 trial cap、Plus 用户的 AI 加购定价
- **延迟**：首字节、完成
- **错误处理**：触发限额时的文案
