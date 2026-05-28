"""
Generates side-by-side S1/S2 geo-aligned pair thumbnail for the
satellite imagery project card.

Usage:
    poetry run python scripts/make_project_thumbnail.py
"""

import os
import urllib.request
from PIL import Image, ImageDraw, ImageFont

S1_URL = "https://ar5iv.labs.arxiv.org/html/1906.07789/assets/figures/Good/ROIs1868_summer_s1_121_p41c.png"
S2_URL = "https://ar5iv.labs.arxiv.org/html/1906.07789/assets/figures/Good/ROIs1868_summer_s2_121_p41.png"

OUT_PATH = os.path.join(
    os.path.dirname(__file__),
    "../public/images/projects/sen12ms_pair.png",
)

PATCH_SIZE = 300
GAP = 4
LABEL_H = 36


def fetch_image(url: str) -> Image.Image:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as resp:
        import io
        return Image.open(io.BytesIO(resp.read())).convert("RGB")


def make_thumbnail() -> None:
    print("Fetching S1 radar patch...")
    s1 = fetch_image(S1_URL).resize((PATCH_SIZE, PATCH_SIZE))

    print("Fetching S2 optical patch...")
    s2 = fetch_image(S2_URL).resize((PATCH_SIZE, PATCH_SIZE))

    total_w = PATCH_SIZE * 2 + GAP
    total_h = PATCH_SIZE + LABEL_H

    composite = Image.new("RGB", (total_w, total_h), (20, 20, 20))
    composite.paste(s1, (0, 0))
    composite.paste(s2, (PATCH_SIZE + GAP, 0))

    draw = ImageDraw.Draw(composite)

    # Label backgrounds
    draw.rectangle([0, PATCH_SIZE, PATCH_SIZE, total_h], fill=(20, 20, 20))
    draw.rectangle([PATCH_SIZE + GAP, PATCH_SIZE, total_w, total_h], fill=(20, 20, 20))

    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 14)
    except OSError:
        font = ImageFont.load_default()

    draw.text(
        (PATCH_SIZE // 2, PATCH_SIZE + LABEL_H // 2),
        "Sentinel-1  (SAR)",
        fill=(180, 200, 255),
        font=font,
        anchor="mm",
    )
    draw.text(
        (PATCH_SIZE + GAP + PATCH_SIZE // 2, PATCH_SIZE + LABEL_H // 2),
        "Sentinel-2  (Optical)",
        fill=(180, 255, 180),
        font=font,
        anchor="mm",
    )

    out = os.path.normpath(os.path.join(os.path.dirname(__file__), OUT_PATH))
    os.makedirs(os.path.dirname(out), exist_ok=True)
    composite.save(out)
    print(f"Saved: {out}  ({composite.size[0]}x{composite.size[1]}px)")


if __name__ == "__main__":
    make_thumbnail()
