# Youkeo Website Architecture

## Overview
- Static multi-page marketing website for Youkeo Studios.
- No build step, framework, or package manager setup in this repo.
- Pages are hand-written HTML that share one stylesheet, `/system.css`. Each page carries its own small inline script.

## Project Structure
- `/index.html`: Homepage (largest page; primary brand and conversion flow).
- `/recording/index.html`: Recording-focused landing page.
- `/studio/index.html`: Rooms and full equipment list.
- `/pricing/index.html`: Packages, à la carte rates and pricing FAQ.
- `/privacy-policy/index.html`, `/terms-conditions/index.html`: Legal pages.
- `/404.html`: Custom 404 page.
- `/system.css`: Design system shared by every page (tokens, type, components, responsive rules).
- `/robots.txt`, `/sitemap.xml`, `/llms.txt`: SEO and crawler control.
- `/_redirects`, `/_headers`: Cloudflare Pages rules for `main`.
- `/amplify.yml`, `/customHttp.yml`: AWS Amplify build and headers for the `rebrand` branch.

## Runtime Model
- Pages load directly in the browser as static documents.
- Marketing pages (home, recording, studio, pricing) load GSAP 3.13 + ScrollTrigger + SplitText from cdnjs for motion. Content stays visible without it: motion-only states hang off `html.js-motion`, which is only set when reduced motion is off.
- Legal and 404 pages have no GSAP; their inline script only handles the nav and mobile menu.
- Google Ads conversion helpers (`trackWhatsApp`, `trackPhone`, `trackEmail`) are defined inline in each page's `<head>`.

## Shared Components (`/system.css`)
- Nav, mobile drawer, buttons, track labels (`.trk`), headings with the violet full stop.
- Hero, light `.paper` sections with the playhead `.seam`, session sheets (`.sheet`, `.sheet--hot`, `.sheet--wide`), record crate, voices, founder, lavender CTA, footer.
- Legal documents: `.doc-head` title block and `.doc__grid` (sticky contents list beside the text; the list hides on phones).
- 404: `.lost__code` and `.lost__links`.

## Page Responsibilities
- Homepage (`/index.html`)
  - Sections: `top` (hero + price and proof facts), `room`, `spotlight`, `sessions`, `voices`, `made` (pinned record crate, in its own light band), `founder`, `book`. Proof comes before price on purpose.
  - JSON-LD for MusicStore/LocalBusiness (with the offer catalogue), Organization and WebSite (no FAQ markup: the page has no visible FAQ).

- Recording page (`/recording/index.html`)
  - Narrow intent page for recording leads.
  - Sections: `top` (hero + price strip), `featured`, `why`, `how`, `pricing`, `reviews`, `faq`, `book`.
  - Service, HowTo and FAQ JSON-LD.

- Studio page (`/studio/index.html`)
  - Rooms and the full equipment list, grouped by signal path then writing gear.
  - WebPage + BreadcrumbList JSON-LD.

- Pricing page (`/pricing/index.html`)
  - Sections: `top` (short hero), `packages` (studio time strip + three package sheets with matching rows), `rates` (à la carte list; each row opens WhatsApp), `faq`, `book`.
  - WebPage + FAQPage JSON-LD.

- Legal pages (`/privacy-policy/`, `/terms-conditions/`)
  - Numbered sections with ids `s1`, `s2`, … linked from the contents list.

- 404 (`/404.html`)
  - `noindex`. Served for unknown URLs at any depth, so every asset and link is root-relative.

## Analytics and Tracking
- Google Tag Manager, GA4 and Google Ads `gtag` setup in every page `<head>`.
- Contact clicks fire `gtag('event', 'contact_click', {method, location, page})` plus the matching `trackX()` helper.
- Other events: `release_click` (crate), `testimonial_play` (video cards).

## SEO and Discoverability
- Per-page title, description, canonical, OG and Twitter tags.
- Structured data (JSON-LD) is embedded directly in relevant pages.
- `robots.txt` allows major search and AI-citation crawlers and blocks selected training-only crawlers.
- `sitemap.xml` lists `/`, `/recording/`, `/studio/` and `/pricing/`.
- `llms.txt` provides an LLM-friendly business summary, including prices and the gear list.

## Routing and Hosting Behavior
- `/_redirects` (Cloudflare Pages, `main`) only passes through `sitemap.xml`, `robots.txt`, `llms.txt`; unknown URLs get `404.html`.
- Amplify (`rebrand`) uses a custom rule `/<*>` → `/404.html` with status `404-200`.

## Known Risks and Gotchas
- There is no build/test pipeline, so regressions can ship if changes are not browser-tested at phone, tablet and desktop widths.
- JSON-LD prices and FAQ text are hand-copied from the visible page; keep them in sync.

## Suggested Safe Change Workflow
1. Edit the page and its inline `<style>` first; touch `/system.css` only for changes every page should share.
2. After edits, test the homepage, recording, studio, pricing, legal and 404 pages, the mobile menu and CTA tracking.
3. If URLs or page existence change, update `/sitemap.xml`, canonical tags, internal links and `amplify.yml`.
