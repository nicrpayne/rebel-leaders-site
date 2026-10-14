"""Render four portable guides from the same protected chapters as the web reader."""
import json
import os
import subprocess
from pathlib import Path
from io import BytesIO
from xml.sax.saxutils import escape
from PIL import Image
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph

ROOT = Path(__file__).resolve().parents[1]
BASE = os.environ.get("GUIDE_APP_URL", "https://rebel-leaders-field-tools-preview-production.up.railway.app")
DATA = json.loads(subprocess.check_output(["node", "--experimental-strip-types", "--input-type=module", "-e", "import { LEADERSHIP_GUIDE_PAGES as pages } from './server/field-tool-content/leadership-guides.ts'; import { FIELD_TOOLS as tools } from './client/src/lib/field-tools.ts'; import { FIELD_TOOL_PRESENTATIONS as presentations } from './client/src/lib/field-tool-presentations.ts'; console.log(JSON.stringify({pages,tools,presentations}));"],cwd=ROOT))
for name,file in [("GuideSerif","GuideSerif.ttf"),("GuideSans","GuideSans.ttf"),("GuideBold","GuideBold.ttf")]:
    pdfmetrics.registerFont(TTFont(name,str(Path(os.environ.get("GUIDE_FONT_DIR", str(ROOT / "scripts/fonts"))) / file)))
W,H=A4
M=48
CW=W-2*M
DARK=colors.HexColor("#fcfaf6")
FOREST=colors.HexColor("#315c4b")
CREAM=colors.HexColor("#fcfaf6")
GOLD=colors.HexColor("#315c4b")
INK=colors.HexColor("#34322e")
MUTED=colors.HexColor("#68635c")
LINE=colors.HexColor("#ded8ce")
STYLES={
    "title":ParagraphStyle("title",fontName="GuideSerif",fontSize=34,leading=37,textColor=INK),
    "intro":ParagraphStyle("intro",fontName="GuideSans",fontSize=11,leading=17,textColor=MUTED),
    "heading":ParagraphStyle("heading",fontName="GuideBold",fontSize=11,leading=16,textColor=INK),
    "body":ParagraphStyle("body",fontName="GuideSans",fontSize=10,leading=15,textColor=MUTED),
    "callout":ParagraphStyle("callout",fontName="GuideSans",fontSize=10.5,leading=16,textColor=INK),
    "cover-title":ParagraphStyle("cover-title",fontName="GuideSerif",fontSize=45,leading=52,textColor=INK),
    "cover-copy":ParagraphStyle("cover-copy",fontName="GuideSerif",fontSize=19,leading=27,textColor=INK),
}
def para(c,text,y,style="body",width=CW,x=M):
    p=Paragraph(escape(text).replace("\n","<br/>"),STYLES[style]);_,height=p.wrap(width,H)
    assert y-height>=70, f"Text overlaps footer: {text[:50]}"
    p.drawOn(c,x,y-height)
    return y-height

def cover(c,tool,presentation,lab):
    c.setFillColor(CREAM);c.rect(0,0,W,H,fill=1,stroke=0)
    c.setFillColor(FOREST);c.setFont("GuideBold",9);c.drawString(M,799,"REBEL LEADERS / "+tool["eyebrow"])
    para(c,tool["name"],756,"cover-title",width=CW)
    b=BytesIO()
    with Image.open(ROOT / "client/public" / presentation["image"].lstrip("/")) as im:im.convert("RGB").save(b,"JPEG",quality=92)
    b.seek(0);c.drawImage(ImageReader(b),M,290,width=CW,height=CW*941/1672)
    c.setFillColor(FOREST);c.setFont("GuideSans",10);c.drawString(M,267,"THE PRODUCT LEADER'S FIELD GUIDE")
    para(c,presentation["promise"],243,"cover-copy")
    c.setStrokeColor(LINE);c.line(M,153,W-M,153)
    c.setFillColor(INK);c.setFont("GuideBold",11);c.drawString(M,128,"Nic Payne")
    c.setFont("GuideSans",9);c.drawString(M,109,"For you, the PM carrying this situation")
    c.setFillColor(FOREST);c.setFont("GuideSans",8)
    c.drawString(M,76,"OPEN YOUR LAB >");c.linkURL(lab,(M,60,W-M,90),relative=0)
    c.setFillColor(MUTED);c.drawString(M,58,"START WITH A REAL SITUATION. DECIDE WHAT HAPPENS NEXT.")
    c.drawString(M,39,"WORKING EDITION / REBEL-LEADER.COM");c.showPage()

def chapter(c,page,number,total,tool,lab):
    c.setFillColor(CREAM);c.rect(0,0,W,H,fill=1,stroke=0)
    c.setFillColor(FOREST);c.setFont("GuideBold",8);c.drawString(M,791,page["eyebrow"])
    c.setStrokeColor(GOLD);c.line(W-M-74,795,W-M,795)
    y=para(c,page["title"],756,"title")-18
    y=para(c,page["intro"],y,"intro")-26
    for section in page["sections"]:
        y=para(c,section["title"],y,"heading")-5
        y=para(c,section["body"],y)-17
    p=Paragraph(escape(page["callout"]),STYLES["callout"]);_,height=p.wrap(CW-36,H);bh=height+30
    assert y-bh-5>=70, f"Callout overlaps footer: {tool['slug']} / {number}"
    c.setFillColor(colors.HexColor("#e8eee6"));c.roundRect(M,y-bh-5,CW,bh,8,fill=1,stroke=0)
    p.drawOn(c,M+18,y-20-height)
    c.setStrokeColor(LINE);c.line(M,47,W-M,47)
    c.setFillColor(MUTED);c.setFont("GuideSans",7)
    c.drawString(M,30,"REBEL LEADERS / "+tool["name"].upper());c.drawRightString(W-M,30,f"{number:02d} / {total:02d}")
    c.linkURL(lab,(M,21,W-M,41),relative=0);c.showPage()

def main():
    for tool in DATA["tools"]:
        slug=tool["slug"]
        if slug not in DATA["pages"]:continue
        pages=DATA["pages"][slug];lab=f"{BASE}/field-tools/{slug}/lab"
        dest=ROOT / f"private/field-tools/{slug}-field-guide.pdf";dest.parent.mkdir(parents=True,exist_ok=True)
        c=canvas.Canvas(str(dest),pagesize=A4,pageCompression=1)
        c.setTitle(tool["name"]+" - Field Guide");c.setAuthor("Nic Payne / Rebel Leaders")
        cover(c,tool,DATA["presentations"][slug],lab)
        for number,page in enumerate(pages,2):chapter(c,page,number,len(pages)+1,tool,lab)
        c.save();print(dest)
if __name__=="__main__":main()
