"""Generate the Notion AI 飞检 card cover."""
from PIL import Image, ImageDraw, ImageFilter, ImageFont
import os
import math
import random

W, H = 1200, 600
PAPER = (244, 236, 216)
PAPER_DEEP = (232, 220, 192)
INK = (26, 26, 26)
INK_SOFT = (44, 36, 24)
SEAL = (192, 57, 43)
GOLD = (184, 151, 100)
NOTION_BLACK = (15, 15, 15)


def find_font(size):
    candidates = [
        "/System/Library/Fonts/PingFang.ttc",
        "/System/Library/Fonts/STHeiti Medium.ttc",
        "/System/Library/Fonts/Hiragino Sans GB.ttc",
    ]
    for p in candidates:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                continue
    return ImageFont.load_default()


def make_paper(w, h):
    img = Image.new("RGB", (w, h), PAPER)
    draw = ImageDraw.Draw(img)
    rng = random.Random(2026)
    for _ in range(w * h // 40):
        x, y = rng.randint(0, w - 1), rng.randint(0, h - 1)
        v = rng.randint(-12, 8)
        cur = img.getpixel((x, y))
        nv = tuple(max(0, min(255, c + v)) for c in cur)
        draw.point((x, y), fill=nv)
    grad = Image.new("RGB", (w, h), PAPER_DEEP)
    mask = Image.new("L", (w, h), 0)
    md = ImageDraw.Draw(mask)
    for r in range(0, max(w, h), 4):
        alpha = max(0, 80 - r // 8)
        md.ellipse([w // 2 - r, h // 2 - r, w // 2 + r, h // 2 + r], outline=alpha)
    img = Image.composite(img, grad, mask).filter(ImageFilter.GaussianBlur(radius=0.6))
    return img


def draw_seal_round(draw, cx, cy, r, l1, l2, f_o, f_i):
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=SEAL, width=4)
    draw.ellipse([cx - r + 8, cy - r + 8, cx + r - 8, cy + r - 8], outline=SEAL, width=1)
    pts = []
    R = r * 0.32
    for i in range(10):
        a = math.pi / 2 + i * math.pi / 5
        rad = R if i % 2 == 0 else R * 0.45
        pts.append((cx + rad * math.cos(a), cy - rad * math.sin(a)))
    draw.polygon(pts, outline=SEAL, fill=SEAL)
    bb1 = draw.textbbox((0, 0), l1, font=f_o)
    draw.text((cx - (bb1[2] - bb1[0]) / 2, cy - r + 14), l1, fill=SEAL, font=f_o)
    bb2 = draw.textbbox((0, 0), l2, font=f_i)
    draw.text((cx - (bb2[2] - bb2[0]) / 2, cy + r - 32), l2, fill=SEAL, font=f_i)


def main():
    img = make_paper(W, H)
    draw = ImageDraw.Draw(img, "RGBA")
    draw.rectangle([8, 8, W - 8, H - 8], outline=SEAL, width=3)
    draw.rectangle([18, 18, W - 18, H - 18], outline=GOLD, width=1)

    # 网格底
    grid_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(grid_layer)
    for x in range(0, W, 32):
        gd.line([(x, 0), (x, H)], fill=(192, 57, 43, 18), width=1)
    for y in range(0, H, 32):
        gd.line([(0, y), (W, y)], fill=(192, 57, 43, 18), width=1)
    img = Image.alpha_composite(img.convert("RGBA"), grid_layer).convert("RGB")
    draw = ImageDraw.Draw(img, "RGBA")

    f_t = find_font(88)
    f_s = find_font(28)
    f_m = find_font(18)
    f_so = find_font(22)
    f_si = find_font(14)
    f_st = find_font(30)

    draw.text((50, 50), "档案 № 2026-04-24-NOTION-AI", fill=INK_SOFT, font=f_m)
    draw.text((50, 78), "INSPECTED · 2026-04-24 · 天津站", fill=INK_SOFT, font=f_m)

    # 主标题：Notion AI 嵌入式
    draw.text((50, 140), "Notion AI", fill=INK, font=f_t)
    draw.text((52, 250), "AI 增强档 · 老牌生产力工具的 AI 二次进化", fill=SEAL, font=f_s)

    sub_lines = [
        "「文档里就地召唤 AI」是不是真的省心？",
        "站长在真实工作区跑三个 case，挑毛病。",
    ]
    for i, line in enumerate(sub_lines):
        draw.text((52, 320 + i * 32), line, fill=INK_SOFT, font=f_s)

    draw_seal_round(draw, W - 130, 130, 80, "天 津 站", "★ 飞 检 ★", f_so, f_si)

    # 评级章 — 绿章 / 黄章占位（最终生成时改）
    stamp_layer = Image.new("RGBA", (320, 120), (0, 0, 0, 0))
    sd = ImageDraw.Draw(stamp_layer)
    sd.rectangle([2, 2, 318, 118], outline=(212, 160, 23, 230), width=4)
    sd.text((30, 22), "飞 检 · 待 定", fill=(212, 160, 23, 230), font=f_st)
    sd.text((30, 70), "TBD · AFTER FIELD TEST", fill=(212, 160, 23, 200), font=f_m)
    stamp_layer = stamp_layer.rotate(-6, resample=Image.BICUBIC, expand=True)
    img.paste(stamp_layer, (W - 380, H - 170), stamp_layer)

    draw.text((50, H - 80), "WUJINGZHONG'S DAILY AI PRODUCT FLIGHT INSPECTION", fill=GOLD, font=f_m)
    draw.text((50, H - 55), "天津站站长 · 飞行检查处 · 绝密 · 内部传阅", fill=INK_SOFT, font=f_m)

    # AI 触发位置示意（左下）
    bar_x, bar_y = W - 580, H - 80
    ai_modes = ["/AI", "Ask AI", "Inline", "Q&A"]
    for i, m in enumerate(ai_modes):
        x0 = bar_x + i * 120
        sd2 = ImageDraw.Draw(img, "RGBA")
        sd2.rectangle([x0, bar_y, x0 + 100, bar_y + 30], outline=INK_SOFT, width=1, fill=(244, 236, 216, 220))
        bb = sd2.textbbox((0, 0), m, font=f_m)
        tw = bb[2] - bb[0]
        sd2.text((x0 + 50 - tw / 2, bar_y + 8), m, fill=INK_SOFT, font=f_m)
    draw.text((bar_x, bar_y + 35), "AI 触发位置 · 4 种入口分别飞检", fill=INK_SOFT, font=f_m)

    out_path = "/Users/USER/ai-tianjin-station/public/covers/notion-ai.png"
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    img.save(out_path, "PNG", optimize=True)
    print(f"Saved: {out_path}")


if __name__ == "__main__":
    main()
