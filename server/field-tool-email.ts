import {
  fieldToolEntitlement,
  type FieldToolAudience,
} from "../shared/field-tool-entitlements";

const names: Record<string, string> = {
  "ai-stalemate/pm": "AI Stalemate · Product Manager",
  "ai-stalemate/lead-dev": "AI Stalemate · Lead Developer",
  "deadline-reset": "Deadline Reset",
  "priority-whiplash": "Priority Whiplash",
  "mandate-reset": "Mandate Reset",
  "when-the-team-goes-quiet": "When the Team Goes Quiet",
};

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    char =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char]!
  );

export function fieldToolAccessEmail({
  slug,
  audience,
  appUrl,
  signInUrl,
}: {
  slug: string;
  audience: FieldToolAudience;
  appUrl: string;
  signInUrl: string;
}) {
  const path = fieldToolEntitlement(slug, audience);
  const name = names[path];
  if (!name) throw new Error("Unknown Field Tool.");
  const welcomeUrl = new URL(`/field-tools/${path}/access`, appUrl).toString();
  const safeWelcome = escapeHtml(welcomeUrl);
  const text = [
    "REBEL LEADERS",
    name,
    "Your Field Tool is ready.",
    "Sign in to open your Guide and Lab. Start with the part you need today.",
    `Sign in to my Field Tool: ${signInUrl}`,
    "This sign-in link works once and expires in 15 minutes. Your purchase access does not expire with it.",
    "COMING BACK LATER?",
    `Bookmark your welcome page: ${welcomeUrl}`,
    "Use that page whenever you want to return. If you're signed out or using another device, enter your purchase email (or the email your gift was sent to) for a fresh sign-in link. You won't need to buy again.",
    "Your Lab drafts stay in the browser and device where you made them. Download your notes before switching devices.",
    "Need a hand? Email hello@rebel-leader.com.",
    "Keep the sign-in link private. If you didn't request it, you can ignore this email.",
    "HOPE IS REBELLIOUS.",
  ].join("\n\n");
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Your Rebel Leaders Field Tool</title></head>
<body style="margin:0;padding:0;background:#f4f2ec;color:#30332c;font-family:Arial,Helvetica,sans-serif">
<div style="display:none;max-height:0;overflow:hidden">Your Guide and Lab, plus a link to bookmark for next time.</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f2ec"><tr><td align="center" style="padding:28px 16px">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#fbfaf6;border:1px solid #dcded4">
<tr><td style="padding:27px 28px;border-bottom:1px solid #dcded4;font-family:Georgia,'Times New Roman',serif;font-size:28px;color:#315d4e">Rebel Leaders</td></tr>
<tr><td style="padding:32px 28px 28px">
<p style="margin:0 0 16px;color:#315d4e;font-size:11px;line-height:1.7;letter-spacing:1.6px;text-transform:uppercase">${escapeHtml(name)}</p>
<h1 style="margin:0 0 18px;font-family:Georgia,'Times New Roman',serif;font-size:36px;line-height:1.15;font-weight:normal">Your Field Tool<br>is ready.</h1>
<p style="margin:0 0 25px;font-size:16px;line-height:1.7;color:#5e655b">Sign in to open your Guide and Lab. Start with the part you need today.</p>
<table role="presentation" cellspacing="0" cellpadding="0"><tr><td bgcolor="#315d4e" style="border-radius:26px"><a href="${escapeHtml(signInUrl)}" style="display:inline-block;padding:16px 25px;color:#ffffff;font-size:15px;font-weight:bold;text-decoration:none;border:1px solid #315d4e;border-radius:26px">Sign in to my Field Tool &rarr;</a></td></tr></table>
<p style="margin:17px 0 0;font-size:13px;line-height:1.7;color:#5e655b">This sign-in link works once and expires in 15 minutes.<br><strong>Your purchase access does not expire with it.</strong></p>
</td></tr>
<tr><td style="padding:0 28px 28px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#eaf0e7;border-top:2px solid #b8c8b4"><tr><td style="padding:22px">
<h2 style="margin:0 0 12px;font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:normal">Coming back later?</h2>
<p style="margin:0 0 12px;font-size:15px;line-height:1.7"><a href="${safeWelcome}" style="color:#315d4e;font-weight:bold;text-decoration:underline">Bookmark your welcome page &rarr;</a></p>
<p style="margin:0 0 12px;font-size:14px;line-height:1.7">Use that page whenever you want to return. If you’re signed out or using another device, enter your purchase email (or the email your gift was sent to) for a fresh sign-in link. You won’t need to buy again.</p>
<p style="margin:0;font-size:12px;line-height:1.7;color:#5e655b">Your Lab drafts stay in the browser and device where you made them. Download your notes before switching devices.</p>
</td></tr></table></td></tr>
<tr><td style="padding:0 28px 28px;font-size:12px;line-height:1.8;color:#5e655b">Need a hand? <a href="mailto:hello@rebel-leader.com" style="color:#315d4e">hello@rebel-leader.com</a><br>Keep the sign-in link private. If you didn’t request it, you can ignore this email.</td></tr>
<tr><td style="padding:22px 28px;border-top:1px solid #dcded4;color:#315d4e;font-size:10px;letter-spacing:2.5px">HOPE IS REBELLIOUS.</td></tr>
</table></td></tr></table></body></html>`;
  return { html, text };
}
