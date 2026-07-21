import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const manifestSource = readFileSync(
  fileURLToPath(new URL("../components/manifest.tsx", import.meta.url)),
  "utf8"
);

test("site navigation routes Essays to the Beehiiv archive", () => {
  assert.match(
    manifestSource,
    /key:\s*"essays"[\s\S]*?href:\s*"https:\/\/levelwithlucas\.lucaschatham\.com\/archive"[\s\S]*?label:\s*"Essays"/
  );
});
