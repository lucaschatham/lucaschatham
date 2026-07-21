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

test("side quests page uses the public title and supporting description", () => {
  assert.match(sideQuestsPage, /title:\s*"Side Quests"/);
  assert.match(sideQuestsPage, /heading="Side Quests"/);
  assert.match(sideQuestsPage, /description="Fun side projects, built for curiosity and the joy of making\."/);
});

test("habit tracker remains unpublished", () => {
  assert.match(habitTracker, /^published:\s*false$/m);
});

test("every public side quest has a local 3d icon", () => {
  const expectedIcons = {
    "aurora-inl": "lab",
    "diy-gym": "gym",
    "home-remodel-custom-furniture": "tools",
    "remnote-connect": "link",
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
  }
});
