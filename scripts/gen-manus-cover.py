"""Generate the Manus 飞检 card cover — archive-style illustration with paper texture."""
from PIL import Image, ImageDraw, ImageFilter, ImageFont
import os
import random

W, H = 1200, 600
PAPER = (244, 236, 216)  # f4ecd8
PAPER_DEEP = (232, 220, 192)
INK = (26, 26, 26)
INK_SOFT = (44, 36, 24)
SEAL = (192, 57, 43)  # c0392b
GOLD = (184, 151, 100)


def find_font(prefs, size):
    candidates = [
        f"/System/Library/Fonts/{p}" for p in prefs
    ] + [
        f"/Library/Fonts/{p}" for p in prefs
    ] + [
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


def make_paper_texture(w, h):
    img = Image.new("RGB", (w, h), PAPER)
    draw = ImageDraw.Draw(img)
    # 噪点
    rng = random.Random(42)
    for _ in range(w * h // 40):
        x, y = rng.randint(0, w - 1), rng.randint(0, h - 1)
        v = rng.randint(-12, 8)
        cur = img.getpixel((x, y))
        nv = tuple(max(0, min(255, c + v)) for c in cur)
        draw.point((x, y), fill=nv)
    # 老纸渐变
    grad = Image.new("RGB", (w, h), PAPER_DEEP)
    mask = Image.new("L", (w, h), 0)
    md = ImageDraw.Draw(mask)
    for r in range(0, max(w, h), 4):
        alpha = max(0, 80 - r // 8)
        md.ellipse([w // 2 - r, h // 2 - r, w // 2 + r, h // 2 + r], outline=alpha)
    img = Image.composite(img, grad, mask).filter(ImageFilter.GaussianBlur(radius=0.6))
    return img


def draw_grid(draw, w, h, color, gap=32):
    for x in range(0, w, gap):
        draw.line([(x, 0), (x, h)], fill=color, width=1)
    for y in range(0, h, gap):
        draw.line([(0, y), (w, y)], fill=color, width=1)


def draw_seal_round(draw, cx, cy, r, label1, label2, font_outer, font_inner):
    # 印章红圈
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=SEAL, width=4)
    draw.ellipse([cx - r + 8, cy - r + 8, cx + r - 8, cy + r - 8], outline=SEAL, width=1)
    # 五角星
    import math
    star_pts = []
    R = r * 0.32
    for i in range(10):
        angle = math.pi / 2 + i * math.pi / 5
        rad = R if i % 2 == 0 else R * 0.45
        star_pts.append((cx + rad * math.cos(angle), cy - rad * math.sin(angle)))
    draw.polygon(star_pts, outline=SEAL, fill=SEAL)
    # 文字
    bbox1 = draw.textbbox((0, 0), label1, font=font_outer)
    draw.text((cx - (bbox1[2] - bbox1[0]) / 2, cy - r + 14), label1, fill=SEAL, font=font_outer)
    bbox2 = draw.textbbox((0, 0), label2, font=font_inner)
    draw.text((cx - (bbox2[2] - bbox2[0]) / 2, cy + r - 32), label2, fill=SEAL, font=font_inner)


def main():
    img = make_paper_texture(W, H)
    draw = ImageDraw.Draw(img, "RGBA")

    # 红色边框框
    draw.rectangle([8, 8, W - 8, H - 8], outline=SEAL, width=3)
    draw.rectangle([18, 18, W - 18, H - 18], outline=GOLD, width=1)

    # 网格底纹（淡）
    grid_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(grid_layer)
    draw_grid(gd, W, H, (192, 57, 43, 18))
    img = Image.alpha_composite(img.convert("RGBA"), grid_layer).convert("RGB")
    draw = ImageDraw.Draw(img, "RGBA")

    # 字体
    f_title = find_font(["PingFang.ttc"], 88)
    f_sub = find_font(["PingFang.ttc"], 28)
    f_meta = find_font(["PingFang.ttc"], 18)
    f_seal_o = find_font(["PingFang.ttc"], 22)
    f_seal_i = find_font(["PingFang.ttc"], 14)
    f_caption = find_font(["PingFang.ttc"], 16)
    f_stamp = find_font(["PingFang.ttc"], 30)

    # 左侧档案号 / 日期
    draw.text((50, 50), "档案 № 2026-04-23-MANUS", fill=INK_SOFT, font=f_meta)
    draw.text((50, 78), "INSPECTED · 2026-04-23 · 天津站", fill=INK_SOFT, font=f_meta)

    # 主标题
    draw.text((50, 140), "Manus", fill=INK, font=f_title)
    draw.text((52, 250), "通用 AI Agent · 飞行检查档案", fill=SEAL, font=f_sub)

    # 副标语
    sub_lines = [
        "「show your work」是不是只到 PPT 那一层？",
        "站长亲投一份深度 case，全程实录。",
    ]
    for i, line in enumerate(sub_lines):
        draw.text((52, 320 + i * 32), line, fill=INK_SOFT, font=f_sub)

    # 印章（右上）
    draw_seal_round(draw, W - 130, 130, 80, "天 津 站", "★ 飞 检 ★", f_seal_o, f_seal_i)

    # 黄色评级图章（右下，旋转贴感）
    stamp_layer = Image.new("RGBA", (320, 120), (0, 0, 0, 0))
    sd = ImageDraw.Draw(stamp_layer)
    sd.rectangle([2, 2, 318, 118], outline=(212, 160, 23, 230), width=4)
    sd.text((30, 22), "飞 检 · 黄 章", fill=(212, 160, 23, 230), font=f_stamp)
    sd.text((30, 70), "OBSERVE · NOT GREENLIT", fill=(212, 160, 23, 200), font=f_meta)
    stamp_layer = stamp_layer.rotate(-6, resample=Image.BICUBIC, expand=True)
    img.paste(stamp_layer, (W - 380, H - 170), stamp_layer)

    # 底部 caption
    draw.text((50, H - 80), "WUJINGZHONG'S DAILY AI PRODUCT FLIGHT INSPECTION", fill=GOLD, font=f_caption)
    draw.text((50, H - 55), "天津站站长 · 飞行检查处 · 绝密 · 内部传阅", fill=INK_SOFT, font=f_caption)

    # 装饰：左下 4 步进度条（Manus 4 步执行示意）
    bar_x, bar_y = W - 550, H - 80
    for i in range(4):
        x0 = bar_x + i * 60
        draw.rectangle([x0, bar_y, x0 + 50, bar_y + 18], outline=INK_SOFT, width=1, fill=(SEAL[0], SEAL[1], SEAL[2], 200))
        bbox = draw.textbbox((0, 0), f"{i+1}/4", font=f_meta)
        tw = bbox[2] - bbox[0]
        draw.text((x0 + 25 - tw / 2, bar_y - 22), f"{i+1}/4", fill=INK_SOFT, font=f_meta)
    draw.text((bar_x, bar_y + 22), "4 步全过 · 中途因 VNC 断连暂停 1 次", fill=INK_SOFT, font=f_meta)

    out_path = "/Users/USER/ai-tianjin-station/public/covers/manus.png"
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    img.save(out_path, "PNG", optimize=True)
    print(f"Saved: {out_path}")


if __name__ == "__main__":
    main()
