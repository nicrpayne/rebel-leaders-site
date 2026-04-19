export interface GravitasReadingEmailData {
  name: string;
  archetype: string;
  leak: string;
  force: string;
  firstMove: string;
  identity: number;
  relationship: number;
  vision: number;
  culture: number;
  archetypeTranslation: string;
  leakTranslation: string;
  forceTranslation: string;
  firstMoveTranslation: string;
  archetypeHint: string;
  leakHint: string;
  returnDate: string;
}

function bar(score: number, color: string): string {
  const pct = Math.round((score / 5) * 100);
  return `
    <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
      <tr>
        <td width="${pct}%" style="height:6px;background-color:${color};border-radius:2px 0 0 2px;"></td>
        <td style="height:6px;background-color:#1a2a1a;border-radius:0 2px 2px 0;"></td>
      </tr>
    </table>`;
}

function dimRow(label: string, score: number, color: string): string {
  return `
    <tr>
      <td style="padding:6px 0;width:110px;vertical-align:middle;">
        <span style="font-family:'Courier New',monospace;font-size:9px;letter-spacing:2px;color:#4a5e4c;text-transform:uppercase;">${label}</span>
      </td>
      <td style="padding:6px 8px;vertical-align:middle;">
        ${bar(score, color)}
      </td>
      <td style="padding:6px 0;width:32px;vertical-align:middle;text-align:right;">
        <span style="font-family:Georgia,serif;font-size:12px;color:${color};">${score.toFixed(1)}</span>
      </td>
    </tr>`;
}

