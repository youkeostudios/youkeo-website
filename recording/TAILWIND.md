# Recording landing page

The recording page uses original Tailwind CSS layouts styled to match Youkeo's
existing dark palette, typography, video hero, and lavender/cream accents.
No proprietary Tailwind Plus component source is included.

## Build

```sh
npm ci
npm run build
```

Edit `recording/tailwind.input.css`; `recording/tailwind.css` is generated and
checked into the project so the existing static hosting requires no runtime
compiler. Use `npm run watch:recording` during development.

The shared `/style.css` is imported in a lower-priority CSS layer for navigation,
media overlays, and existing interaction states. Recording components override
it using Tailwind's theme, responsive utilities, and `@apply`. Other pages keep
their existing stylesheets. The former `recording.css` is retained but no longer
loaded by this page.

The existing page text, media, destinations, analytics and structured data are
preserved. FAQ questions use native buttons with the existing accordion script.
