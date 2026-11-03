// Run from the repository root: swift scripts/render-email-wordmark.swift
// Draw the existing brand vectors and bundled font onto a transparent PNG.
// A mid-tone brand green remains visible on both paper and dark surfaces,
// including clients that recolour HTML but leave image pixels alone.
import AppKit
import CoreText

let width = 1040
let height = 168
let bitmap = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: width,
    pixelsHigh: height, bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true,
    isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
NSGraphicsContext.saveGraphicsState()
let graphics = NSGraphicsContext(bitmapImageRep: bitmap)!
NSGraphicsContext.current = graphics
let context = graphics.cgContext
context.clear(CGRect(x: 0, y: 0, width: width, height: height))
let green = CGColor(red: 115/255, green: 143/255, blue: 126/255, alpha: 1)

let fontURL = URL(fileURLWithPath: "scripts/fonts/GuideSerif.ttf")
let provider = CGDataProvider(url: fontURL as CFURL)!
let baseFont = CTFontCreateWithGraphicsFont(CGFont(provider)!, 132, nil, nil)
let descriptor = CTFontDescriptorCreateWithAttributes([
    kCTFontVariationAttribute: [NSNumber(value: 0x77676874): NSNumber(value: 400)]
] as CFDictionary)
let font = CTFontCreateCopyWithAttributes(baseFont, 132, nil, descriptor)
let line = CTLineCreateWithAttributedString(NSAttributedString(
    string: "Rebel Leaders", attributes: [NSAttributedString.Key(kCTFontAttributeName as String): font]))
let letters = CGMutablePath()
for run in CTLineGetGlyphRuns(line) as! [CTRun] {
    let count = CTRunGetGlyphCount(run)
    var glyphs = [CGGlyph](repeating: 0, count: count)
    var positions = [CGPoint](repeating: .zero, count: count)
    CTRunGetGlyphs(run, CFRange(location: 0, length: 0), &glyphs)
    CTRunGetPositions(run, CFRange(location: 0, length: 0), &positions)
    for i in 0..<count {
        if let glyph = CTFontCreatePathForGlyph(font, glyphs[i], nil) {
            let transform = CGAffineTransform(translationX: 152 + positions[i].x, y: 38 + positions[i].y)
            letters.addPath(glyph, transform: transform)
        }
    }
}
let icon = CGMutablePath()
icon.addArc(center: CGPoint(x: 60, y: 45), radius: 28, startAngle: .pi, endAngle: 0, clockwise: false)
icon.addLine(to: CGPoint(x: 78, y: 45))
icon.addArc(center: CGPoint(x: 60, y: 45), radius: 18, startAngle: 0, endAngle: .pi, clockwise: true)
icon.closeSubpath()
icon.addRect(CGRect(x: 16, y: 51, width: 88, height: 7))
let iconTransform = CGAffineTransform(a: 0.87, b: 0, c: 0, d: -0.87, tx: 2, ty: 119)
letters.addPath(icon, transform: iconTransform)
context.setFillColor(green)
context.addPath(letters)
context.fillPath()
NSGraphicsContext.restoreGraphicsState()
let output = URL(fileURLWithPath: "client/public/assets/field-tools/email/wordmark-transparent-v2.png")
try bitmap.representation(using: .png, properties: [:])!.write(to: output)
print("Rendered transparent email wordmark: \(width) × \(height)")
