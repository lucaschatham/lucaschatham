// Keep the public website address stable while the standalone app is deployed
// independently. Its OCR workers, API calls and downloads retain their origin.
export const dynamic = "force-static";

export function GET() {
  return new Response(
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Alcohol by Volume Automated Label Check | Lucas Chatham</title>
    <meta name="description" content="Compare alcohol-label information with application details, including ABV, net contents, and government warning text.">
    <meta name="robots" content="noindex,nofollow,noarchive">
    <style>
      html, body { margin: 0; width: 100%; height: 100%; background: #fff; }
      iframe { display: block; width: 100%; height: 100%; height: 100dvh; border: 0; }
      noscript p { position: fixed; inset: 0 0 auto; margin: 0; padding: 1rem; background: #fff; font: 1rem system-ui, sans-serif; }
    </style>
  </head>
  <body>
    <iframe src="https://label-review-7b3.lucaschatham.com/" title="Alcohol by Volume Automated Label Check" referrerpolicy="no-referrer">
      <a href="https://label-review-7b3.lucaschatham.com/">Open Alcohol by Volume Automated Label Check</a>
    </iframe>
    <noscript><p>Enable JavaScript to use the label checker.</p></noscript>
  </body>
</html>`,
    {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow, noarchive",
      },
    },
  );
}
