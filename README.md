# Lucas Chatham

builder

## Label checker URL

`/alcohol-by-volume-automated-label-check` serves the independently deployed app
at `https://label-review-7b3.lucaschatham.com/` through Vercel rewrites. The browser
stays on the requested website URL. No app source or credentials are copied here.
The app also owns the fallback paths `/assets/*`, `/ocr/*`, `/samples/*`, and
`/api/warning-appearance`. Existing website routes take precedence.

The Vercel `site` project must serve `lucaschatham.com` directly, with its
domain-wide redirect unset. `next.config.ts` keeps the `www` redirect for all
other website paths. If rolling back to a version without that host rule,
restore the Vercel domain redirect to `www.lucaschatham.com` as well.

Run `node --test tests/label-check-routing.test.mjs` to verify these routes.
