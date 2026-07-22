import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const redesignCss = readFileSync(
  fileURLToPath(new URL("../app/redesign.css", import.meta.url)),
  "utf8"
);
const manifestSource = readFileSync(
  fileURLToPath(new URL("../components/manifest.tsx", import.meta.url)),
  "utf8"
);
const auroraSource = readFileSync(
  fileURLToPath(
    new URL("../components/aurora-deployment-experience.tsx", import.meta.url)
  ),
  "utf8"
);
const projectManifestSource = readFileSync(
  fileURLToPath(new URL("../lib/project-manifest.ts", import.meta.url)),
  "utf8"
);

const baseUrl = (process.env.SMOKE_BASE_URL ?? "https://www.lucaschatham.com").replace(
  /\/+$/,
  ""
);
const timeoutMs = Number(process.env.SMOKE_TIMEOUT_MS ?? 15_000);
const htmlCache = new Map();
let sitemapPromise;

const expectedSitemapPaths = [
  "/",
  "/essays",
  "/projects",
  "/side-quests",
  "/side-quests/aurora-inl",
  "/projects/daybreaker-health",
  "/projects/checkfit",
  "/projects/imerit",
  "/projects/blue-vision-labs-lyft",
  "/projects/gymnazo",
  "/projects/monster-fitness",
  "/essays/forward-deployed-hospitality",
  "/essays/how-to-crash-a-wedding",
  "/essays/service-by-the-senses",
  "/essays/why-stripes-culture-wins",
];

const expectedWorkOrder = [
  "/projects/imerit",
  "/projects/blue-vision-labs-lyft",
  "/projects/gymnazo",
  "/projects/daybreaker-health",
  "/projects/checkfit",
  "/projects/monster-fitness",
];

const projectTemplateHeadings = [
  "What Was Built",
  "My Role",
  "Result",
  "Why It Mattered",
  "What This Proves",
];

test("direction D keeps the desktop hero on a shared top baseline", () => {
  assert.match(
    redesignCss,
    /\.hero-cine\s*\{[^}]*\balign-items:\s*start\s*;/s,
    "the desktop story and portrait should share a top baseline"
  );
  assert.match(
    redesignCss,
    /\.hero-cine\s*\{[^}]*\bgrid-template-columns:\s*minmax\([^;]+\)\s+minmax\([^;]+\)\s*;/s,
    "direction D should retain a two-column desktop grid"
  );
});

test("navigation retains the documented desktop and mobile heights", () => {
  assert.match(redesignCss, /\.nav\s*\{[^}]*\bmin-height:\s*80px\s*;/s);
  assert.match(redesignCss, /\.nav a\s*\{[^}]*\bpadding:\s*0\s*;/s);
  assert.match(
    redesignCss,
    /@media \(max-width: 780px\)\s*\{[\s\S]*?\.nav\s*\{[^}]*\bmin-height:\s*68px\s*;/
  );
});

test("mobile direction D uses a top-anchored 4:3 portrait", () => {
  assert.match(
    redesignCss,
    /@media \(max-width: 780px\)\s*\{[\s\S]*?\.hero-portrait img\s*\{[^}]*\baspect-ratio:\s*4\s*\/\s*3\s*;[^}]*\bobject-position:\s*center\s+10%\s*;/,
    "the mobile portrait should use the locked 4:3 crop and focal point"
  );
});

test("hero source order matches the compact mobile split", () => {
  const markers = [
    'className="name"',
    'className="hero-role"',
    'className="hero-proposition"',
    'className="hero-action hero-action-primary"',
    'className="hero-portrait"',
  ];

  let previousIndex = -1;
  for (const marker of markers) {
    const index = manifestSource.indexOf(marker);
    assert.ok(index > previousIndex, `${marker} should follow the prior hero element`);
    previousIndex = index;
  }
});

test("site navigation routes Essays directly to Beehiiv", () => {
  assert.match(
    manifestSource,
    /key:\s*"essays"[\s\S]*?href:\s*"https:\/\/levelwithlucas\.lucaschatham\.com\/archive"[\s\S]*?label:\s*"Essays"/
  );
});

test("Aurora keeps explicit playback active while its player is onscreen", () => {
  assert.match(
    auroraSource,
    /<section\s+ref=\{stageViewportRef\}\s+className="aurora-stage"/
  );
  assert.match(auroraSource, /const isVisible = entry\.isIntersecting;/);
});

test("the project manifest covers every published work item", () => {
  const workDirectory = fileURLToPath(new URL("../content/work", import.meta.url));
  const contentSlugs = readdirSync(workDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
    .sort();
  const manifestSlugs = [
    ...projectManifestSource.matchAll(/^\s{4}slug: "([^"]+)",$/gm),
  ]
    .map((match) => match[1])
    .sort();

  assert.deepEqual(manifestSlugs, contentSlugs);
});

function toUrl(pathOrUrl) {
  return new URL(pathOrUrl, `${baseUrl}/`).href;
}

function normalizeUrl(value) {
  const url = new URL(value, `${baseUrl}/`);
  url.hash = "";
  url.search = "";

  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.slice(0, -1);
  }

  return url.href.replace(/\/$/, "");
}

