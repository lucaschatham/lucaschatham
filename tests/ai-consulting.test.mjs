import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("AI consulting stays out of public navigation, sitemap, and routes", async () => {
  const navigation = await read("../components/manifest.tsx");
  const sitemap = await read("../app/sitemap.ts");
  const publicPage = new URL("../app/ai-consulting/page.tsx", import.meta.url);

  assert.doesNotMatch(navigation, /AI Consulting|ai-consulting/i);
  assert.doesNotMatch(sitemap, /AI Consulting|ai-consulting/i);
  await assert.rejects(access(publicPage));
});
