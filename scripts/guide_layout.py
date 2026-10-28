"""Shared, understated cover and reading references for all six Field Guides."""
import math
from reportlab.lib import colors

def cover_signature(c, x, y, width, height):
    c.saveState()
    c.setFillColor(colors.HexColor('#dce3d8'))
    c.setFillAlpha(.60)
    text=c.beginText(x+44, y+height*.50)
    text.setFont('GuideSans',8)
    text.setCharSpace(1.5)
    text.textOut('HOPE IS REBELLIOUS.')
    c.drawText(text)
    c.restoreState()

def reading_label(*parts):
    words=len(' '.join(str(p) for p in parts if p).split())
    return f'About {max(1,math.ceil(words/180))} min read'

def section_reading_label(data):
    parts=[data.get('title'),data.get('intro'),data.get('callout'),data.get('takeaway')]
    for section in data.get('sections',data.get('cards',[])):
        parts.extend([section['title'],section['body']])
    for row in data.get('table',[]):parts.extend(row)
    label=reading_label(*parts)
    if data.get('reflectionTime'):label+=' · '+data['reflectionTime']
    return label

def reading_reference(c,label,x,y):
    c.saveState()
    c.setFont('GuideSans',8)
    c.setFillColor(colors.HexColor('#68635c'))
    c.drawString(x,y,label)
    c.restoreState()
    return y-20
