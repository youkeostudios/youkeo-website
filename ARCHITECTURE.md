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
- `/style.css`: Global design system + shared layout/components.
- `/script.js`: Global interactions and analytics helper functions.
- `/pricing.css`: Pricing-page-specific styles.
- `/recording/recording.css`: Recording-page-specific styles.
- `/robots.txt`, `/sitemap.xml`, `/llms.txt`: SEO and crawler control.
- `/_redirects`: Static host rewrite rules (Netlify-style).

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
  - Full marketing narrative and most interactive sections:
    `hero`, `recorded-here`, `services`, `pricing`, `testimonials`, `founder`, `location`, `cta`, `faq`.
  - Includes JSON-LD schemas for local business and website discoverability.
  - Uses shared overlays (`video-lightbox`, `card-overlay`, `service-overlay`).

- Recording page (`/recording/index.html`)
  - Narrow intent page for recording leads.
  - Reuses shared components/styles + `/recording/recording.css` overrides.
  - Includes service-specific schema blocks and conversion-focused CTA flow.

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
- `/_redirects` includes:
  - explicit passthrough for `sitemap.xml`, `robots.txt`, `llms.txt`
  - catch-all `/* /index.html 200`
- Implication:
  - unknown URLs are rewritten to homepage HTML.
  - this supports soft-deep-link behavior but can mask missing file paths.

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
- `/style.css`: large shared stylesheet (~2200 lines).
- `/index.html`: largest content page (~1400 lines).
- `/script.js`: shared interaction layer (~380 lines).
- `/recording/index.html`: medium-large landing page (~900 lines).
- `/pricing/index.html`: medium page (~500 lines).

## Current Repo State Note
- Existing uncommitted changes were present in:
  - `/recording/index.html`
  - `/recording/recording.css`
  - `/recording/index.backup.html` (untracked)
- This document was added without altering those files.
