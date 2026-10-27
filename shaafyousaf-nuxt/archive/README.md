# Archive

The multi-page version of the site, kept for reference only. Nothing here is
built or routed: Nuxt only scans `app/`.

Live routes are `/` (app/pages/index.vue), `/homelab` (the full write-up the
homepage links to) and the Chrome extension privacy policies `/SEPolicy` and
`/ULPolicy`, which the Chrome Web Store listings link to.

- `pages/` — retired routes: /experience, /contact
- `components/` — sections those pages and the old homepage used
- `layouts/default.vue` — the old Navbar + Footer layout

To bring a page back, move it into `app/pages/` along with any components it uses.
