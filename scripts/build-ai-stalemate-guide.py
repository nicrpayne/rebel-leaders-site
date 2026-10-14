"""Build the portable guide from the same chapter data used in the web reader."""
import json
import os
import sys
from io import BytesIO
import subprocess
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from PIL import Image
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph, Table, TableStyle

ROOT = Path(__file__).resolve().parents[1]
AUDIENCE = sys.argv[1] if len(sys.argv)>1 else "pm"
assert AUDIENCE in ("pm", "lead-dev")
ROLE = "PRODUCT MANAGER" if AUDIENCE == "pm" else "LEAD DEVELOPER"
DEST = ROOT / f"private/field-tools/ai-stalemate-{AUDIENCE}-field-guide.pdf"
BASE_URL = os.environ.get("GUIDE_APP_URL", "https://rebel-leaders-field-tools-preview-production.up.railway.app")
LAB_URL = f"{BASE_URL}/field-tools/ai-stalemate/{AUDIENCE}/lab"
PAGES = json.loads(subprocess.check_output([
    "node", "--experimental-strip-types", "--input-type=module", "-e",
    f"import {{ aiGuideFor }} from './server/field-tool-content/ai-paths.ts'; console.log(JSON.stringify(aiGuideFor('{AUDIENCE}')));",
], cwd=ROOT))

FONT_DIR = Path(os.environ.get("GUIDE_FONT_DIR", str(ROOT / "scripts/fonts")))

for name, filename in [
    ("GuideSerif", str(FONT_DIR / "GuideSerif.ttf")),
    ("GuideSans", str(FONT_DIR / "GuideSans.ttf")),
    ("GuideBold", str(FONT_DIR / "GuideBold.ttf")),
]:
    pdfmetrics.registerFont(TTFont(name, filename))

W, H = A4
M = 48
CW = W - 2 * M
DARK = colors.HexColor("#fcfaf6")
FOREST = colors.HexColor("#315c4b")
CREAM = colors.HexColor("#fcfaf6")
GOLD = colors.HexColor("#315c4b")
INK = colors.HexColor("#34322e")
MUTED = colors.HexColor("#68635c")
LINE = colors.HexColor("#ded8ce")

styles = {
    "title": ParagraphStyle("title", fontName="GuideSerif", fontSize=34, leading=37, textColor=INK),
    "intro": ParagraphStyle("intro", fontName="GuideSans", fontSize=11, leading=17, textColor=MUTED),
    "heading": ParagraphStyle("heading", fontName="GuideBold", fontSize=11, leading=16, textColor=INK),
    "body": ParagraphStyle("body", fontName="GuideSans", fontSize=10, leading=15, textColor=MUTED),
    "callout": ParagraphStyle("callout", fontName="GuideSans", fontSize=10.5, leading=16, textColor=INK),
    "cover": ParagraphStyle("cover", fontName="GuideSerif", fontSize=19, leading=27, textColor=INK),
}


def paragraph(c, text, x, y, width=CW, style="body"):
    p = Paragraph(escape(text).replace("\n", "<br/>"), styles[style])
    _, height = p.wrap(width, H)
    p.drawOn(c, x, y - height)
    return y - height


def footer(c, page):
    c.setStrokeColor(LINE)
    c.line(M, 47, W - M, 47)
    c.setFillColor(MUTED)
    c.setFont("GuideSans", 7.5)
    c.drawString(M, 30, f"REBEL LEADERS / AI STALEMATE / {ROLE} EDITION")
    c.drawRightString(W - M, 30, f"{page:02d} / {len(PAGES)+1:02d}")


def callout(c, text, y):
    p = Paragraph(escape(text), styles["callout"])
    _, height = p.wrap(CW - 36, H)
    box_height = height + 30
    assert y - box_height >= 70, f"Callout overlaps footer: {text[:40]}"
    c.setFillColor(colors.HexColor("#e8eee6"))
    c.roundRect(M, y - box_height, CW, box_height, 8, fill=1, stroke=0)
    p.drawOn(c, M + 18, y - 15 - height)


