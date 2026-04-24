# Youkeo Studios — Website

Static marketing site for Youkeo Studios, a recording studio in Airoli, Navi Mumbai. Plain HTML/CSS/JS — no build step, no framework, no package manager. Deployed as static files (Netlify-style `_redirects`).

## Stack & layout

- Hand-written HTML per page, shared `style.css` at root, page-specific CSS where it makes sense (`pricing.css`, `recording/recording.css`).
- Single JS entry: [script.js](script.js) — nav scroll, service overlays, lightbox, card overlays, hero video autoplay, and Google Ads conversion helpers.
- Images/video/favicon served from `cdn.youkeostudios.com` (not committed). Reference by full CDN URL.
- Pages:
  - [/](index.html) — homepage
  - [/recording/](recording/index.html) — recording services
  - [/pricing/](pricing/index.html) — full pricing
  - [/privacy-policy/](privacy-policy/index.html), [/terms-conditions/](terms-conditions/index.html)
  - [404.html](404.html)
- [_redirects](_redirects): preserves `sitemap.xml`, `robots.txt`, `llms.txt`; otherwise SPA-style fallback to `index.html`.

## SEO / discoverability

- Per-page `<title>`, meta description, canonical, OG/Twitter tags, and JSON-LD (LocalBusiness / MusicStore, FAQ, etc.) are hand-maintained in each HTML file. Keep them in sync when copy changes.
- [sitemap.xml](sitemap.xml) and [robots.txt](robots.txt) are static — update `sitemap.xml` when adding a new page.
- [llms.txt](llms.txt) is the AI-search summary (GPTBot / ClaudeBot / PerplexityBot are explicitly allowed in `robots.txt`). Update it whenever services, pricing, or contact info change.
- Geo meta tags pin the business to Airoli coordinates — don't touch unless the studio moves.

## Analytics & conversion tracking

Three layers, all loaded in [index.html](index.html) `<head>` (and mirrored on other pages):

1. **GTM** container `GTM-M9KKG5QK`
2. **GA4** property `G-KFE2B59HDH` via `gtag('config', …)`
3. **Google Ads** account `AW-17982763316` — conversion labels wired into three helpers in [script.js:6-22](script.js#L6-L22):
   - `trackWhatsApp()` — WhatsApp clicks
   - `trackPhone()` — phone clicks
   - `trackEmail()` — email clicks

Every contact CTA on every page must:
- Fire a `gtag('event', 'contact_click', {...})` with `method` + `location` + `page`.
- Call the matching `trackX()` helper for Google Ads conversions.
- Use `target="_blank" rel="noopener"` for WhatsApp/email links (already the convention — see recent commits).

When adding a new CTA, copy an existing one rather than writing tracking from scratch; missing a `trackX()` call silently breaks ad attribution.

## Conventions

- Don't introduce a bundler, framework, or npm dependency without asking — the site is intentionally zero-build.
- Favicon and OG images live on the CDN; don't commit binary assets.
- Keep the JSON-LD blocks valid — they drive rich results and AI citations.
- Indian rupee pricing (`₹`), `en_IN` locale, 24h IST opening hours — preserve these in copy.

## Marketing skills

The `marketingskills` pack from [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) is installed project-locally under [.claude/skills/](.claude/skills/) (38 skills: `page-cro`, `copywriting`, `seo-audit`, `schema-markup`, `ai-seo`, `analytics-tracking`, etc.). Invoke directly with `/skill-name` or describe the task. Start with `/product-marketing-context` before using the others — it's the foundation every skill reads first. Lockfile: [skills-lock.json](skills-lock.json). Update with `npx skills update`.

## Unrelated

[opencode.json](opencode.json) configures a local Ollama setup for a different tool — ignore when working on the site itself.
