import assert from "node:assert/strict";
import test from "node:test";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const manifestSource = readFileSync(
  fileURLToPath(new URL("../components/manifest.tsx", import.meta.url)),
  "utf8"
);
const homeSource = readFileSync(
  fileURLToPath(new URL("../app/page.tsx", import.meta.url)),
  "utf8"
);

test("homepage omits the career throughline section", () => {
  assert.doesNotMatch(homeSource, /CareerThroughline|Different Industries|Same Jobs/);
  assert.doesNotMatch(manifestSource, /CareerThroughline|throughline-heading/);
});

test("site navigation omits Essays from the top tab", () => {
  assert.doesNotMatch(
    manifestSource,
    /key:\s*"essays"[\s\S]*?href:\s*"https:\/\/levelwithlucas\.lucaschatham\.com\/archive"[\s\S]*?label:\s*"Essays"/
  );
});

test("homepage places the open source collection directly after work", () => {
  const workIndex = homeSource.indexOf('heading="work"');
  const openSourceIndex = homeSource.indexOf('heading="Open Source"');

  assert.ok(workIndex >= 0, "homepage should include the work section");
  assert.ok(
    openSourceIndex > workIndex,
    "open source should follow the complete work section"
  );
});

test("open source collection explains the term and links verified projects", () => {
  const nuclearAtlasIndex = homeSource.indexOf('title: "Nuclear Atlas"');
  const edsIndex = homeSource.indexOf(
    'title: "Independent Ehlers-Danlos Research Collaborative"'
  );
  const westCoastSwingIndex = homeSource.indexOf(
    'title: "Operation Learn West Coast Swing"'
  );

  assert.ok(nuclearAtlasIndex >= 0, "Nuclear Atlas should be listed");
  assert.ok(edsIndex > nuclearAtlasIndex, "EDS should follow Nuclear Atlas");
  assert.ok(
    westCoastSwingIndex > edsIndex,
    "EDS should occupy the second position in the collection"
  );
  assert.match(
    homeSource,
    /Open source projects are free, open, and available to everyone/
  );
  assert.match(
    homeSource,
    /The projects below I’ve either authored or helped move forward\./
  );
  assert.match(homeSource, /https:\/\/github\.com\/lucaschatham\/nuclear-atlas/);
  assert.match(
    homeSource,
    /https:\/\/github\.com\/lucaschatham\/operation-learn-west-coast-swing/
  );
  assert.match(homeSource, /https:\/\/github\.com\/lucaschatham\/remnoteconnect/);
  assert.match(
    homeSource,
    /https:\/\/github\.com\/lucaschatham\/independent-eds-research-collaborative/
  );
  assert.match(homeSource, /\/images\/open-source\/nuclear-atlas-radioactive\.png/);
  assert.match(homeSource, /\/images\/open-source\/west-coast-swing-footprints\.png/);
  assert.match(
    homeSource,
    /west-coast-swing-footprints\.png[\s\S]*tone:\s*"dark-mode-bright"/
  );
  assert.match(homeSource, /\/images\/open-source\/remnote-connect-link\.png/);
  assert.match(homeSource, /Each claim links back to its source/);
  assert.match(homeSource, /learners and teachers can verify and improve it/);
  assert.match(homeSource, /your data stays on your computer/);
  assert.match(homeSource, /Independent Ehlers-Danlos Research Collaborative/);
  assert.match(homeSource, /This public research plan brings patient experience and expert review together/);
  assert.match(homeSource, /meta:\s*"Public Plan"/);
  assert.ok(
    existsSync(
      fileURLToPath(
        new URL("../public/images/side-quests/icons/lab.webp", import.meta.url)
      )
    )
  );
});