function today(): string {
  return new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function gravitas_reading_email(data: GravitasReadingEmailData): string {
  const {
    archetype, leak, force, firstMove,
    identity, relationship, vision, culture,
    archetypeTranslation, leakTranslation, forceTranslation, firstMoveTranslation,
    archetypeHint, leakHint, returnDate,
  } = data;

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Your Gravitas Reading</title>
</head>
<body style="margin:0;padding:0;background-color:#0f1a12;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f1a12;padding:40px 20px;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#111d13;border:1px solid #2a3d1e;border-radius:4px;overflow:hidden;max-width:600px;">

        <!-- ── Header ── -->
        <tr>
          <td style="padding:32px 40px 20px;border-bottom:1px solid #2a3d1e;">
            <p style="margin:0 0 10px;color:#b8860b;font-size:10px;letter-spacing:4px;font-family:'Courier New',monospace;text-transform:uppercase;">Rebel Leaders</p>
            <p style="margin:0;color:#c8b898;font-family:Georgia,serif;font-size:22px;font-style:italic;font-weight:normal;line-height:1.3;">
              Your field reading — ${today()}
            </p>
          </td>
        </tr>

        <!-- ── Opening ── -->
        <tr>
          <td style="padding:32px 40px 0;">
            <p style="margin:0;color:#6a7e6c;font-family:Georgia,serif;font-size:15px;line-height:1.7;">
              You ran the scan. Here is what the field returned. Keep this. The second reading is where the real intelligence begins.
            </p>
          </td>
        </tr>

        <!-- ── Archetype block ── -->
        <tr>
          <td style="padding:28px 40px 0;">
            <table cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="border-left:3px solid #b8860b;padding:0 0 0 16px;">
                  <p style="margin:0 0 4px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:3px;color:#b8860b;text-transform:uppercase;">Detected Orbit</p>
                  <p style="margin:0 0 14px;font-family:'Courier New',monospace;font-size:16px;letter-spacing:2px;color:#d4a853;text-transform:uppercase;font-weight:bold;">${archetype}</p>
                  <p style="margin:0 0 12px;font-family:Georgia,serif;font-size:15px;line-height:1.75;color:#c8b898;">${archetypeTranslation}</p>
                  <p style="margin:0;font-family:Georgia,serif;font-size:13px;font-style:italic;line-height:1.7;color:#4a5e4c;">${archetypeHint}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── Dimension bars ── -->
        <tr>
          <td style="padding:28px 40px 0;">
            <p style="margin:0 0 14px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:3px;color:#4a5e4c;text-transform:uppercase;">Dimensional Field Map</p>
            <table cellpadding="0" cellspacing="0" width="100%">
              ${dimRow("Identity",     identity,     "#4ade80")}
              ${dimRow("Relationship", relationship, "#38bdf8")}
              ${dimRow("Vision",       vision,       "#facc15")}
              ${dimRow("Culture",      culture,      "#a78bfa")}
            </table>
          </td>
        </tr>

        <!-- ── Leak + Force (two-column) ── -->
        <tr>
          <td style="padding:28px 40px 0;">
            <table cellpadding="0" cellspacing="0" width="100%">
              <tr valign="top">
                <!-- Leak -->
                <td width="48%" style="padding-right:16px;">
                  <p style="margin:0 0 4px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:3px;color:#ef4444;text-transform:uppercase;">Primary Leak</p>
                  <p style="margin:0 0 10px;font-family:'Courier New',monospace;font-size:13px;letter-spacing:1px;color:#f87171;text-transform:uppercase;font-weight:bold;">${leak}</p>
                  <p style="margin:0 0 10px;font-family:Georgia,serif;font-size:13px;line-height:1.7;color:#c8b898;">${leakTranslation}</p>
                  <p style="margin:0;font-family:Georgia,serif;font-size:12px;font-style:italic;line-height:1.65;color:#4a5e4c;">${leakHint}</p>
                </td>
                <!-- Gutter -->
                <td width="4%" style="border-left:1px solid #2a3d1e;"></td>
                <!-- Force -->
                <td width="48%" style="padding-left:16px;">
                  <p style="margin:0 0 4px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:3px;color:#4ade80;text-transform:uppercase;">Dominant Force</p>
                  <p style="margin:0 0 10px;font-family:'Courier New',monospace;font-size:13px;letter-spacing:1px;color:#86efac;text-transform:uppercase;font-weight:bold;">${force}</p>
                  <p style="margin:0;font-family:Georgia,serif;font-size:13px;line-height:1.7;color:#c8b898;">${forceTranslation}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── First Move ── -->
        <tr>
          <td style="padding:28px 40px 0;">
            <table cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="background-color:#0a100a;border:1px solid #2a3d1e;border-radius:3px;padding:20px 24px;">
                  <p style="margin:0 0 4px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:3px;color:#b8860b;text-transform:uppercase;">Prescribed First Move</p>
                  <p style="margin:0 0 12px;font-family:'Courier New',monospace;font-size:14px;letter-spacing:2px;color:#d4a853;text-transform:uppercase;font-weight:bold;">${firstMove}</p>
                  <p style="margin:0;font-family:Georgia,serif;font-size:14px;line-height:1.75;color:#c8b898;">${firstMoveTranslation}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── Divider ── -->
        <tr>
          <td style="padding:32px 40px 0;">
            <table cellpadding="0" cellspacing="0" width="100%">
              <tr><td style="height:1px;background-color:#2a3d1e;"></td></tr>
            </table>
          </td>
        </tr>

        <!-- ── Return prompt ── -->
        <tr>
          <td style="padding:28px 40px 0;">
            <table cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="background-color:#0a100a;border:1px solid #2a3d1e;border-radius:3px;padding:24px;">
                  <p style="margin:0 0 14px;font-family:Georgia,serif;font-size:18px;font-style:italic;color:#c8b898;line-height:1.4;">The second reading is where it begins.</p>
                  <p style="margin:0 0 20px;font-family:Georgia,serif;font-size:14px;line-height:1.75;color:#6a7e6c;">
                    One scan is a photograph. The intelligence lives in trajectory — what moves, what stays stuck, what the field is becoming over time. Come back in three to four weeks and run it again.
                  </p>
                  <p style="margin:0;font-family:'Courier New',monospace;font-size:9px;letter-spacing:3px;color:#b8860b;text-transform:uppercase;">Suggested Return — ${returnDate}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── CTA ── -->
        <tr>
          <td style="padding:28px 40px 0;">
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="border:1px solid #b8860b;border-radius:2px;">
                  <a href="https://rebel-leader.com/workbench/gravitas"
                     style="display:inline-block;padding:14px 32px;color:#d4a853;font-size:11px;letter-spacing:3px;text-decoration:none;font-family:'Courier New',monospace;font-weight:bold;text-transform:uppercase;">
                    Return to the Field →
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── Footer ── -->
        <tr>
          <td style="padding:32px 40px;border-top:1px solid #2a3d1e;margin-top:32px;">
            <table cellpadding="0" cellspacing="0" width="100%" style="margin-top:32px;">
              <tr>
                <td>
                  <p style="margin:0 0 6px;color:#3a4e3c;font-size:11px;letter-spacing:2px;font-family:'Courier New',monospace;">rebel-leader.com</p>
                  <p style="margin:0;color:#3a4e3c;font-size:11px;font-family:Georgia,serif;">
                    Questions? Reply to this email or write to
                    <a href="mailto:hello@rebel-leader.com" style="color:#4a5e4c;text-decoration:none;">hello@rebel-leader.com</a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}
