import assert from "node:assert/strict";
import test from "node:test";

const baseUrl = (process.env.SMOKE_BASE_URL ?? "https://www.lucaschatham.com").replace(
  /\/+$/,
  ""
);
const timeoutMs = Number(process.env.SMOKE_TIMEOUT_MS ?? 15_000);
const htmlCache = new Map();

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
];

const expectedWorkOrder = [
  "/projects/daybreaker-health",
  "/projects/checkfit",
  "/projects/imerit",
  "/projects/blue-vision-labs-lyft",
  "/projects/gymnazo",
  "/projects/monster-fitness",
];

const projectTemplateHeadings = [
  "What Was Built",
  "My Role",
  "Result",
  "Why It Mattered",
  "What This Proves",
];

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

async function readHtml(pathOrUrl) {
  const href = toUrl(pathOrUrl);
  if (htmlCache.has(href)) return htmlCache.get(href);

  const response = await request(href);
  assert.equal(response.status, 200, `${href} should return 200`);

  const html = await response.text();
  htmlCache.set(href, html);
  return html;
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
  const response = await request("/sitemap.xml");
  assert.equal(response.status, 200);

  const paths = sitemapUrls(await response.text()).map((url) => new URL(url).pathname);

  for (const path of expectedSitemapPaths) {
    assert.ok(
      paths.includes(path),
      `sitemap should include ${path}`
    );
  }
});

test("sitemap pages load with canonical URLs, one H1, metadata, and image alts", async () => {
  const sitemapResponse = await request("/sitemap.xml");
  const urls = sitemapUrls(await sitemapResponse.text());

  assert.ok(urls.length > 0, "sitemap should contain URLs");

  for (const url of urls) {
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
  }
});

test("legacy routes redirect to current sections", async () => {
  const blog = await request("/blog", { redirect: "manual" });
  assert.match(String(blog.status), /^30[78]$/);
  assert.equal(blog.headers.get("location"), "/essays");

  const workProject = await request("/work/imerit", { redirect: "manual" });
  assert.match(String(workProject.status), /^30[78]$/);
  assert.equal(workProject.headers.get("location"), "/projects/imerit");
});

test("homepage work list stays reverse chronological", async () => {
  const html = await readHtml("/");
  let previousIndex = -1;

  for (const href of expectedWorkOrder) {
    const index = html.indexOf(`href="${href}"`);
    assert.ok(index > previousIndex, `${href} should appear after the prior work row`);
    previousIndex = index;
  }
});

test("homepage makes primary paths explicit", async () => {
  const html = await readHtml("/");

  assert.match(html, /<a href="\/#work-heading">(?:<[^>]+>)*Work<\/a>/i);
  assert.match(html, /<a href="\/side-quests">(?:<[^>]+>)*Side Quests<\/a>/i);
  assert.match(html, /href="mailto:chathamworks@gmail\.com"[^>]*>[^<]*Email Lucas/i);
  assert.match(html, /I build high-trust AI systems people rely on when getting it wrong is expensive, from autonomous vehicles to healthcare/i);
  assert.match(html, /href="#work-heading"[^>]*>[\s\S]*?View selected work/i);
});

test("homepage career throughline stays concise", async () => {
  const html = await readHtml("/");

  assert.match(html, /Across AI, mapping, health, coaching, and sales:/);
  assert.match(html, /Make invisible work legible/);
  assert.match(html, /Turn judgment into systems/);
  assert.match(html, /Scale trust with proof/);
  assert.doesNotMatch(html, /THE PATTERN/);
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
  const sitemapResponse = await request("/sitemap.xml");
  const urls = sitemapUrls(await sitemapResponse.text()).filter((url) =>
    new URL(url).pathname.startsWith("/projects/")
  );

  for (const url of urls) {
    const html = await readHtml(new URL(url).pathname);
    const h2s = tagContents(html, "h2");

    for (const heading of projectTemplateHeadings) {
      assert.ok(h2s.includes(heading), `${url} should include "${heading}"`);
    }
  }
});

test("footer keeps contact and publishing paths visible", async () => {
  const html = await readHtml("/");

  assert.match(html, /https:\/\/www\.linkedin\.com\/in\/lucaschatham\//);
  assert.match(html, /mailto:chathamworks@gmail\.com/);
  assert.match(html, /https:\/\/github\.com\/lucaschatham/);
  assert.match(html, /https:\/\/levelwithlucas\.lucaschatham\.com\/archive/);
  assert.match(html, /aria-label="Blog newsletter"/);
  assert.match(html, /<span class="ic">[\s\S]*?<\/span>\s*Blog\s*<\/a>/);
});

test("robots and RSS endpoints are present", async () => {
  const robots = await request("/robots.txt");
  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /Sitemap:\s*https:\/\/www\.lucaschatham\.com\/sitemap\.xml/);

  const rss = await request("/rss");
  assert.equal(rss.status, 200);
  assert.match(rss.headers.get("content-type") ?? "", /xml/);
  assert.match(await rss.text(), /<rss\b/);
});
