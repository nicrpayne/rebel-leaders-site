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

function renderFieldToolEmail({
  slug,
  audience,
  appUrl,
  signInUrl,
  gift,
}: {
  slug: string;
  audience: FieldToolAudience;
  appUrl: string;
  signInUrl: string;
  gift?: {
    senderName: string;
    recipientName?: string | null;
    recipientEmail: string;
    message?: string | null;
  };
}) {
  const path = fieldToolEntitlement(slug, audience);
  const name = names[path];
  if (!name) throw new Error("Unknown Field Tool.");
  const welcomeUrl = new URL(`/field-tools/${path}/access`, appUrl).toString();
  const safeWelcome = escapeHtml(welcomeUrl);
  const artUrl = (file: string) =>
    escapeHtml(new URL(`/assets/field-tools/email/${file}`, appUrl).toString());
  const intro = gift
    ? `${gift.recipientName ? `Hi ${gift.recipientName}. ` : ""}${gift.senderName} bought you ${name}, a Field Guide and interactive Lab from Rebel Leaders. Glad you’re here. Bring one real situation and start with the part that would help today.`
    : "Glad you’re here. Your Guide and Lab are ready. Bring one real situation, and start with the part that would help today.";
  const buttonLabel = gift ? "Open my gift" : "Sign in to my Field Tool";
  const buttonUrl = gift ? welcomeUrl : signInUrl;
  const instructions = gift
    ? `Open your gift and enter ${gift.recipientEmail} for your own secure sign-in link. You don’t need to pay or enter card details.`
    : "This sign-in link works once and expires in 15 minutes. Your purchase access does not expire with it.";
  const giftPrivacy =
    "Your Lab answers are yours. The person who bought this gift cannot see them unless you choose to share them.";
  const text = [
    "REBEL LEADERS",
    name,
    gift ? "A Field Tool for you." : "Your Field Tool is ready.",
    intro,
    gift?.message ? `A note from ${gift.senderName}:\n${gift.message}` : "",
    `${buttonLabel}: ${buttonUrl}`,
    instructions,
    "COMING BACK LATER?",
    `Bookmark your welcome page: ${welcomeUrl}`,
    "Use that page whenever you want to return. If you're signed out or using another device, enter your purchase email (or the email your gift was sent to) for a fresh sign-in link. Each sign-in link expires after 15 minutes; your purchase access doesn't expire with it. You won't need to buy again.",
    "Your Lab drafts stay in the browser and device where you made them. Download your notes before switching devices.",
    gift
      ? giftPrivacy
      : "Keep the sign-in link private. If you didn't request it, you can ignore this email.",
    "Need a hand? Reply to this email or write to hello@rebel-leader.com. I’m happy to help. — Nic",
    "HOPE IS REBELLIOUS.",
  ]
    .filter(Boolean)
    .join("\n\n");
  // Keep headings live so inbox colour changes cannot leave image-shaped panels.
  // The transparent wordmark stays legible on light and forced-dark surfaces.
  // Explicit dark colours serve clients that support the preference query.
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="light dark"><meta name="supported-color-schemes" content="light dark"><title>Your Rebel Leaders Field Tool</title><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;1,400&amp;family=Outfit:wght@400;500&amp;display=swap" rel="stylesheet"><style>:root{color-scheme:light dark;supported-color-schemes:light dark}@media only screen and (max-width:480px){.mail-padding{padding-left:24px!important;padding-right:24px!important}.mail-outer{padding:12px 0!important}.mail-heading{font-size:38px!important}}@media(prefers-color-scheme:dark){.mail-bg{background:#1e211e!important}.mail-card{background:#252923!important;color:#f4f1e9!important}.mail-border{border-color:#454c42!important}.mail-muted{color:#c5c8bf!important}.mail-green{color:#aec8b9!important}.mail-heading{color:#f4f1e9!important}.mail-note{background:#30392f!important;color:#f4f1e9!important}.mail-button{background:#aec8b9!important;border-color:#aec8b9!important;color:#172c23!important}}</style></head>
<body class="mail-bg" style="margin:0;padding:0;background:#f1f0eb;color:#34322e;font-family:'Outfit',Arial,Helvetica,sans-serif">
<div style="display:none;max-height:0;overflow:hidden">Your Guide and Lab, plus a link to bookmark for next time.</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" class="mail-bg" style="background:#f1f0eb"><tr><td align="center" class="mail-outer" style="padding:28px 16px">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" class="mail-card mail-border" style="max-width:640px;background:#fcfaf6;border:1px solid #ded8ce">
<tr><td class="mail-padding mail-border" style="padding:28px 36px;border-bottom:1px solid #ded8ce"><img src="${artUrl("wordmark-transparent-v2.png")}" alt="Rebel Leaders" width="260" height="42" style="display:block;max-width:100%;height:auto;border:0;color:#315c4b;font:normal 28px Georgia,serif"></td></tr>
<tr><td class="mail-padding" style="padding:38px 36px 32px">
<p class="mail-green" style="margin:0 0 24px;color:#315c4b;font-size:11px;font-weight:500;line-height:1.7;letter-spacing:1.7px;text-transform:uppercase">${escapeHtml(name)}</p>
<h1 class="mail-heading" style="margin:0 0 24px;color:#34322e;font-family:'Cormorant Garamond',Georgia,'Times New Roman',serif;font-size:44px;font-weight:400;line-height:1.12">${gift ? "A Field Tool" : "Your Field Tool"}<br><em class="mail-green" style="color:#315c4b;font-weight:400">${gift ? "for you." : "is ready."}</em></h1>
<p class="mail-muted" style="margin:0 0 26px;font-size:16px;line-height:1.7;color:#68635c">${escapeHtml(intro)}</p>
${gift?.message ? `<div class="mail-note" style="padding:20px;margin:0 0 26px;background:#e8eee6;border-radius:12px"><p style="margin:0 0 10px;font-size:13px">A note from ${escapeHtml(gift.senderName)}:</p><p style="margin:0;white-space:pre-wrap;font-size:15px;line-height:1.7">${escapeHtml(gift.message)}</p></div>` : ""}
<table role="presentation" cellspacing="0" cellpadding="0"><tr><td class="mail-button" bgcolor="#315c4b" style="border-radius:28px"><a class="mail-button" href="${escapeHtml(buttonUrl)}" style="display:inline-block;padding:16px 26px;color:#ffffff;font-size:15px;font-weight:400;text-decoration:none;border:1px solid #315c4b;border-radius:28px">${buttonLabel} &nbsp;&rarr;</a></td></tr></table>
<p class="mail-muted" style="margin:18px 0 0;font-size:13px;line-height:1.7;color:#68635c">${escapeHtml(instructions)}</p>
</td></tr>
<tr><td class="mail-padding" style="padding:0 36px 30px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" class="mail-note mail-border" style="background:#e8eee6;border:1px solid #ded8ce;border-radius:12px"><tr><td style="padding:24px">
<h2 class="mail-green" style="margin:0 0 14px;font-size:11px;line-height:1.7;font-weight:500;letter-spacing:1.7px;text-transform:uppercase;color:#315c4b">Coming back later?</h2>
<p style="margin:0 0 14px;font-size:16px;line-height:1.7"><a class="mail-green" href="${safeWelcome}" style="color:#315c4b;font-weight:400;text-decoration:underline">Bookmark your welcome page &rarr;</a></p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.7">Use that page whenever you want to return. Signed out or on another device? Enter your purchase email (or the email your gift was sent to) for a fresh sign-in link. Each sign-in link expires after 15 minutes; your purchase access doesn’t expire with it. You won’t need to buy again.</p>
<p class="mail-muted" style="margin:0;font-size:12px;line-height:1.7;color:#68635c">Your Lab drafts stay in the browser and device where you made them. Download your notes before switching devices.</p>
</td></tr></table></td></tr>
<tr><td class="mail-padding mail-muted" style="padding:0 36px 28px;font-size:12px;line-height:1.8;color:#68635c">Need a hand? Reply to this email or write to <a class="mail-green" href="mailto:hello@rebel-leader.com" style="color:#315c4b">hello@rebel-leader.com</a>. I’m happy to help.<br>— Nic<br><br>${gift ? escapeHtml(giftPrivacy) : "Keep the sign-in link private. If you didn’t request it, you can ignore this email."}</td></tr>
<tr><td class="mail-padding mail-border mail-green" style="padding:23px 36px;border-top:1px solid #ded8ce;color:#315c4b;font-size:10px;letter-spacing:2.5px">HOPE IS REBELLIOUS.</td></tr>
</table></td></tr></table></body></html>`;
  return { html, text };
}

export function fieldToolAccessEmail(input: {
  slug: string;
  audience: FieldToolAudience;
  appUrl: string;
  signInUrl: string;
}) {
  return renderFieldToolEmail(input);
}

export function fieldToolGiftEmail(input: {
  slug: string;
  audience: FieldToolAudience;
  appUrl: string;
  gift: {
    senderName: string;
    recipientName?: string | null;
    recipientEmail: string;
    message?: string | null;
  };
}) {
  return renderFieldToolEmail({ ...input, signInUrl: "" });
}
