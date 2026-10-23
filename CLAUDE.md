# Youkeo Studios — Website

Static marketing site for Youkeo Studios, a recording studio in Airoli, Navi Mumbai. Plain HTML/CSS/JS — no build step, no framework, no package manager. `main` deploys on Cloudflare Pages (Netlify-style `_redirects`/`_headers`); the `rebrand` branch deploys on AWS Amplify ([amplify.yml](amplify.yml) publishes only the site files, [customHttp.yml](customHttp.yml) sets headers).

## Stack & layout

- Hand-written HTML per page. The homepage and [/recording/](recording/index.html) share [system.css](system.css): the current design system (tokens, Plus Jakarta Sans + Instrument Serif italic + Geist Mono, track labels, session sheets, crate, footer). Page-only rules stay in each page's `<style>`. GSAP 3.13 (ScrollTrigger, SplitText) loads from cdnjs; each page's inline script handles nav, hero video and motion.
- Pricing, legal and 404 pages still use the older [style.css](style.css) + [pricing.css](pricing.css) and [script.js](script.js). Move them to `system.css` when they are redesigned.
- Images/video/favicon are served from S3 + CloudFront at `https://media.youkeostudios.com/` (bucket `youkeo-media`, ap-south-1). Reference them by that full URL everywhere, including OG/Twitter tags and JSON-LD. The local [media/](media/) folder is git-ignored and is the upload source: [.githooks/pre-push](.githooks/pre-push) syncs it to S3 on every push (upload-only, never deletes; AWS profile `youkeo`). After a fresh clone, run `git config core.hooksPath .githooks`.
- Pages:
  - [/](index.html) — homepage
  - [/recording/](recording/index.html) — recording services
  - [/pricing/](pricing/index.html) — full pricing
  - [/privacy-policy/](privacy-policy/index.html), [/terms-conditions/](terms-conditions/index.html)
  - [404.html](404.html)
- [_redirects](_redirects): preserves `sitemap.xml`, `robots.txt`, `llms.txt`; otherwise SPA-style fallback to `index.html`.
- [_headers](_headers): 30-day cache on `/media/*` (Cloudflare Pages, `main` only). On S3 the same `Cache-Control` is set per object by the pre-push sync.

## SEO / discoverability

- Per-page `<title>`, meta description, canonical, OG/Twitter tags, and JSON-LD (LocalBusiness / MusicStore, FAQ, etc.) are hand-maintained in each HTML file. Keep them in sync when copy changes.
- [sitemap.xml](sitemap.xml) and [robots.txt](robots.txt) are static — update `sitemap.xml` when adding a new page.
- [llms.txt](llms.txt) is the AI-search summary (GPTBot / ClaudeBot / PerplexityBot are explicitly allowed in `robots.txt`). Update it whenever services, pricing, or contact info change.
- Geo meta tags pin the business to Airoli coordinates — don't touch unless the studio moves.

## Analytics & conversion tracking

Three layers, all loaded in [index.html](index.html) `<head>` (and mirrored on other pages):

1. **GTM** container `GTM-M9KKG5QK`
2. **GA4** property `G-KFE2B59HDH` via `gtag('config', …)`
3. **Google Ads** account `AW-17982763316` — conversion labels wired into three helpers, defined inline in the `<head>` of the homepage and recording page and in [script.js:6-22](script.js#L6-L22) for the other pages:
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
- Site media (images, video, favicon, OG images) goes in the git-ignored `media/` folder and reaches S3 through the pre-push hook. Compress first (aim for <15 MB video, WebP/AVIF images). Never commit binaries: git history keeps them forever.
- Media is cached for 30 days. To replace a file quickly, give the new one a new filename instead of overwriting.
- Keep the JSON-LD blocks valid — they drive rich results and AI citations.
- Indian rupee pricing (`₹`), `en_IN` locale, 24h IST opening hours — preserve these in copy.

## Marketing skills

The `marketingskills` pack from [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) is installed project-locally under [.claude/skills/](.claude/skills/) (38 skills: `page-cro`, `copywriting`, `seo-audit`, `schema-markup`, `ai-seo`, `analytics-tracking`, etc.). Invoke directly with `/skill-name` or describe the task. Start with `/product-marketing-context` before using the others — it's the foundation every skill reads first. Lockfile: [skills-lock.json](skills-lock.json). Update with `npx skills update`.

## Unrelated

[opencode.json](opencode.json) configures a local Ollama setup for a different tool — ignore when working on the site itself.

## gstack (REQUIRED — global install)

**Before doing ANY work, verify gstack is installed:**

```bash
_GS=""
for _D in "${GSTACK_ROOT:-}" "$HOME/.claude/skills/gstack" "$HOME/.codex/skills/gstack" "$HOME/.factory/skills/gstack" "$HOME/.kiro/skills/gstack" "$HOME/.config/opencode/skills/gstack" "$HOME/.slate/skills/gstack" "$HOME/.cursor/skills/gstack" "$HOME/.openclaw/skills/gstack" "$HOME/.hermes/skills/gstack" "$HOME/.gbrain/skills/gstack" "$HOME/.copilot/skills/gstack" "$HOME/.gemini/antigravity-cli/skills/gstack" "$HOME/.gstack/repos/gstack"; do
  [ -z "$_GS" ] && [ -n "$_D" ] && [ -d "$_D/bin" ] && _GS="$_D"
done
[ -n "$_GS" ] && echo "GSTACK_OK: $_GS" || echo "GSTACK_MISSING"
```

If GSTACK_MISSING: STOP. Do not proceed. Tell the user:

> gstack is required for all AI-assisted work in this repo.
> Install it:
> ```bash
> git clone --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
> cd ~/.claude/skills/gstack && ./setup --team
> ```
> Then restart your AI coding tool.

Do not skip skills, ignore gstack errors, or work around missing gstack.

Using gstack skills: After install, skills like /qa, /ship, /review, /investigate,
and /browse are available. Use /browse for all web browsing (Aside first, the bundled gstack browser as fallback).
Use the resolved install path above for gstack file paths
(default: ~/.claude/skills/gstack).
