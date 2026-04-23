import type { CodexEntry } from "../../client/src/lib/workbench/codex-schema";

export function codex_reading_email(cartridge: CodexEntry): string {
  const difficultyLabel = ["", "Entry", "Moderate", "Demanding", "Advanced", "Expert"][cartridge.difficulty] ?? "Unknown";

  const protocolRows = cartridge.protocol
    .map((step: string, i: number) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #c4a06a40;vertical-align:top;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="28" style="vertical-align:top;padding-top:2px;">
                <p style="margin:0;font-family:'Courier New',monospace;font-size:11px;color:#8b6020;">${String(i + 1).padStart(2, "0")}</p>
              </td>
              <td style="vertical-align:top;">
                <p style="margin:0;font-family:Georgia,serif;font-size:15px;line-height:1.8;color:#2c1a08;">${step}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>`).join("");

  const useWhenRows = cartridge.briefing.use_when
    .map((u: string) => `<p style="margin:0 0 8px 0;font-family:Georgia,serif;font-size:14px;line-height:1.7;color:#3d2410;padding-left:16px;border-left:2px solid #c4a06a;">— ${u}</p>`)
    .join("");

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Codex Cartridge — ${cartridge.title}</title>
</head>
<body style="margin:0;padding:0;background-color:#1a0f05;font-family:Georgia,'Times New Roman',serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#1a0f05;padding:0;">
  <tr>
    <td align="center" style="padding:40px 20px;">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#f5e6c8;background-image:linear-gradient(135deg,#f5e6c8 0%,#ede0b8 50%,#f0e4c0 100%);">

        <!-- Header stamp -->
        <tr>
          <td style="padding:32px 32px 0 32px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <p style="margin:0 0 4px 0;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.4em;color:#8b6020;text-transform:uppercase;">Rebel Leaders // The Codex</p>
                  <p style="margin:0;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.3em;color:#8b6020;text-transform:uppercase;">Cartridge — ${cartridge.id}</p>
                </td>
                <td align="right">
                  <p style="margin:0;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.2em;color:#8b6020;">${cartridge.category.toUpperCase()} // DIFF ${cartridge.difficulty}/5</p>
                  <p style="margin:0;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.2em;color:#8b6020;">${cartridge.time_commitment}</p>
                </td>
              </tr>
            </table>
            <hr style="border:none;border-top:2px solid #8b6020;margin:16px 0 0 0;">
          </td>
        </tr>

        <!-- Title -->
        <tr>
          <td style="padding:28px 32px 0 32px;">
            <p style="margin:0 0 6px 0;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.4em;color:#8b6020;text-transform:uppercase;">This protocol found you for a reason.</p>
            <h1 style="margin:8px 0 0 0;font-family:Georgia,serif;font-size:30px;font-weight:normal;color:#1a0f05;line-height:1.2;">${cartridge.title}</h1>
          </td>
        </tr>

        <!-- Objective -->
        <tr>
          <td style="padding:24px 32px;">
            <p style="margin:0;font-family:Georgia,serif;font-size:17px;line-height:1.9;color:#2c1a08;font-style:italic;">${cartridge.briefing.objective}</p>
            <hr style="border:none;border-top:1px solid #c4a06a;margin:24px 0 0 0;">
          </td>
        </tr>

        <!-- Use When -->
        <tr>
          <td style="padding:0 32px 24px 32px;">
            <p style="margin:0 0 16px 0;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.35em;color:#8b6020;text-transform:uppercase;">Deploy When</p>
            ${useWhenRows}
            <hr style="border:none;border-top:1px solid #c4a06a;margin:24px 0 0 0;">
          </td>
        </tr>

        <!-- Script -->
        <tr>
          <td style="padding:0 32px 24px 32px;">
            <p style="margin:0 0 16px 0;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.35em;color:#8b6020;text-transform:uppercase;">The Script</p>
            <div style="background-color:#1a0f05;padding:20px 24px;border-left:3px solid #8b6020;">
              <p style="margin:0;font-family:Georgia,serif;font-size:15px;line-height:1.9;color:#f5e6c8;font-style:italic;">${cartridge.script}</p>
            </div>
            <hr style="border:none;border-top:1px solid #c4a06a;margin:24px 0 0 0;">
          </td>
        </tr>

        <!-- Protocol -->
        <tr>
          <td style="padding:0 32px 24px 32px;">
            <p style="margin:0 0 16px 0;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.35em;color:#8b6020;text-transform:uppercase;">The Protocol</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${protocolRows}
            </table>
            <hr style="border:none;border-top:1px solid #c4a06a;margin:24px 0 0 0;">
          </td>
        </tr>

        <!-- Outcome -->
        <tr>
          <td style="padding:0 32px 24px 32px;">
            <p style="margin:0 0 12px 0;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.35em;color:#8b6020;text-transform:uppercase;">What Changes</p>
            <p style="margin:0;font-family:Georgia,serif;font-size:15px;line-height:1.8;color:#2c1a08;">${cartridge.briefing.outcome}</p>
            <hr style="border:none;border-top:1px solid #c4a06a;margin:24px 0 0 0;">
          </td>
        </tr>

        <!-- Difficulty note -->
        <tr>
          <td style="padding:0 32px 24px 32px;">
            <p style="margin:0 0 12px 0;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.35em;color:#8b6020;text-transform:uppercase;">Difficulty</p>
            <p style="margin:0;font-family:Georgia,serif;font-size:15px;line-height:1.8;color:#2c1a08;">${difficultyLabel} — ${cartridge.difficulty} of 5. ${cartridge.difficulty <= 2 ? "Run this one soon. The barrier to entry is low." : cartridge.difficulty <= 3 ? "This will take some nerve. Do it anyway." : "This is a high-stakes move. Do not run it cold."}</p>
            <hr style="border:none;border-top:1px solid #c4a06a;margin:24px 0 0 0;">
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="padding:0 32px 32px 32px;text-align:center;">
            <p style="margin:0 0 24px 0;font-family:Georgia,serif;font-size:15px;line-height:1.8;color:#2c1a08;">The field is waiting. Return to the archive when you're ready to lock this into practice.</p>
            <a href="https://rebel-leader.com/workbench/codex#${cartridge.id}"
               style="display:inline-block;padding:14px 32px;background-color:#1a0f05;color:#f5e6c8;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.3em;text-decoration:none;margin-bottom:12px;">
              RETURN TO ARCHIVE →
            </a>
            <br>
            <a href="https://rebel-leader.com/workbench/praxis?cartridge=${cartridge.id}"
               style="display:inline-block;padding:12px 32px;background-color:transparent;color:#8b6020;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.25em;text-decoration:none;border:1px solid #8b6020;">
              LOCK THIS IN PRAXIS →
            </a>
          </td>
        </tr>

        <!-- Footer stamp -->
        <tr>
          <td style="padding:20px 32px;border-top:2px solid #8b6020;text-align:center;">
            <p style="margin:0;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.3em;color:#8b6020;text-transform:uppercase;">Rebel Leaders // rebel-leader.com</p>
            <p style="margin:8px 0 0 0;font-family:Georgia,serif;font-size:11px;line-height:1.6;color:#8b6020;font-style:italic;">You received this because you saved a Codex cartridge.<br>No tracking. No sequence. Just the protocol.</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}
