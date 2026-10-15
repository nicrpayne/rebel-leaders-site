"""Append the online teaching notes and source links to a freshly built Field Guide.

Call once after rebuilding the source PDF. It never edits the source teaching data.
"""
import json, os
from pathlib import Path
from io import BytesIO
from xml.sax.saxutils import escape
from pypdf import PdfReader, PdfWriter
from pypdf.annotations import Link
from pypdf.generic import ArrayObject, NameObject
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether

ROOT=Path(__file__).resolve().parents[1]
DATA=json.loads((ROOT/'shared/field-tool-teachings.json').read_text())
BASE=os.environ.get('GUIDE_APP_URL','https://rebel-leaders-field-tools-preview-production.up.railway.app')
FONT=Path(os.environ.get('GUIDE_FONT_DIR',str(ROOT/'scripts/fonts')))
for name,file in [('ReadSans','GuideSans.ttf'),('ReadBold','GuideBold.ttf'),('ReadSerif','GuideSerif.ttf')]:
 pdfmetrics.registerFont(TTFont(name,str(FONT/file)))
W,H=A4;M=48;CW=W-2*M
CREAM=colors.HexColor('#fcfaf6');INK=colors.HexColor('#34322e');MUTED=colors.HexColor('#68635c')
styles={name:ParagraphStyle(name,fontName=font,fontSize=size,leading=leading,textColor=INK,spaceAfter=space) for name,font,size,leading,space in [('title','ReadSerif',26,32,16),('heading','ReadSerif',16,21,9),('body','ReadSans',9.5,14,8),('small','ReadSans',8,12,5),('label','ReadBold',8,12,5)]}
def p(text,style='body'):return Paragraph(escape(text),styles[style])
def link(source):
 url=source['url'];url=BASE+url if url.startswith('/') else url
 return Paragraph(f'<link href="{escape(url)}" color="#34322e"><u>{escape(source["title"])}</u></link><br/>{escape(source["author"])} · {escape(source["kind"])}',styles['small'])
def background(c,doc):
 c.saveState();c.setFillColor(CREAM);c.rect(0,0,W,H,fill=1,stroke=0);c.setFillColor(MUTED);c.setFont('ReadSans',7);c.drawString(M,30,'REBEL LEADERS / THE THINKING BEHIND THE TOOL');c.restoreState()
def append(path,slug):
 original=PdfReader(path)
 if any('THE THINKING BEHIND THE TOOL' in (x.extract_text() or '') for x in original.pages):raise RuntimeError('Rebuild the base PDF before appending resources: '+str(path))
 notes=sorted([n for n in DATA['notes'] if n['slug']==slug],key=lambda note:note['chapter'])
 flow=[p('The thinking behind the tool.','title'),p('Holistic Shaping asks what work is doing to people, as well as what people are doing at work. These short notes connect the Guide to Nic’s teaching and a few practical sources. Read what helps with the situation in front of you. Links open the original resources.')]
 flow += [p('Back in the Guide','heading')]
 for n in notes:
  block=[p(f'CHAPTER {n["chapter"]+1:02d}','label'),p(n['title'],'heading')]
  if n.get('quote'):block += [p('“'+n['quote']+'”'),p('Nic Payne · '+DATA['sources'][n['quoteSource']]['title'],'small')]
  block += [p(n['body']),p('Worth asking: '+n['question'])]
  block += [link(DATA['sources'][key]) for key in n['sources']]
  block += [Spacer(1,8)];flow.append(KeepTogether(block))
 flow += [KeepTogether([Paragraph('<link href="https://rebel-leader.com"><u>Explore more of Nic’s Holistic Shaping work at Rebel Leaders.</u></link>',styles['body']),p('The notes apply the teaching to these situations. They are not quotations unless marked. The health reflection is optional; you do not need to record or share personal information.','small')])]
 extra=BytesIO();SimpleDocTemplate(extra,pagesize=A4,leftMargin=M,rightMargin=M,topMargin=55,bottomMargin=65).build(flow,onFirstPage=background,onLaterPages=background)
 writer=PdfWriter();writer.append(original);writer.append(PdfReader(extra));total=len(writer.pages)
 # Continuous page numbers include the reading companion. Cover stays unchanged.
 for index,page in enumerate(writer.pages):
  if index==0:continue
  layer=BytesIO();c=canvas.Canvas(layer,pagesize=A4)
  if index < len(original.pages):
   c.setFillColor(MUTED);c.setFont('ReadSans',7);c.drawString(M,58,'Reading and reflection: see the companion at the end of this Guide >')
   writer.add_annotation(index,Link(rect=(M,52,W-M,67),target_page_index=len(original.pages)))
   # A local destination must reference the page object, not a remote page number.
   annotation = writer.pages[index]['/Annots'][-1].get_object()
   annotation[NameObject('/Dest')] = ArrayObject([writer.pages[len(original.pages)].indirect_reference, NameObject('/Fit')])
  c.setFillColor(CREAM);c.rect(W-M-65,22,68,19,fill=1,stroke=0);c.setFillColor(MUTED);c.setFont('ReadSans',7.5);c.drawRightString(W-M,30,f'{index+1:02d} / {total:02d}');c.save();page.merge_page(PdfReader(layer).pages[0])
 writer.add_metadata({'/Title':str(original.metadata.title or 'Field Guide'),'/Author':'Nic Payne / Rebel Leaders','/Subject':'Field Guide with Holistic Shaping teaching and linked resources'})
 with path.open('wb') as output:writer.write(output)
 print(path.name,total,'pages',len(notes),'teaching notes')
if __name__=='__main__':
 for path in sorted((ROOT/'private/field-tools').glob('*-field-guide.pdf')):
  slug=path.name.removesuffix('-field-guide.pdf')
  if slug.startswith('ai-stalemate-'):slug='ai-stalemate'
  if any(n['slug']==slug for n in DATA['notes']):append(path,slug)
