// Run from the repository root: swift scripts/render-email-mark.swift
// Rasterize RebelLogo's existing vectors at 4x for inboxes without SVG support.
// This transparent mid-tone green survives forced dark mode without a white box.
import AppKit

let width = 256
let height = 150
let bitmap = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: width,
    pixelsHigh: height, bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true,
    isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
NSGraphicsContext.saveGraphicsState()
let graphics = NSGraphicsContext(bitmapImageRep: bitmap)!
NSGraphicsContext.current = graphics
let context = graphics.cgContext
context.clear(CGRect(x: 0, y: 0, width: width, height: height))
context.translateBy(x: 0, y: CGFloat(height))
context.scaleBy(x: CGFloat(width) / 120, y: -CGFloat(height) / 70)

let mark = CGMutablePath()
mark.addArc(center: CGPoint(x: 60, y: 45), radius: 28,
    startAngle: .pi, endAngle: 0, clockwise: false)
mark.addLine(to: CGPoint(x: 78, y: 45))
mark.addArc(center: CGPoint(x: 60, y: 45), radius: 18,
    startAngle: 0, endAngle: .pi, clockwise: true)
mark.closeSubpath()
mark.addRect(CGRect(x: 16, y: 51, width: 88, height: 7))
context.setFillColor(CGColor(red: 115/255, green: 143/255, blue: 126/255, alpha: 1))
context.addPath(mark)
context.fillPath()
NSGraphicsContext.restoreGraphicsState()

let output = URL(fileURLWithPath: "client/public/assets/field-tools/email/horizon-transparent-v1.png")
try bitmap.representation(using: .png, properties: [:])!.write(to: output)
print("Rendered transparent email horizon: \(width) × \(height)")