async function request(pathOrUrl, init = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(toUrl(pathOrUrl), {
      ...init,
      signal: controller.signal,
      headers: {
        "user-agent": "lucaschatham-smoke-suite",
        ...(init.headers ?? {}),
      },
    });
  } finally {
    clearTimeout(timer);
  }
}

async function discardResponse(response) {
  await response.body?.cancel();
}

async function readHtml(pathOrUrl) {
  const href = toUrl(pathOrUrl);
  if (htmlCache.has(href)) return htmlCache.get(href);

  const htmlPromise = (async () => {
    const response = await request(href);
    assert.equal(response.status, 200, `${href} should return 200`);
    return response.text();
  })();

  htmlCache.set(href, htmlPromise);
  return htmlPromise;
}

async function readSitemap() {
  sitemapPromise ??= (async () => {
    const response = await request("/sitemap.xml");
    assert.equal(response.status, 200);
    return response.text();
  })();

  return sitemapPromise;
}

function tagContents(html, tagName) {
  return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "gi"))].map(
    (match) => stripTags(match[1])
  );
}

function tags(html, tagName) {
  return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, "gi"))].map(
    (match) => match[0]
  );
}

function attr(tag, name) {
  const match = tag.match(new RegExp(`\\s${name}=(["'])(.*?)\\1`, "i"));
  return match?.[2] ?? null;
}

function stripTags(value) {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, "\"")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/\s+/g, " ")
    .trim();
}

