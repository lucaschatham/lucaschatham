# Unlisted briefings

The encrypted bundle contains approved report assets and their unlisted path. The plaintext is excluded from Git because this repository is public. AES-256-GCM protects repository contents; it does not authenticate readers of the deployed website.

Production builds require the `BRIEFINGS_KEY` Vercel environment variable. Never commit that value. Preview and local builds without the key omit report assets. Builds with an invalid key fail. The build prepares static files under `public/briefings/`; response headers request no indexing and prevent referrer disclosure. Reports are absent from navigation and the sitemap.

Anyone with a deployed report URL can read it. Share report links only with the intended recipients. Keep the readable report archive in the owner's private GitHub repository.
