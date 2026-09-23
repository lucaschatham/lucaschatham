import assert from "node:assert/strict";
import test from "node:test";
import {
  getRedirectUrl,
  getRewrittenUrl,
  unstable_getResponseFromNextConfig,
} from "next/experimental/testing/server.js";
import nextConfig from "../next.config.ts";

const upstream = "https://label-review-7b3.lucaschatham.com";
const appPath = "/alcohol-by-volume-automated-label-check";

async function resolve(host, path) {
  return unstable_getResponseFromNextConfig({
    nextConfig,
    url: `https://${host}${path}`,
    headers: { host },
  });
}

for (const host of ["lucaschatham.com", "www.lucaschatham.com"]) {
  test(`label checker opens directly on ${host}`, async () => {
    const response = await resolve(host, appPath);
    assert.equal(getRedirectUrl(response), null);
    assert.equal(getRewrittenUrl(response), `${upstream}/`);
  });

  test(`label checker assets, OCR and API keep their paths on ${host}`, async () => {
    for (const path of [
      "/assets/index-example.js",
      "/assets/index-example.css",
      "/ocr/worker.min.js",
      "/ocr/tesseract-core-simd-lstm.wasm",
      "/ocr/eng.traineddata.gz",
      "/samples/old-tom.png",
      "/samples/applications.csv",
      "/api/warning-appearance",
    ]) {
      const response = await resolve(host, path);
      assert.equal(getRedirectUrl(response), null, path);
      assert.equal(getRewrittenUrl(response), `${upstream}${path}`, path);
    }
  });
}

test("the rest of the apex website retains its www redirect", async () => {
  for (const path of ["/", "/projects", "/images/lucas-portrait-clean.jpg", "/briefings/example", `${appPath}-other`]) {
    assert.equal(getRedirectUrl(await resolve("lucaschatham.com", path)), `https://www.lucaschatham.com${path}`);
  }
});

test("main website pages and unrelated API paths are never proxied to the app", async () => {
  for (const path of ["/", "/projects", "/images/lucas-portrait-clean.jpg", "/api/other", "/briefings/example"]) {
    const response = await resolve("www.lucaschatham.com", path);
    assert.equal(getRedirectUrl(response), null);
    assert.equal(getRewrittenUrl(response), null);
  }
});

test("existing website redirects remain intact", async () => {
  assert.equal(getRedirectUrl(await resolve("www.lucaschatham.com", "/blog/example")), "https://www.lucaschatham.com/essays/example");
  assert.equal(getRedirectUrl(await resolve("www.lucaschatham.com", "/work")), "https://www.lucaschatham.com/projects");
});