function canonicalHref(html) {
  const canonicalTag = tags(html, "link").find((tag) =>
    /\srel=(["'])canonical\1/i.test(tag)
  );

  return canonicalTag ? attr(canonicalTag, "href") : null;
}

function sitemapUrls(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
}

test("sitemap exposes the important public routes", async () => {
  const paths = sitemapUrls(await readSitemap()).map((url) => new URL(url).pathname);

  for (const path of expectedSitemapPaths) {
    assert.ok(
      paths.includes(path),
      `sitemap should include ${path}`
    );
  }
});

test("sitemap pages load with canonical URLs, one H1, metadata, and image alts", async () => {
  const urls = sitemapUrls(await readSitemap());

  assert.ok(urls.length > 0, "sitemap should contain URLs");

  await Promise.all(urls.map(async (url) => {
    const path = new URL(url).pathname;
    const html = await readHtml(path);

    assert.ok(tagContents(html, "title")[0], `${url} should have a title`);
    assert.ok(
      /<meta\b[^>]*name=(["'])description\1[^>]*content=(["']).+?\2/i.test(html) ||
        /<meta\b[^>]*content=(["']).+?\1[^>]*name=(["'])description\2/i.test(html),
      `${url} should have a meta description`
    );
    assert.equal(
      normalizeUrl(canonicalHref(html) ?? ""),
      normalizeUrl(url),
      `${url} should self-canonicalize`
    );
    assert.equal(tagContents(html, "h1").length, 1, `${url} should have one H1`);

    for (const image of tags(html, "img")) {
      assert.notEqual(attr(image, "alt"), null, `${url} image should include alt`);
    }
  }));
});

test("legacy routes redirect permanently to canonical sections", async () => {
  const blog = await request("/blog?source=legacy", { redirect: "manual" });
  assert.equal(blog.status, 308);
  assert.equal(blog.headers.get("location"), "/essays?source=legacy");
  await discardResponse(blog);

  const blogPost = await request("/blog/forward-deployed-hospitality?source=legacy", {
    redirect: "manual",
  });
  assert.equal(blogPost.status, 308);
  assert.equal(
    blogPost.headers.get("location"),
    "/essays/forward-deployed-hospitality?source=legacy"
  );
  await discardResponse(blogPost);

  const work = await request("/work?source=legacy", { redirect: "manual" });
  assert.equal(work.status, 308);
  assert.equal(work.headers.get("location"), "/projects?source=legacy");
  await discardResponse(work);

  const workProject = await request("/work/imerit?source=legacy", { redirect: "manual" });
  assert.equal(workProject.status, 308);
  assert.equal(workProject.headers.get("location"), "/projects/imerit?source=legacy");
  await discardResponse(workProject);
});

test("homepage lists every published work case", async () => {
  const html = await readHtml("/");
  const workHtml = html.slice(html.indexOf('id="work-heading"'));
  let previousIndex = -1;

  for (const href of expectedWorkOrder) {
    const index = workHtml.indexOf(`href="${href}"`);
    assert.ok(index > previousIndex, `${href} should appear after the prior work row`);
    previousIndex = index;
  }
});

test("homepage makes primary paths explicit", async () => {
  const html = await readHtml("/");
  const visibleText = stripTags(html);

  assert.match(html, /<a href="\/#work-heading">(?:<[^>]+>)*Work<\/a>/i);
  assert.match(html, /<a href="https:\/\/levelwithlucas\.lucaschatham\.com\/archive">(?:<[^>]+>)*Essays<\/a>/i);
  assert.match(html, /<a href="\/side-quests">(?:<[^>]+>)*Side Quests<\/a>/i);
  assert.match(html, /<a href="#contact">(?:<[^>]+>)*Contact<\/a>/i);
  assert.match(visibleText, /Founder · Operator/i);
  assert.doesNotMatch(visibleText, /\bPROOF\b/);
  assert.doesNotMatch(
    visibleText,
    /Open to select advisory and operating partnerships\./i
  );
  assert.match(visibleText, /I build high-trust AI systems people rely on in domains where mistakes have real consequences, from autonomous vehicles to healthcare\./i);
  assert.doesNotMatch(manifestSource, /className="hero-proof"/);
  assert.match(html, /href="#work-heading"[^>]*>[\s\S]*?View selected work/i);
});

test("Work navigation always targets the homepage work section", () => {
  assert.match(
    manifestSource,
    /key:\s*"projects",\s*href:\s*"\/#work-heading",\s*label:\s*"Work"/s
  );
  assert.doesNotMatch(
    manifestSource,
    /href:\s*active\s*===\s*"home"\s*\?\s*"#work-heading"\s*:\s*"\/projects"/
  );
});

test("homepage metadata and Person schema match the advisory offer", async () => {
  const html = await readHtml("/");

  assert.match(html, /<title>Lucas Chatham \| Founder, product operator, and advisor<\/title>/i);
  assert.match(html, /Lucas Chatham advises founders and executives on high-stakes AI products and operating systems, turning expert-led work into systems teams can run and trust\./i);
  assert.match(html, /"jobTitle":"Founder, product operator, and advisor"/);
  assert.match(html, /https:\/\/www\.linkedin\.com\/in\/lucaschatham\//);
  assert.match(html, /https:\/\/github\.com\/lucaschatham/);
  assert.match(html, /https:\/\/x\.com\/lukeoutthebox/);
});

test("homepage career throughline stays concise", async () => {
  const html = await readHtml("/");

  assert.match(html, /<span class="throughline-heading-line">Different Industries<\/span>/);
  assert.match(html, /<span class="throughline-heading-line">Same Jobs<\/span>/);
  assert.match(html, /valuable work trapped in someone(?:&apos;|&#x27;)s head or scattered across messy operations/);
  assert.match(html, /href="\/projects\/blue-vision-labs-lyft"[\s\S]*?3 city pilots → 2 countries/);
  assert.match(html, /href="\/projects\/imerit"[\s\S]*?6,000\+ annotators · 20\+ tools · 5 time zones/);
  assert.match(html, /href="\/projects\/gymnazo"[\s\S]*?11\+ coaches trained · 209% YoY growth/);
  assert.doesNotMatch(html, /The pattern|Make invisible work legible|Turn judgment into systems|Scale trust with proof/i);
});

test("frontmatter tags use the shared capsule system on lists and detail pages", async () => {
  const indexHtml = await readHtml("/side-quests");
  assert.match(indexHtml, /class="tag-list tag-list--row"/);
  assert.match(indexHtml, /<li class="tag-capsule">Training<\/li>/);
  assert.match(indexHtml, /<li class="tag-capsule">Open Source<\/li>/);

  const detailHtml = await readHtml("/side-quests/diy-gym");
  assert.match(detailHtml, /class="tag-list tag-list--detail"/);
  assert.match(detailHtml, /<li class="tag-capsule">Training<\/li>/);
  assert.match(detailHtml, /<meta\b[^>]*name="keywords"[^>]*content="Training"/i);

  const customDetailHtml = await readHtml("/side-quests/aurora-inl");
  assert.match(customDetailHtml, /class="tag-list tag-list--detail"/);
  assert.match(customDetailHtml, /<li class="tag-capsule">Nuclear<\/li>/);
  assert.match(customDetailHtml, /<li class="tag-capsule">Systems<\/li>/);
});

test("portfolio project pages keep the agreed case-study template", async () => {
  const urls = sitemapUrls(await readSitemap()).filter((url) =>
    new URL(url).pathname.startsWith("/projects/")
  );

  await Promise.all(urls.map(async (url) => {
    const html = await readHtml(new URL(url).pathname);
    const h2s = tagContents(html, "h2");

    for (const heading of projectTemplateHeadings) {
      assert.ok(h2s.includes(heading), `${url} should include "${heading}"`);
    }

    const snapshotIndex = html.indexOf('aria-label="Project snapshot"');
    const mediaIndex = html.indexOf('class="project-hero-media"');
    assert.ok(snapshotIndex !== -1, `${url} should expose a project snapshot`);
    assert.ok(
      mediaIndex === -1 || snapshotIndex < mediaIndex,
      `${url} should show snapshot evidence before hero media`
    );
    assert.match(html, /class="project-attribution"/);
    assert.match(html, /class="project-next"/);
    assert.match(html, /"@type":"CreativeWork"/);
  }));
});

test("contact band keeps email private until the Email action is clicked", async () => {
  const html = await readHtml("/");
  const contactStart = html.indexOf('class="contact-band"');
  const contactEnd = html.indexOf("</section>", contactStart) + "</section>".length;
  const visibleContactText = stripTags(html.slice(contactStart, contactEnd));

  assert.match(html, /id="contact"/);
  assert.match(html, /Have a hard problem\?/);
  assert.match(html, /Tell me what is stuck\./);
  assert.doesNotMatch(html, /Two sentences about your problem is plenty\./);
  assert.doesNotMatch(
    html,
    /Open to select advisory and operating partnerships\./
  );
  assert.match(html, /https:\/\/www\.linkedin\.com\/in\/lucaschatham\//);
  assert.match(html, /mailto:chathamworks@gmail\.com\?subject=Hard%20problem%3A/);
  assert.equal((manifestSource.match(/href=\{CONTACT_MAILTO\}/g) ?? []).length, 1);
  assert.doesNotMatch(visibleContactText, /chathamworks@gmail\.com/);
  assert.match(html, /https:\/\/github\.com\/lucaschatham/);
  assert.match(html, /https:\/\/x\.com\/lukeoutthebox/);
  assert.match(html, /aria-label="@lukeoutthebox on X \(opens in a new tab\)"/);
  assert.doesNotMatch(visibleContactText, /@lukeoutthebox/);
  assert.match(html, /levelwithlucas\.lucaschatham\.com\/archive/);
  assert.doesNotMatch(html, /href="\/rss"/);
});

test("robots and RSS endpoints are present", async () => {
  const robots = await request("/robots.txt");
  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /Sitemap:\s*https:\/\/www\.lucaschatham\.com\/sitemap\.xml/);

  const rss = await request("/rss");
  assert.equal(rss.status, 200);
  assert.match(rss.headers.get("content-type") ?? "", /xml/);
  const xml = await rss.text();
  assert.match(xml, /<rss\b/);
  assert.match(xml, /<link>https:\/\/www\.lucaschatham\.com\/essays\/forward-deployed-hospitality<\/link>/);
  assert.match(xml, /<guid>https:\/\/www\.lucaschatham\.com\/blog\/forward-deployed-hospitality<\/guid>/);
});

test("essay details use Essays canonicals and Article schema", async () => {
  const html = await readHtml("/essays/forward-deployed-hospitality");

  assert.equal(
    normalizeUrl(canonicalHref(html) ?? ""),
    "https://www.lucaschatham.com/essays/forward-deployed-hospitality"
  );
  assert.match(html, /"@type":"Article"/);
});

test("essay and project details expose route-aware social cards", async () => {
  for (const path of [
    "/projects/imerit",
    "/essays/forward-deployed-hospitality",
  ]) {
    const html = await readHtml(path);
    const meta = tags(html, "meta");
    const openGraphImage = meta.find(
      (tag) => attr(tag, "property") === "og:image"
    );
    const twitterImage = meta.find(
      (tag) => attr(tag, "name") === "twitter:image"
    );
    const openGraphUrl = attr(openGraphImage ?? "", "content") ?? "";
    const twitterUrl = attr(twitterImage ?? "", "content") ?? "";

    assert.match(openGraphUrl, new RegExp(`${path}/opengraph-image`));
    assert.match(twitterUrl, new RegExp(`${path}/opengraph-image`));

    for (const imageUrl of new Set([openGraphUrl, twitterUrl])) {
      const parsedUrl = new URL(imageUrl);
      const response = await request(`${parsedUrl.pathname}${parsedUrl.search}`);
      assert.equal(response.status, 200);
      assert.match(response.headers.get("content-type") ?? "", /^image\/png/);
      await discardResponse(response);
    }
  }
});

test("404 pages are noindex and leave navigation inactive", async () => {
  const response = await request("/this-route-does-not-exist");
  assert.equal(response.status, 404);
  const html = await response.text();

  assert.match(html, /<meta\b[^>]*name="robots"[^>]*content="noindex"/i);
  assert.doesNotMatch(html, /aria-current="page"/);
});
