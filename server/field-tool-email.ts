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
  const artUrl = (file: string) =>
    escapeHtml(new URL(`/assets/field-tools/email/${file}`, appUrl).toString());
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
  // Keep the wordmark and display lettering in the product typeface even in
  // inboxes without web fonts. All instructions and actions remain live text.
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Your Rebel Leaders Field Tool</title><link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500&amp;display=swap" rel="stylesheet"><style>@media only screen and (max-width:480px){.mail-padding{padding-left:24px!important;padding-right:24px!important}.mail-outer{padding:12px 0!important}.mail-heading{width:100%!important;height:auto!important}}</style></head>
<body style="margin:0;padding:0;background:#f1f0eb;color:#34322e;font-family:'Outfit',Arial,Helvetica,sans-serif">
<div style="display:none;max-height:0;overflow:hidden">Your Guide and Lab, plus a link to bookmark for next time.</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f1f0eb"><tr><td align="center" class="mail-outer" style="padding:28px 16px">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#fcfaf6;border:1px solid #ded8ce">
<tr><td class="mail-padding" style="padding:28px 36px;border-bottom:1px solid #ded8ce"><img src="${artUrl("wordmark-v1.png")}" alt="Rebel Leaders" width="260" height="42" style="display:block;max-width:100%;height:auto;border:0;color:#315c4b;font:normal 28px Georgia,serif"></td></tr>
<tr><td class="mail-padding" style="padding:38px 36px 32px">
<p style="margin:0 0 24px;color:#315c4b;font-size:11px;font-weight:500;line-height:1.7;letter-spacing:1.7px;text-transform:uppercase">${escapeHtml(name)}</p>
<h1 style="margin:0 0 24px;font:normal 44px/1.1 Georgia,serif"><img class="mail-heading" src="${artUrl("access-title-v1.png")}" alt="Your Field Tool is ready." width="520" height="130" style="display:block;max-width:100%;height:auto;border:0;color:#34322e;font:normal 44px/1.1 Georgia,serif"></h1>
<p style="margin:0 0 26px;font-size:16px;line-height:1.7;color:#68635c">Sign in to open your Guide and Lab. Start with the part you need today.</p>
<table role="presentation" cellspacing="0" cellpadding="0"><tr><td bgcolor="#315c4b" style="border-radius:28px"><a href="${escapeHtml(signInUrl)}" style="display:inline-block;padding:16px 26px;color:#ffffff;font-size:15px;font-weight:400;text-decoration:none;border:1px solid #315c4b;border-radius:28px">Sign in to my Field Tool &nbsp;&rarr;</a></td></tr></table>
<p style="margin:18px 0 0;font-size:13px;line-height:1.7;color:#68635c">This sign-in link works once and expires in 15 minutes.<br>Your purchase access does not expire with it.</p>
</td></tr>
<tr><td class="mail-padding" style="padding:0 36px 30px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#e8eee6;border:1px solid #ded8ce;border-radius:12px"><tr><td style="padding:24px">
<h2 style="margin:0 0 14px;font-size:11px;line-height:1.7;font-weight:500;letter-spacing:1.7px;text-transform:uppercase;color:#315c4b">Coming back later?</h2>
<p style="margin:0 0 14px;font-size:16px;line-height:1.7"><a href="${safeWelcome}" style="color:#315c4b;font-weight:400;text-decoration:underline">Bookmark your welcome page &rarr;</a></p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.7">Use that page whenever you want to return. Signed out or on another device? Enter your purchase email (or the email your gift was sent to) for a fresh sign-in link. You won’t need to buy again.</p>
<p style="margin:0;font-size:12px;line-height:1.7;color:#68635c">Your Lab drafts stay in the browser and device where you made them. Download your notes before switching devices.</p>
</td></tr></table></td></tr>
<tr><td class="mail-padding" style="padding:0 36px 28px;font-size:12px;line-height:1.8;color:#68635c">Need a hand? <a href="mailto:hello@rebel-leader.com" style="color:#315c4b">hello@rebel-leader.com</a><br>Keep the sign-in link private. If you didn’t request it, you can ignore this email.</td></tr>
<tr><td class="mail-padding" style="padding:23px 36px;border-top:1px solid #ded8ce;color:#315c4b;font-size:10px;letter-spacing:2.5px">HOPE IS REBELLIOUS.</td></tr>
</table></td></tr></table></body></html>`;
  return { html, text };
}
