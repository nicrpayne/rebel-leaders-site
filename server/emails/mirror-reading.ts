export function mirror_reading_email(data: {
  top_family_label: string;
  secondary_family_label: string | null;
  primary_key_area: string;
  secondary_key_area: string;
  key_expression_note: string;
  resistance_core_key: string;
  confidence_band: "high" | "medium" | "low";
  gravitas_combo: string;
}): string {
  const {
    top_family_label,
    secondary_family_label,
    primary_key_area,
    secondary_key_area,
    key_expression_note,
    resistance_core_key,
    confidence_band,
    gravitas_combo,
  } = data;

  const confidenceNote = {
    high: "The pattern that emerged was consistent across multiple signal clusters. This reading carries strong coherence.",
    medium: "The pattern is clear in its primary direction, though some signal threads remain open. Read it as a strong hypothesis, not a verdict.",
    low: "The signals were distributed across several patterns. Hold this reading lightly — return to it over time and see what holds.",
  }[confidence_band];

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Your Mirror Reading</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f0e8;font-family:Georgia,'Times New Roman',serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f0e8;padding:48px 20px;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="padding:0 0 40px 0;text-align:center;border-bottom:2px solid #8b6914;">
            <p style="margin:0 0 4px 0;font-family:Georgia,serif;font-size:11px;letter-spacing:0.4em;color:#8b6914;text-transform:uppercase;">Mirror — Inner Field Reading</p>
            <h1 style="margin:16px 0 0 0;font-family:Georgia,serif;font-size:32px;font-weight:normal;color:#2c1810;font-style:italic;line-height:1.3;">Something true about you<br>was named today.</h1>
          </td>
        </tr>

        <!-- Opening -->
        <tr>
          <td style="padding:40px 0 32px 0;border-bottom:1px solid #c4a35a;">
            <p style="margin:0;font-family:Georgia,serif;font-size:17px;line-height:1.9;color:#3d2410;">
              What follows is not a personality label. It is a reading of the patterns that have formed around you — the adaptations your leadership developed in response to what the field asked of you. Read it slowly. Some of it may feel uncomfortably accurate.
            </p>
          </td>
        </tr>

        <!-- Primary Pattern -->
        <tr>
          <td style="padding:40px 0 0 0;">
            <p style="margin:0 0 8px 0;font-family:Georgia,serif;font-size:10px;letter-spacing:0.4em;color:#8b6914;text-transform:uppercase;">Your Primary Pattern</p>
            <h2 style="margin:0 0 24px 0;font-family:Georgia,serif;font-size:28px;font-weight:normal;color:#2c1810;">${top_family_label}</h2>
            ${secondary_family_label ? `
            <p style="margin:0 0 8px 0;font-family:Georgia,serif;font-size:10px;letter-spacing:0.3em;color:#8b6914;text-transform:uppercase;">Secondary Pattern</p>
            <p style="margin:0 0 24px 0;font-family:Georgia,serif;font-size:18px;color:#5a3a1a;font-style:italic;">${secondary_family_label}</p>
            ` : ""}
            <p style="margin:0;font-family:Georgia,serif;font-size:14px;line-height:1.7;color:#8b6914;font-style:italic;">${confidenceNote}</p>
          </td>
        </tr>

        <!-- Decorative divider -->
        <tr>
          <td style="padding:32px 0;text-align:center;">
            <p style="margin:0;font-size:18px;color:#c4a35a;letter-spacing:0.5em;">✦ ✦ ✦</p>
          </td>
        </tr>

        <!-- Key Areas -->
        <tr>
          <td style="padding:0 0 32px 0;border-bottom:1px solid #c4a35a;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="48%" style="padding-right:16px;vertical-align:top;">
                  <p style="margin:0 0 8px 0;font-family:Georgia,serif;font-size:10px;letter-spacing:0.35em;color:#8b6914;text-transform:uppercase;">Primary Key Area</p>
                  <p style="margin:0 0 12px 0;font-family:Georgia,serif;font-size:18px;color:#2c1810;">${primary_key_area}</p>
                </td>
                <td width="4%" style="border-left:1px solid #c4a35a;"></td>
                <td width="48%" style="padding-left:16px;vertical-align:top;">
                  <p style="margin:0 0 8px 0;font-family:Georgia,serif;font-size:10px;letter-spacing:0.35em;color:#8b6914;text-transform:uppercase;">Secondary Key Area</p>
                  <p style="margin:0 0 12px 0;font-family:Georgia,serif;font-size:18px;color:#2c1810;">${secondary_key_area}</p>
                </td>
              </tr>
            </table>
            <p style="margin:24px 0 0 0;font-family:Georgia,serif;font-size:15px;line-height:1.8;color:#3d2410;font-style:italic;">${key_expression_note}</p>
          </td>
        </tr>

        <!-- Resistance Core -->
        <tr>
          <td style="padding:32px 0;border-bottom:1px solid #c4a35a;">
            <p style="margin:0 0 8px 0;font-family:Georgia,serif;font-size:10px;letter-spacing:0.35em;color:#8b6914;text-transform:uppercase;">The Resistance Pattern</p>
            <p style="margin:0 0 16px 0;font-family:Georgia,serif;font-size:18px;color:#2c1810;">${resistance_core_key}</p>
            <p style="margin:0;font-family:Georgia,serif;font-size:15px;line-height:1.8;color:#3d2410;">
              This is the pattern that tends to activate under pressure. It is not a flaw — it is a formation. Understanding it is the beginning of leading beyond it.
            </p>
          </td>
        </tr>

        <!-- What This Means -->
        <tr>
          <td style="padding:32px 0;border-bottom:1px solid #c4a35a;">
            <p style="margin:0 0 8px 0;font-family:Georgia,serif;font-size:10px;letter-spacing:0.35em;color:#8b6914;text-transform:uppercase;">What This Means For Your Leadership</p>
            <p style="margin:0;font-family:Georgia,serif;font-size:15px;line-height:1.9;color:#3d2410;">
              The patterns named here did not appear by accident. They formed in response to real conditions — real pressures, real relationships, real environments. They have served you. The question Rebel OS is asking is not whether these patterns exist, but whether they are still serving the leader you are becoming.
            </p>
          </td>
        </tr>

        <!-- Gravitas Connection -->
        <tr>
          <td style="padding:32px 0;border-bottom:1px solid #c4a35a;">
            <p style="margin:0 0 8px 0;font-family:Georgia,serif;font-size:10px;letter-spacing:0.35em;color:#8b6914;text-transform:uppercase;">Connected To Your Field Reading</p>
            <p style="margin:0 0 16px 0;font-family:Georgia,serif;font-size:13px;letter-spacing:0.1em;color:#8b6914;">${gravitas_combo.replace(/::/g, " → ")}</p>
            <p style="margin:0;font-family:Georgia,serif;font-size:15px;line-height:1.8;color:#3d2410;">
              Your inner pattern and your field reading are not separate instruments. They are reading the same person from different angles. Where they converge is where the real work begins.
            </p>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="padding:40px 0;text-align:center;border-bottom:1px solid #c4a35a;">
            <p style="margin:0 0 24px 0;font-family:Georgia,serif;font-size:16px;line-height:1.8;color:#3d2410;">
              The reading lives at rebel-leader.com. Return to it when something shifts — when the field changes, when pressure increases, when you need to remember what you already know.
            </p>
            <a href="https://rebel-leader.com/workbench/mirror/reading"
               style="display:inline-block;padding:14px 32px;background-color:#2c1810;color:#f5f0e8;font-family:Georgia,serif;font-size:13px;letter-spacing:0.2em;text-decoration:none;font-style:italic;">
              Return to Your Reading →
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:32px 0 0 0;text-align:center;">
            <p style="margin:0 0 8px 0;font-family:Georgia,serif;font-size:11px;letter-spacing:0.3em;color:#c4a35a;text-transform:uppercase;">Rebel Leaders</p>
            <p style="margin:0;font-family:Georgia,serif;font-size:11px;line-height:1.7;color:#c4a35a;">rebel-leader.com</p>
            <p style="margin:16px 0 0 0;font-family:Georgia,serif;font-size:11px;line-height:1.7;color:#c4a35a;font-style:italic;">You received this because you completed a Mirror reading.<br>No tracking. No sequence. Just the reading.</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}
