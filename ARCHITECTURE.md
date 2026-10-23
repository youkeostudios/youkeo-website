# Youkeo Website Architecture

## Overview
- This is a static multi-page marketing website for Youkeo Studios.
- There is no build step, framework, or package manager setup in this repo.
- Pages are served directly as HTML with shared CSS/JS.

## Project Structure
- `/index.html`: Main homepage (largest page; primary brand and conversion flow).
- `/recording/index.html`: Recording-focused landing page.
- `/pricing/index.html`: Full pricing breakdown page.
- `/privacy-policy/index.html`: Legal privacy page.
- `/terms-conditions/index.html`: Legal terms page.
- `/404.html`: Custom 404 page.
- `/system.css`: Design system shared by the homepage and recording page (tokens, type, components, responsive rules).
- `/style.css`: Older shared stylesheet, still used by pricing, legal and 404 pages.
- `/script.js`: Interactions and analytics helpers for the older pages (homepage and recording page use inline scripts).
- `/pricing.css`: Pricing-page-specific styles.
- `/robots.txt`, `/sitemap.xml`, `/llms.txt`: SEO and crawler control.
- `/_redirects`, `/_headers`: Cloudflare Pages rules for `main`.
- `/amplify.yml`, `/customHttp.yml`: AWS Amplify build and headers for the `rebrand` branch.

## Runtime Model
- Pages load directly in the browser as static documents.
- Global CSS is included on nearly all pages.
- Global JS is included on most pages and assumes some shared DOM structure.
- Interaction and tracking are mostly wired inline via `onclick` and `gtag` events.

## Shared Frontend Layers
- Global styling: `/style.css`
  - CSS reset, tokens (`:root` custom properties), typography, shared sections, navbar, footer, overlays, buttons, responsive behavior.
- Global behavior: `/script.js`
  - Conversion helper functions: `trackWhatsApp`, `trackPhone`, `trackEmail`.
  - Navbar shadow on scroll.
  - Mobile menu toggle and close-on-link.
  - Active nav link by section intersection.
  - Service detail overlay on cards.
  - FAQ accordion behavior.
  - Testimonials lightbox + draggable slider.
  - Card overlay expansion.
  - Smooth anchor scrolling with nav offset.

## Page Responsibilities
- Homepage (`/index.html`)
  - Sections: `top` (hero), `room`, `sessions`, `artists`, `made` (pinned record crate), `spotlight`, `voices`, `founder`, `book`.
  - Includes JSON-LD for MusicStore/LocalBusiness, Organization and WebSite (no FAQ markup: the page has no visible FAQ).
  - Styles from `/system.css`; GSAP 3.13 + ScrollTrigger + SplitText from cdnjs for motion.

- Recording page (`/recording/index.html`)
  - Narrow intent page for recording leads.
  - Sections: `top` (hero + price strip), `featured`, `why`, `how`, `pricing`, `reviews`, `faq`, `book`.
  - Styles from `/system.css` plus page rules in its `<style>`; Service, HowTo and FAQ JSON-LD.

- Pricing page (`/pricing/index.html`)
  - Long-form service and package pricing details.
  - Reuses shared nav/footer and shared JS.
  - Uses `/pricing.css` for page-specific layout/section style.

- Legal pages (`/privacy-policy/`, `/terms-conditions/`)
  - Mostly static content with inline page styles.
  - Reuse shared footer and load `/script.js` (see Known Risks).

## Analytics and Tracking
- Google Tag Manager script appears in core marketing pages.
- GA4 + Google Ads `gtag` setup in page `<head>`.
- Conversion and engagement events are tracked via inline handlers:
  - Contact clicks (WhatsApp/phone/email).
  - CTA clicks by location and service.
  - Track/testimonial clicks and overlay opens.

## SEO and Discoverability
- Rich metadata per page (title, description, canonical, OG, Twitter).
- Structured data (JSON-LD) is embedded directly in relevant pages.
- `robots.txt` allows major search and AI-citation crawlers and blocks selected training-only crawlers.
- `sitemap.xml` currently lists:
  - `/`
  - `/recording/`
  - `/pricing/`
- `llms.txt` provides an LLM-friendly business summary.

## Routing and Hosting Behavior
- `/_redirects` (Cloudflare Pages, `main`) only passes through `sitemap.xml`, `robots.txt`, `llms.txt`; unknown URLs get `404.html`.
- Amplify (`rebrand`) needs a 404 rewrite rule set in the Amplify console for the same behaviour.

## Known Risks and Gotchas
- `script.js` expects `#nav` to exist and calls nav scroll logic immediately.
  - Legal pages include `/script.js` but do not render `#nav`, which can cause runtime JS errors there.
- Global script contains page-specific behavior (e.g., pricing FAQ class selectors), so future refactors should preserve selector compatibility.
- Because there is no build/test pipeline, regressions can ship if changes are not manually browser-tested.

## Suggested Safe Change Workflow
1. Edit the specific page and its page-specific CSS first.
2. Touch `/style.css` only for truly shared design changes.
3. Touch `/script.js` only when interaction must be shared across pages.
4. After edits, manually test:
   - homepage
   - recording page
   - pricing page
   - legal pages
   - mobile nav + overlays + CTA tracking paths
5. If URLs or page existence changes, update:
   - `/sitemap.xml`
   - canonical tags
   - internal links

## File Size Snapshot (for orientation)
- `/style.css`: large older stylesheet (~2200 lines).
- `/system.css`: current design system (~300 lines).
- `/index.html`: homepage (~700 lines).
- `/script.js`: older-page interaction layer (~380 lines).
- `/recording/index.html`: recording landing page (~650 lines).
- `/pricing/index.html`: medium page (~500 lines).
