import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import test from "node:test";

function readProjectFile(relativePath) {
  return readFileSync(
    fileURLToPath(new URL(`../${relativePath}`, import.meta.url)),
    "utf8"
  );
}

const sideQuestsPage = readProjectFile("app/side-quests/page.tsx");
const manifest = readProjectFile("components/manifest.tsx");
const habitTracker = readProjectFile("content/side-quests/habit-tracker.mdx");
const homeRemodel = readProjectFile(
  "content/side-quests/home-remodel-custom-furniture.mdx"
);

function readWebpCanvas(relativePath) {
  const image = readFileSync(
    fileURLToPath(new URL(`../${relativePath}`, import.meta.url))
  );

  assert.equal(image.toString("ascii", 0, 4), "RIFF");
  assert.equal(image.toString("ascii", 8, 12), "WEBP");
  assert.equal(image.toString("ascii", 12, 16), "VP8X");

  return {
    hasAlpha: Boolean(image[20] & 0x10),
    width: image.readUIntLE(24, 3) + 1,
    height: image.readUIntLE(27, 3) + 1,
  };
}

test("side quests page uses the public title and supporting description", () => {
  assert.match(sideQuestsPage, /title:\s*"Side Quests"/);
  assert.match(sideQuestsPage, /heading="Side Quests"/);
  assert.match(sideQuestsPage, /description="Fun side projects, built for curiosity and the joy of making\."/);
});

test("habit tracker remains unpublished", () => {
  assert.match(habitTracker, /^published:\s*false$/m);
});

test("home remodel is preserved but hidden from the public collection", () => {
  assert.match(homeRemodel, /^published:\s*false$/m);
});

test("RemNote Connect is no longer published as a side quest", () => {
  assert.equal(
    existsSync(
      fileURLToPath(
        new URL("../content/side-quests/remnote-connect.mdx", import.meta.url)
      )
    ),
    false
  );
  assert.doesNotMatch(manifest, /"remnote-connect"\s*:/);
});

test("every public side quest has a local 3d icon", () => {
  const expectedIcons = {
    "diy-gym": "gym",
  };

  for (const [slug, icon] of Object.entries(expectedIcons)) {
    assert.match(
      manifest,
      new RegExp(`"${slug}"\\s*:\\s*\\{[\\s\\S]*?/images/side-quests/icons/${icon}\\.webp`),
      `${slug} should map to the ${icon} icon`
    );

    assert.ok(
      existsSync(
        fileURLToPath(
          new URL(`../public/images/side-quests/icons/${icon}.webp`, import.meta.url)
        )
      ),
      `${icon}.webp should exist locally`
    );

    assert.deepEqual(
      readWebpCanvas(`public/images/side-quests/icons/${icon}.webp`),
      { hasAlpha: true, width: 500, height: 500 },
      `${icon}.webp should preserve the transparent 500px icon canvas`
    );
  }
});
