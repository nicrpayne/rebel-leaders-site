// Render these 1200 × 630 HTML canvases in the browser and capture each canvas
// as its matching PNG under client/public/assets/field-tools. No generated photos.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  AI_STALEMATE_PUBLIC_COPY,
  FIELD_TOOLS_PUBLIC_COPY,
} from "../shared/field-tool-public-copy";

const out = process.argv[2];
if (!out)
  throw new Error(
    "Pass a temporary output directory, e.g. dist/public/share-art"
  );
mkdirSync(out, { recursive: true });
const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    char =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!
  );
const font = (file: string) =>
  readFileSync(new URL(`./fonts/${file}`, import.meta.url)).toString("base64");
const pages = [
  {
    file: "field-tools-share-v1",
    role: "FIELD TOOLS",
    headline: `${FIELD_TOOLS_PUBLIC_COPY.headline}<br><em>${FIELD_TOOLS_PUBLIC_COPY.accent}</em>`,
    detail:
      "Find what’s holding things up.<br>Prepare a conversation or change.",
    photo: "",
  },
  {
    file: "ai-stalemate-pm-share-v1",
    role: "AI STALEMATE / PRODUCT MANAGERS",
    headline: escape(AI_STALEMATE_PUBLIC_COPY.pm.headline),
    detail: "Prepare the AI conversation.<br>Find what’s holding delivery up.",
    photo: "ai-stalemate-library-hero-v1.webp",
  },
  {
    file: "ai-stalemate-lead-dev-share-v1",
    role: "AI STALEMATE / LEAD DEVELOPERS",
    headline: escape(AI_STALEMATE_PUBLIC_COPY["lead-dev"].headline),
    detail:
      "Work through the engineering concerns.<br>Find what’s holding delivery up.",
    photo: "ai-stalemate-hero-v2.webp",
  },
];
for (const page of pages) {
  writeFileSync(
    path.join(out, page.file + ".html"),
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${page.role} share image</title><style>
@font-face{font-family:GuideSerif;src:url(data:font/ttf;base64,${font("GuideSerif.ttf")})} @font-face{font-family:GuideSans;src:url(data:font/ttf;base64,${font("GuideSans.ttf")})}
*{box-sizing:border-box}body{margin:0;background:#fbf9f5;color:#36342f}.canvas{width:1200px;height:630px;overflow:hidden;display:grid;grid-template-columns:730px 470px;font-family:GuideSans,Arial,sans-serif}.copy{padding:42px 50px;display:flex;flex-direction:column}.logo{width:270px;height:auto;align-self:flex-start}.role{font-size:14px;letter-spacing:2px;color:#315c4b;margin:48px 0 19px}h1{font:500 66px/1.03 GuideSerif,Georgia,serif;letter-spacing:-1.4px;margin:0;max-width:620px}em{color:#315c4b;font-weight:400}.detail{font-size:21px;line-height:1.5;color:#69665e;margin:24px 0 0}.foot{margin-top:auto;font-size:13px;letter-spacing:1.4px;color:#315c4b}.portrait{width:470px;height:630px;object-fit:cover;object-position:75% center}.map{background:#e8eee5;padding:66px 38px;display:flex;flex-direction:column;justify-content:center}.map .label{font-size:12px;letter-spacing:1.8px;color:#315c4b}.map h2{font:500 39px/1.1 GuideSerif,Georgia,serif;margin:18px 0 30px}.stages{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.stage{height:75px;display:grid;place-items:center;border:1px solid #c7cfc1;background:#fbf9f5;border-radius:8px;font-size:15px;color:#315c4b}.stage.current{background:#315c4b;color:#fbf9f5}.map p{font-size:17px;line-height:1.5;color:#69665e;margin:28px 0 0}
</style></head><body><main class="canvas"><div class="copy"><img class="logo" src="/assets/field-tools/email/wordmark-transparent-v2.png" alt="Rebel Leaders"><p class="role">${page.role}</p><h1>${page.headline}</h1><p class="detail">${page.detail}</p><p class="foot">TOOLS.REBEL-LEADER.COM</p></div>${page.photo ? `<img class="portrait" src="/assets/field-tools/${page.photo}" alt="Nic Payne">` : `<div class="map"><span class="label">FOLLOW THE WORK</span><h2>Where is it getting stuck?</h2><div class="stages">${["Decide", "Shape", "Build", "Check", "Release", "In use"].map(stage => `<div class="stage ${stage === "Check" ? "current" : ""}">${stage}</div>`).join("")}</div><p>Look closer.<br>Ask a better question.<br>Find something worth trying.</p></div>`}</main></body></html>`
  );
}
