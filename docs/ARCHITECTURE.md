# Architecture

A private birthday site: her photographs, a letter that opens on the day, a wish wall guests write to, and an invite to share. Next.js 16 on Vercel, with two managed stores and no server of its own.

## Shape

```
Browser ──> Next.js on Vercel
            ├─ static pages (/, /celebrate, /best-moments, /contact, /invite, /admin)
            │    /  and /love-letter re-render every 5 minutes (ISR) so the letter opens on time
            ├─ /_next/image ── resizes the 23 photographs on demand (5.6 MB originals → ~85 KB tiles)
            ├─ POST /api/wishes ───────────> Upstash Redis (wishes, queues, rate limits)
            │                     └────────> Vercel Blob (guest photos)
            ├─ GET  /api/wishes ───────────> approved wishes only
            └─ /api/admin/wishes ──────────> list, approve, delete (bearer ADMIN_TOKEN)
```

## Data

| Key | Type | Holds |
| --- | --- | --- |
| `wish:<uuid>` | string | the wish as JSON: id, name, message, photoUrl, createdAt |
| `wishes:pending` | sorted set | ids waiting for the owner, scored by time |
| `wishes:approved` | sorted set | ids on the wall, scored by time |
| `rl:wish:<hash>:<hour>` | counter | wishes from one address this hour (limit 5) |
| `rl:admin-fail:<hash>:<hour>` | counter | wrong admin keys from one address this hour (limit 10) |

Addresses are never stored: the key holds a salted SHA-256 of the IP, and counters expire after an hour.

## Features

- **Wish wall.** Guests write a name, a message and optionally a photo. The browser redraws the photo at 1600px as JPEG before upload, which keeps uploads small and drops EXIF (including GPS). Every wish waits in `/admin` until the owner puts it on the wall.
- **Birthday unlock.** `lib/birthday.ts` opens the letter at midnight on `birthday.unlockISO` in `birthday.utcOffset`. Before that, the server renders a sealed card with a countdown. The letter text lives in `lib/letter.ts`, which only server components import, so it is never in the JavaScript bundle. Set next year's date in `lib/siteConfig.ts` to seal it again.
- **Invite.** `/invite` with a generated share card (`app/invite/opengraph-image.tsx`) and the phone's share sheet, falling back to copying the link.

## Security model

| Boundary | Control |
| --- | --- |
| Anyone → `POST /api/wishes` | same-origin check, field validation and normalisation (lengths, control and bidi characters), honeypot, 5 wishes per address per hour, photo type checked by its bytes (JPEG, PNG, WebP only), 4 MB cap |
| Anyone → the wall | moderation: nothing shows until approved; React escapes all text; photos only from the site's own Blob store (`images.remotePatterns`, CSP `img-src`) |
| Anyone → `/admin` API | bearer `ADMIN_TOKEN` (24+ chars) compared in constant time; 10 wrong keys per address per hour, after which keys are not compared |
| Browser | CSP (`default-src 'self'`, fonts from Fontshare, images from Blob, `frame-ancestors 'none'`), HSTS, nosniff, strict referrer, permissions policy, COOP; no production source maps |
| Sealed letter | text kept out of client bundles; verified by searching `.next/static` after build |

Known trade-offs, accepted for a personal site:

- `script-src 'unsafe-inline'` is needed for Next's inline bootstrap on static pages. A nonce-based CSP would force every page to render per request.
- Photos are uploaded to Blob before approval. Their URLs carry a random suffix and are never returned to the sender, so they are not discoverable, but they are public objects.
- Rate limits trust `x-real-ip` / `x-forwarded-for`, which Vercel sets at its edge. On another host behind no proxy, these headers can be forged.

## Performance

- Dome tiles go through the image optimizer at 640px (AVIF/WebP): about 2 MB for all 23 instead of 53 MB.
- Hero prints use `next/image` with `priority` and `sizes`.
- Hanken Grotesk is self-hosted via `next/font`; Sentient loads from Fontshare with `display=swap`.
- Unused packages removed: `ogl`, `gsap`, `@use-gesture/react`, `class-variance-authority`, `tw-animate-css`, `@vercel/speed-insights`, `ts-jest`.

## Next steps worth considering

- Replace the 23 stock stand-in photographs with her own (same file names).
- A photo lightbox in the dome (the component's viewer was never finished).
- Self-host Sentient with `next/font/local` to drop the last third-party request.
- An email to the owner when a new wish arrives (Resend), so moderation is not a chore.