def cover(c):
    c.setFillColor(CREAM);c.rect(0,0,W,H,fill=1,stroke=0)
    c.setFillColor(FOREST);c.setFont("GuideBold",9);c.drawString(M,799,"REBEL LEADERS / FIELD TOOL 01")
    c.setFillColor(INK);c.setFont("GuideSerif",55);c.drawString(M,705,"AI Stalemate")
    photograph=BytesIO()
    with Image.open(ROOT / "client/public/assets/field-tools/ai-stalemate-hero-v2.webp") as source:source.convert("RGB").save(photograph,"JPEG",quality=92)
    photograph.seek(0);c.drawImage(ImageReader(photograph),M,290,width=CW,height=CW*941/1672)
    c.setFillColor(FOREST);c.setFont("GuideSans",10);c.drawString(M,267,f"THE {ROLE} FIELD GUIDE")
    paragraph(c,("Explain the opportunity. Work out the next step with your lead." if AUDIENCE == "pm" else "Explain the concerns. Work out the next step with your PM."),M,243,CW,"cover")
    c.setStrokeColor(LINE);c.line(M,153,W-M,153)
    c.setFillColor(INK);c.setFont("GuideBold",11);c.drawString(M,128,"Nic Payne")
    c.setFont("GuideSans",9);c.drawString(M,109,f"For you, the {ROLE.lower()}")
    c.setFillColor(FOREST);c.setFont("GuideSans",8)
    c.linkURL(LAB_URL,(M,25,W-M,76),relative=0);c.drawString(M,76,"OPEN YOUR "+ROLE+" LAB >")
    c.setFillColor(MUTED);c.drawString(M,58,"START WITH A REAL SITUATION. DECIDE WHAT HAPPENS NEXT.")
    c.drawString(M,39,"WORKING EDITION / REBEL-LEADER.COM");c.showPage()

def chapter(c, data, number):
    c.setFillColor(CREAM)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFont("GuideBold", 8)
    c.setFillColor(FOREST)
    c.drawString(M, 791, data["eyebrow"])
    c.setStrokeColor(GOLD)
    c.line(W - M - 74, 795, W - M, 795)
    y = paragraph(c, data["title"], M, 756, style="title") - 18
    y = paragraph(c, data["intro"], M, y, style="intro") - 26
    if data.get("table"):
        table = Table(data["table"], colWidths=[CW * .54, CW * .23, CW * .23], rowHeights=23)
        table.setStyle(TableStyle([
            ("FONTNAME", (0, 0), (-1, -1), "GuideSans"),
            ("FONTSIZE", (0, 0), (-1, -1), 9),
            ("TEXTCOLOR", (0, 0), (-1, -1), INK),
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#e8eee6")),
            ("TEXTCOLOR", (0, 0), (-1, 0), INK),
            ("FONTNAME", (0, 0), (-1, 0), "GuideBold"),
            ("BACKGROUND", (0, -1), (-1, -1), colors.HexColor("#e8eee6")),
            ("FONTNAME", (0, -1), (-1, -1), "GuideBold"),
            ("LINEBELOW", (0, 1), (-1, -2), .4, LINE),
            ("ALIGN", (1, 0), (-1, -1), "RIGHT"),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("LEFTPADDING", (0, 0), (-1, -1), 10),
            ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ]))
        _, height = table.wrap(CW, H)
        table.drawOn(c, M, y - height)
        y -= height + 22
    for section in data["sections"]:
        y = paragraph(c, section["title"], M, y, style="heading") - 5
        y = paragraph(c, section["body"], M, y, style="body") - 17
    if data.get("sources"):
        for source in data["sources"]:
            c.setFillColor(MUTED)
            c.setFont("GuideSans", 7)
            c.drawString(M, y, source["name"])
            c.linkURL(source["url"], (M, y-2, W-M, y+9), relative=0)
            y -= 14
    callout(c, data["callout"], y - 5)
    c.linkURL(LAB_URL, (M, 21, W-M, 41), relative=0)
    footer(c, number)
    c.showPage()


def main():
    DEST.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(DEST), pagesize=A4, pageCompression=1)
    c.setTitle(f"AI Stalemate - {ROLE} Field Guide")
    c.setAuthor("Nic Payne / Rebel Leaders")
    cover(c)
    for page, data in enumerate(PAGES, 2):
        chapter(c, data, page)
    c.save()
    print(DEST)


if __name__ == "__main__":
    main()
